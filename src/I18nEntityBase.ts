import { Translated } from "./Translated";

export interface I18nEntityBase<T extends Translated<I18nEntityBase<T>>> {
    
    entity: T;

    locale: string;

    createdAt: Date;

    updatedAt: Date;

    deletedAt: Date | null;

}