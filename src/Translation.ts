import { I18nEntity } from "./I18nEntity";

export interface Translation<T extends I18nEntity> {
    
    translations: T[];

}