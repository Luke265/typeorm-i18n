import { Column, ColumnOptions } from "typeorm";
import { ColumnCommonOptions } from "typeorm/decorator/options/ColumnCommonOptions";
import { ColumnHstoreOptions } from "typeorm/decorator/options/ColumnHstoreOptions";
import { ColumnEnumOptions } from "typeorm/decorator/options/ColumnEnumOptions";
import { WithPrecisionColumnType, WithWidthColumnType, WithLengthColumnType, SpatialColumnType, SimpleColumnType, ColumnType } from "typeorm/driver/types/ColumnTypes";
import { ColumnEmbeddedOptions } from "typeorm/decorator/options/ColumnEmbeddedOptions";
import { ColumnNumericOptions } from "typeorm/decorator/options/ColumnNumericOptions";
import { ColumnWithWidthOptions } from "typeorm/decorator/options/ColumnWithWidthOptions";
import { ColumnWithLengthOptions } from "typeorm/decorator/options/ColumnWithLengthOptions";
import { SpatialColumnOptions } from "typeorm/decorator/options/SpatialColumnOptions";
import { getOrCreateEntityI18nClass } from "../I18n";
import { I18nValueImpl } from "../I18nValueImpl";

/**
 * Column decorator is used to mark a specific class property as a table column. Only properties decorated with this
 * decorator will be persisted to the database when entity be saved.
 */
export function I18nColumn(): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 * Only properties decorated with this decorator will be persisted to the database when entity be saved.
 */
export function I18nColumn(options: ColumnOptions): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 * Only properties decorated with this decorator will be persisted to the database when entity be saved.
 */
export function I18nColumn(type: SimpleColumnType, options?: ColumnCommonOptions): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 * Only properties decorated with this decorator will be persisted to the database when entity be saved.
 */
export function I18nColumn(type: SpatialColumnType, options?: ColumnCommonOptions & SpatialColumnOptions): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 * Only properties decorated with this decorator will be persisted to the database when entity be saved.
 */
export function I18nColumn(type: WithLengthColumnType, options?: ColumnCommonOptions & ColumnWithLengthOptions): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 * Only properties decorated with this decorator will be persisted to the database when entity be saved.
 */
export function I18nColumn(type: WithWidthColumnType, options?: ColumnCommonOptions & ColumnWithWidthOptions): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 * Only properties decorated with this decorator will be persisted to the database when entity be saved.
 */
export function I18nColumn(type: WithPrecisionColumnType, options?: ColumnCommonOptions & ColumnNumericOptions): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 * Only properties decorated with this decorator will be persisted to the database when entity be saved.
 */
export function I18nColumn(type: "enum", options?: ColumnCommonOptions & ColumnEnumOptions): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 * Only properties decorated with this decorator will be persisted to the database when entity be saved.
 */
export function I18nColumn(type: "simple-enum", options?: ColumnCommonOptions & ColumnEnumOptions): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 * Only properties decorated with this decorator will be persisted to the database when entity be saved.
 */
export function I18nColumn(type: "hstore", options?: ColumnCommonOptions & ColumnHstoreOptions): Function;

/**
 * Column decorator is used to mark a specific class property as a table column.
 * Only properties decorated with this decorator will be persisted to the database when entity be saved.
 *
 * Property in entity can be marked as Embedded, and on persist all columns from the embedded are mapped to the
 * single table of the entity where Embedded is used. And on hydration all columns which supposed to be in the
 * embedded will be mapped to it from the single table.
 */
export function I18nColumn(type: (type?: any) => Function, options?: ColumnEmbeddedOptions): Function;

export function I18nColumn(typeOrOptions?: ((type?: any) => Function) | ColumnType | (ColumnOptions & ColumnEmbeddedOptions), options?: (ColumnOptions & ColumnEmbeddedOptions)) {
    return function (target: any, propertyName: string) {
        const entityClass = target.constructor;
        const i18nClass = getOrCreateEntityI18nClass(entityClass);
        Reflect.decorate([Column(typeOrOptions as any, options) as PropertyDecorator], i18nClass.prototype, propertyName);
        Object.defineProperty(entityClass.prototype, propertyName, {
            enumerable: true,
            get: function () {
                const value = new I18nValueImpl<any, any>(this, i18nClass, propertyName);
                // after first "get" change this getter to normal value (optional)
                Object.defineProperty(this, propertyName, {
                    value
                });
                return value;
            }
        });
    }
}