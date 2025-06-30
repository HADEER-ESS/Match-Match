import { TurboModule, TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
    speak(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
    'NativeTextToSpeech'
)