import { Translated } from "./Translation";

export interface I18nEntity<T extends Translated<I18nEntity<T>>> {
    
    entity: T;

    locale: string;

}