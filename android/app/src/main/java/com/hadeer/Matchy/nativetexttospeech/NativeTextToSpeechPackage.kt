package com.nativemodules

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NativeTextToSpeechPackage: BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        if(name == NativeTextToSpeechModule.NAME){
            return NativeTextToSpeechModule(reactContext)
        }
        else{
            return null;
        }
    }

    override fun getReactModuleInfoProvider()= ReactModuleInfoProvider {
        mapOf(
            NativeTextToSpeechModule.NAME to ReactModuleInfo(
                name = NativeTextToSpeechModule.NAME,
                className = NativeTextToSpeechModule.NAME,
                canOverrideExistingModule = false,
                needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = true
            )
        )
    }
}