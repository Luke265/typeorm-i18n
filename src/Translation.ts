import { I18nEntity } from "./I18nEntity";

export interface Translated<T extends I18nEntity<Translated<T>>> {
    
    translations: T[];

}