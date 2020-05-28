import { ColumnOptions } from "typeorm";
import { ColumnCommonOptions } from "typeorm/decorator/options/ColumnCommonOptions";
import { ColumnEnumOptions } from "typeorm/decorator/options/ColumnEnumOptions";
import { WithPrecisionColumnType, WithLengthColumnType, SimpleColumnType, ColumnType } from "typeorm/driver/types/ColumnTypes";
import { ColumnEmbeddedOptions } from "typeorm/decorator/options/ColumnEmbeddedOptions";
import { ColumnNumericOptions } from "typeorm/decorator/options/ColumnNumericOptions";
import { ColumnWithLengthOptions } from "typeorm/decorator/options/ColumnWithLengthOptions";
import { getMetadataStorage } from "../../I18n";

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
export function I18nColumn(type: WithLengthColumnType, options?: ColumnCommonOptions & ColumnWithLengthOptions): Function;
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
 *
 * Property in entity can be marked as Embedded, and on persist all columns from the embedded are mapped to the
 * single table of the entity where Embedded is used. And on hydration all columns which supposed to be in the
 * embedded will be mapped to it from the single table.
 */
export function I18nColumn(type: (type?: any) => Function, options?: ColumnEmbeddedOptions): Function;

export function I18nColumn(typeOrOptions?: ((type?: any) => Function) | ColumnType | (ColumnOptions & ColumnEmbeddedOptions), options?: (ColumnOptions & ColumnEmbeddedOptions)) {
    return function (target: any, propertyName: string) {
        getMetadataStorage()
            .getStoreForProperty(target.constructor, propertyName)
            .columnOptions = {
            typeOrOptions,
            options
        };
    }
}