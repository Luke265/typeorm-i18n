import { getMetadataStorage } from "../../I18n";
import { EntityOptions, RelationOptions } from "typeorm";

export function I18nEntity(options?: EntityOptions, oneToMany?: RelationOptions, manyToOne?: RelationOptions) {
    return function (target: any) {
        const store = getMetadataStorage().getStoreFor(target);
        store.entityOptions = options;
        store.oneToManyRelationOptions = oneToMany;
        store.manyToOneRelationOptions = manyToOne;
    }
}