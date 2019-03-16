import { I18nEntity } from "./I18nEntity";

export interface I18nValue<T, K extends I18nEntity = I18nEntity> {

    getAll(): K[];

    get(locale: string): T | null;

    set(locale: string, value: T): void;

}