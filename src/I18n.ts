import { DefaultI18nEntity } from "./DefaultI18nEntity";
import { I18nEntity } from "./I18nEntity";
import { OneToMany, ManyToOne, Entity } from "typeorm";
import { Exclude } from 'class-transformer';

let baseEntity: { new(...args: any[]): I18nEntity } = DefaultI18nEntity;

export const LOCALIZED_ENTITIES: Map<Function, { new(...args: any[]): I18nEntity }> = new Map();

export function getBaseI18nEntity() {
    return baseEntity;
}

export function setBaseI18nEntity(entity: { new(...args: any[]): I18nEntity }) {
    baseEntity = entity;
}

export function getI18nEntities() {
    return Array.from(LOCALIZED_ENTITIES.values());
}

export function getOrCreateEntityI18nClass(entityClass: Function) {
    let i18nClass: any = LOCALIZED_ENTITIES.get(entityClass);
    if (!i18nClass) {
        i18nClass = class extends getBaseI18nEntityFor(entityClass) { };

        // set class name
        Object.defineProperty(i18nClass, 'name', { value: entityClass.name + 'I18n' });

        // add relation decorations
        Reflect.decorate([
            OneToMany(() => i18nClass, 'entity', {
                cascade: ["insert", "update", "remove"]
            }) as PropertyDecorator,
            Exclude() as PropertyDecorator
        ], entityClass.prototype, 'translations');
        Reflect.decorate([
            Exclude() as PropertyDecorator,
            ManyToOne(() => entityClass) as PropertyDecorator
        ], i18nClass.prototype, 'entity');

        // add entity decorations
        i18nClass = Reflect.decorate([Entity() as ClassDecorator], i18nClass);
        LOCALIZED_ENTITIES.set(entityClass, i18nClass);
    }
    return i18nClass;
}

function getBaseI18nEntityFor(classz: Function) {
    const entity = getBaseI18nEntity();
    const proto = Object.getPrototypeOf(classz);
    if (proto === Object || proto.isPrototypeOf(entity)) {
        return entity;
    }
    return getOrCreateEntityI18nClass(proto);
}