import { getMetadataStorage } from "../../I18n";

export function I18nEntityProxy(proxyDecorator: ClassDecorator) {
    return function (target: any) {
        getMetadataStorage()
        .getStoreFor(target)
        .proxyDecorators
        .push(proxyDecorator);
    }
}