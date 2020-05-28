import { getMetadataStorage } from "../../I18n";

export function I18nColumnProxy(proxyDecorator: PropertyDecorator | Function) {
    return function (target: any, propertyName: string) {
        getMetadataStorage()
        .getStoreForProperty(target.constructor, propertyName)
        .proxyDecorators
        .push(proxyDecorator as PropertyDecorator);
    }
}