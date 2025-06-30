package com.nativemodules

import android.speech.tts.TextToSpeech
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

class NativeTextToSpeechModule(reactContext : ReactApplicationContext):
        NativeTextToSpeechSpec(reactContext), TextToSpeech.OnInitListener
{
    companion object{
        const val NAME = "NativeTextToSpeech"
    }
    override fun getName() = NAME
    private var tts : TextToSpeech? = null
    override fun speak(promise: Promise?) {
        if(tts == null){
            tts = TextToSpeech(reactApplicationContext ,this)
            promise?.resolve("Initialize")
        }else{
            tts?.setPitch(1.0f)
            tts?.speak("Match Matchy", TextToSpeech.QUEUE_FLUSH, null, "tts1")
            promise?.resolve("Sound Played")
        }
    }

    override fun onInit(p0: Int) {
        TODO("Not yet implemented")
    }


}