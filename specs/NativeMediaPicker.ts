import { TurboModule, TurboModuleRegistry } from "react-native";

export type ImageReturnData = {
    uri: string,
    dominantColor: string,
    vibrantColor: string,
    averageColor: string
}

export interface Spec extends TurboModule {
    getMedia(): Promise<ImageReturnData>
}


export default TurboModuleRegistry.getEnforcing<Spec>(
    'NativeMediaPicker'
)
/**
 * this name must be the same in
 * 1- here
 * 2- codegenConfig
 * 3- NAME in Native Module
 */