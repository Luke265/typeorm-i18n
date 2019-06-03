import { Translated } from "./Translation";
import { I18nEntity } from "./I18nEntity";

export class I18nValue<T, K extends Translated<V> = any, V extends I18nEntity<K> = I18nEntity<K>> {

    constructor(
        private readonly __entity: K,
        private readonly __TranslationClass: { new(...args: any[]): V },
        private readonly __key: keyof V
    ) {
    }

    get size(): number {
        return this.__entity.translations.length;
    }

    clear(): void {
        this.__entity.translations = [];
    }

    delete(locale: string): boolean {
        const idx = this.findIndex(locale);
        if (idx !== -1) {
            this.__entity.translations.splice(idx, 1);
            return true;
        }
        return false;
    }

    get(locale: string): T | undefined {
        const idx = this.findIndex(locale);
        if (idx === -1) {
            return;
        }
        const translation = this.__entity.translations[idx];
        return translation && translation[this.__key] as any;
    }

    has(locale: string): boolean {
        return this.findIndex(locale) !== -1;
    }

    set(locale: string, value: T): this {
        const translations = this.__entity.translations = this.__entity.translations || [];
        const idx = this.findIndex(locale);
        let translation;
        if (idx === -1) {
            translation = new this.__TranslationClass();
            translation.locale = locale;
            translation.entity = this.__entity;
            translations.push(translation);
        } else {
            translation = translations[idx];
        }
        translation[this.__key] = value as any;
        return this;
    }

    private findIndex(locale?: string) {
        const translations: any[] = this.__entity.translations;
        if (translations) {
            if (locale) {
                return translations.findIndex((l) => l.locale === locale);
            } else {
                return translations.findIndex((l) => l);
            }
        }
        return -1;
    }

}