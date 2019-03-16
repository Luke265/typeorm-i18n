import { I18nEntity } from "./I18nEntity";
import { I18nValue } from "./I18nValue";

export class I18nValueImpl<T, K extends I18nEntity = I18nEntity> implements I18nValue<T, K> {

    constructor(private __entity: any, private __TranslationClass: { new(...args: any[]): I18nEntity }, private __key: string | number | symbol) {
        
    }

    getAll(): K[] {
        return this.__entity.translations;
    }

    get(locale: string): T | null {
        const translations = this.__entity.translations;
        if (translations) {
            const translation = translations.find((l: I18nEntity) => l.locale === locale);
            return translation && translation[this.__key];
        }
        return null;
    }

    set(locale: string, value: T) {
        const translations = this.__entity.translations = this.__entity.translations || [];
        let translation = translations.find((l: I18nEntity) => l.locale === locale)
        if (!translation) {
            translation = new this.__TranslationClass();
            translation.locale = locale;
            translation.entity = this.__entity;
            translations.push(translation);
        }
        translation[this.__key] = value;
    }

}