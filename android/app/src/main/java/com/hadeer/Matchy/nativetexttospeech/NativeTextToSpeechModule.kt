package com.nativemodules

import android.speech.tts.TextToSpeech
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import java.util.Locale

class NativeTextToSpeechModule(reactContext : ReactApplicationContext):
        NativeTextToSpeechSpec(reactContext), TextToSpeech.OnInitListener
{
    companion object{
        const val NAME = "NativeTextToSpeech"
    }
    override fun getName() = NAME
    private var tts : TextToSpeech? = null
    private var pendingSpeak = false
    override fun speak(promise: Promise?) {
        if(tts == null){
            tts = TextToSpeech(reactApplicationContext ,this)
            pendingSpeak = true
            promise?.resolve("Initializing TTS....")
        }else{
            playSpeech(promise)
//            tts?.setPitch(1.0f)
//            tts?.speak("Match Matchy", TextToSpeech.QUEUE_FLUSH, null, "tts1")
//            promise?.resolve("Sound Played")
        }
    }

    private fun playSpeech(promise : Promise?){
        tts?.setPitch(1.0f)
        val result = tts?.speak("Match Matchy", TextToSpeech.QUEUE_FLUSH, null, "tts1")
        if(result == TextToSpeech.SUCCESS){
            promise?.resolve("Sound Played")
        }
        else{
            promise?.reject("TTS_ERROR" , "Failed to speak text")
        }
    }

    override fun onInit(status: Int) {
        if(status == TextToSpeech.SUCCESS){
            val res = tts?.setLanguage(Locale.US)
            if(res == TextToSpeech.LANG_MISSING_DATA ||
                res == TextToSpeech.LANG_NOT_SUPPORTED){
                Log.e("Native Text To Speech" , "something went wrong $status")
            }
            else if(pendingSpeak){
                playSpeech(null)
                pendingSpeak = false
            }
        }else{
            Log.e(NAME , "Initialization failed with status : $status")
        }
    }
}