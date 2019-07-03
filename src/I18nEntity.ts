import { Translated } from "./Translation";

export interface I18nEntity<T extends Translated<I18nEntity<T>>> {
    
    entity: T;

    locale: string;

    createdAt: Date;

    updatedAt: Date;

    deletedAt: Date | null;

}