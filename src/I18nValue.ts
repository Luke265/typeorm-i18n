import { Translated } from "./Translated";
import { I18nEntityBase } from "./I18nEntityBase";

export class I18nValue<T, K extends I18nEntityBase<E> = I18nEntityBase<any>, E extends Translated<K> = any> {

    readonly #entity: E;
    readonly #translationClass: { new(...args: any[]): K };
    readonly #key: keyof K;

    constructor(
        entity: E,
        translationClass: { new(...args: any[]): K },
        key: keyof K
    ) {
        this.#entity = entity;
        this.#translationClass = translationClass;
        this.#key = key;
    }

    get size(): number {
        return this.#entity.translations.length;
    }

    clear(): void {
        this.#entity.translations = [];
    }

    delete(locale: string): boolean {
        const translation = this.#entity.translations.find((t) => t.locale === locale);
        if (translation) {
            translation.deletedAt = new Date();
            return true;
        }
        return false;
    }

    get(locale: string): T | undefined {
        const translationEntity = this.getTranslation(locale);
        if (translationEntity) {
            return translationEntity[this.#key] as any;
        }
    }

    getTranslation(locale: string) {
        const idx = this.findIndex(locale);
        if (idx === -1) {
            return;
        }
        return this.#entity.translations[idx];
    }

    has(locale: string): boolean {
        return this.findIndex(locale) !== -1;
    }

    set(locale: string, value: T): K {
        const translations = this.#entity.translations = this.#entity.translations || [];
        const idx = this.findIndex(locale);
        let translation;
        if (idx === -1) {
            translation = new this.#translationClass();
            translation.locale = locale;
            translation.entity = this.#entity;
            translations.push(translation);
        } else {
            translation = translations[idx];
            translation.deletedAt = null;
        }
        translation[this.#key] = value as any;
        return translation;
    }

    private findIndex(locale?: string) {
        const translations = this.#entity.translations;
        if (translations) {
            if (locale) {
                return translations.findIndex((l) => l.locale === locale && !l.deletedAt);
            } else {
                return translations.findIndex((l) => l && !l.deletedAt);
            }
        }
        return -1;
    }

}