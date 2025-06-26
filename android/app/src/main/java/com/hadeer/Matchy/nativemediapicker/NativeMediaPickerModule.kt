package com.nativemediapicker

import android.app.Activity
import android.content.Intent
import android.graphics.BitmapFactory
import android.net.Uri
import android.speech.tts.TextToSpeech
import android.util.Log
import androidx.palette.graphics.Palette
import com.facebook.fbreact.specs.NativeMediaPickerSpec
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext


class NativeMediaPickerModule(reactContext : ReactApplicationContext)
    : NativeMediaPickerSpec(reactContext), ActivityEventListener
{
    override fun getName() = NAME
    private var tts :TextToSpeech? = null
    private val text : String = "Matchy Matchy"
    private val  spead : Float = 1.0f

    private var mediaPickerPromise : Promise? = null

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getMedia(promise: Promise) {
        val currentActivity = currentActivity

        if(currentActivity == null){
            promise.reject("ACTIVITY_NOT_FOUND", "Activity doesn't exist")
            return
        }
        mediaPickerPromise = promise
//        val nintent = Intent(MediaStore.ACTION_PICK_IMAGES)
        val intent = Intent(Intent.ACTION_PICK).apply {
            type = "image/"
        }
        currentActivity.startActivityForResult(intent, IMAGE_PICKER_REQUEST)

    }
    companion object {
        const val NAME = "NativeMediaPicker"
        private const val IMAGE_PICKER_REQUEST = 12345
    }

    override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
        Log.d("NativeMediaPicker", "onActivityResult triggered: $requestCode")
        if(requestCode == IMAGE_PICKER_REQUEST && resultCode == Activity.RESULT_OK){
            val uri: Uri? = data?.data
            if(uri != null) {
                val dominantHex = getDominantColor(uri)
                val vibrantHex = getVibrantColor(uri)
                val averageHex = getAverageColor(uri)
                val result = Arguments.createMap().apply {
                    putString("uri", uri.toString())
                    putString("dominantColor", dominantHex)
                    putString("vibrantColor", vibrantHex)
                    putString("averageColor", averageHex)
                }
                mediaPickerPromise?.resolve(result)
            }
            else{
                mediaPickerPromise?.reject("No_IMAGE" , "No image selected")
            }
        }
        mediaPickerPromise = null
    }

    private fun getDominantColor(uri: Uri) : String{
        val inputStream = reactApplicationContext.contentResolver.openInputStream(uri)
        val bitmap = BitmapFactory.decodeStream(inputStream)
        inputStream?.close()

        val palette = Palette.from(bitmap).generate()
        val intColor = palette.getDominantColor(0x000000)//fallback (DEFAULT) return
        return convertHex(intColor)
    }

    private fun getVibrantColor(uri:Uri):String{
        val inputStream = reactApplicationContext.contentResolver.openInputStream(uri)
        val bitmap = BitmapFactory.decodeStream(inputStream)
        inputStream?.close()

        val palette = Palette.from(bitmap).generate()
        val color = palette.getVibrantColor(0x000000)
        return convertHex(color)
    }

    private fun getAverageColor(uri: Uri):String?{
        val inputStream = reactApplicationContext.contentResolver.openInputStream(uri)
        val bitmap = BitmapFactory.decodeStream(inputStream)
        inputStream?.close()

        if (bitmap == null)return null

        var r = 0L
        var g = 0L
        var b = 0L
        val width = bitmap.width
        val height = bitmap.height
        val pixels = IntArray(width * height)
        bitmap.getPixels(pixels,0,width,0,0,width,height)

        for (pixel in pixels){
            r += (pixel shr 16) and 0xFF
            g += (pixel shr 8) and 0xFF
            b += pixel and 0xFF
        }
        val count = pixels.size
        val intColor =  (0xFF shr 24) or
                (((r / count).toInt() and 0xFF) shl 16) or
                (((g / count).toInt() and 0xFF) shl 8) or
                ((b / count).toInt() and 0xFF)

        return convertHex(intColor)
    }

    private fun convertHex(color : Int?):String{
        return  String.format("#%06X" , 0xFFFFFF and color!!)
    }

    override fun onNewIntent(p0: Intent?) {
        TODO("Not yet implemented")
    }
}

