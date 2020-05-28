import { I18nEntityBase } from "./I18nEntityBase";

export interface Translated<T extends I18nEntityBase<Translated<T>>> {
    
    translations: T[];

}