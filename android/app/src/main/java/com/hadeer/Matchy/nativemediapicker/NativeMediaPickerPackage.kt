package com.nativemediapicker

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NativeMediaPickerPackage : BaseReactPackage(){
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        if(name == NativeMediaPickerModule.NAME){
            return NativeMediaPickerModule(reactContext)
        }
        else{
            return null
        }
    }

    override fun getReactModuleInfoProvider()= ReactModuleInfoProvider {
        mapOf(
            NativeMediaPickerModule.NAME to ReactModuleInfo(
                name = NativeMediaPickerModule.NAME,
                className = NativeMediaPickerModule.NAME,
                canOverrideExistingModule = false,
                needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = true
            )
        )
    }

}
