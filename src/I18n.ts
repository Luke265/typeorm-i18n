import { DefaultI18nEntity } from "./DefaultI18nEntity";
import { I18nEntityBase } from "./I18nEntityBase";
import { OneToMany, ManyToOne, Entity, Column, ObjectType } from "typeorm";
import { Translated } from "./Translated";
import { I18nValue } from "./I18nValue";
import { MetadataStorage, Options } from "./MetadataStorage";

export type BaseEntity = { new(...args: any[]): I18nEntityBase<Translated<any>> };
export interface BuildOptions {
    suffix: string,
    baseEntity: BaseEntity
}

const storage = new MetadataStorage();
const defaultBuildOptions: BuildOptions = {
    suffix: 'I18n',
    baseEntity: DefaultI18nEntity
}

export function getMetadataStorage() {
    return storage
}

export function buildI18nEntities(buildOptions?: Partial<BuildOptions>) {
    const boptions = {
        ...defaultBuildOptions,
        ...buildOptions
    }
    const entities = [];
    for (const [entityClass, options] of getMetadataStorage().store) {
        entities.push(
            buildLocalizedEntityFor(boptions, entityClass, options)
        );
    }
    return entities;
}

export function i18nEntityOf<T extends Translated<I18nEntityBase<T>>>(entityClass: { new(...args: any[]): T }): ObjectType<I18nEntityBase<T>> {
    return (entityClass as any).I18nEntity;
}

function buildLocalizedEntityFor(buildOptions: BuildOptions, entityClass: Function, options: Options) {
    let localizedClass = class extends buildOptions.baseEntity { };

    // set class name
    // TODO: custom naming strategy
    Object.defineProperty(localizedClass, 'name', { value: entityClass.name + buildOptions.suffix });

    // add relation decorations
    // TODO: Proxy decorators
    Reflect.decorate([
        OneToMany(() => localizedClass, 'entity', options.oneToManyRelationOptions) as PropertyDecorator,
    ], entityClass.prototype, 'translations');
    Reflect.decorate([
        ManyToOne(() => entityClass, options.manyToOneRelationOptions) as PropertyDecorator
    ], localizedClass.prototype, 'entity');

    const decorators = [
        ...options.proxyDecorators
    ]
    if (options.entityOptions !== undefined) {
        decorators.push(Entity(options.entityOptions) as ClassDecorator)
    }
    // add entity decorations
    localizedClass = Reflect.decorate(decorators, localizedClass) as any;
    // define static property
    Object.defineProperty(entityClass, 'I18nEntity', {
        value: localizedClass
    });

    for (const propertyName in options.properties) {
        const {columnOptions, proxyDecorators: proxy} = options.properties[propertyName];
        const decorators = [
            ...proxy
        ];
        if (columnOptions) {
            decorators.push(
                Column(columnOptions.typeOrOptions as any, columnOptions.options) as PropertyDecorator
            );
        }
        if (decorators.length > 0) {
            Reflect.decorate(decorators, localizedClass.prototype, propertyName);
        }
        Object.defineProperty(entityClass.prototype, propertyName, {
            enumerable: true,
            get: function () {
                const value = new I18nValue<any, any, any>(this, localizedClass, propertyName);
                // after first "get" change this getter to normal value (optional)
                Object.defineProperty(this, propertyName, {
                    value,
                    enumerable: true
                });
                return value;
            }
        });
    }

    return localizedClass;
}