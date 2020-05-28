import { RelationOptions, ColumnType, ColumnOptions, EntityOptions } from "typeorm";
import { ColumnEmbeddedOptions } from "typeorm/decorator/options/ColumnEmbeddedOptions";

export interface Options {
    oneToManyRelationOptions?: RelationOptions,
    manyToOneRelationOptions?: RelationOptions,
    entityOptions?: EntityOptions,
    proxyDecorators: ClassDecorator[],
    relationOptions?: RelationOptions,
    properties: { [key: string]: PropertyOptions }
}
export interface PropertyOptions {
    proxyDecorators: PropertyDecorator[],
    propertyName: string,
    columnOptions?: {
        typeOrOptions?: ((type?: any) => Function) | ColumnType | (ColumnOptions & ColumnEmbeddedOptions),
        options?: (ColumnOptions & ColumnEmbeddedOptions)
    }
}

export class MetadataStorage {
    store = new Map<Function, Options>();

    getStoreForProperty(clasz: Function, propertyName: string) {
        const obj = this.getStoreFor(clasz).properties;
        return obj[propertyName] = obj[propertyName] || {
            proxyDecorators: [],
            propertyName
        } 
    }

    getStoreFor(clasz: Function) {
        let obj = this.store.get(clasz);
        if (!obj) {
            obj = {
                entityOptions: {},
                proxyDecorators: [],
                properties: {}
            };
            this.store.set(clasz, obj);
        }
        return obj;
    }

    clear() {
        this.store.clear()
    }
}