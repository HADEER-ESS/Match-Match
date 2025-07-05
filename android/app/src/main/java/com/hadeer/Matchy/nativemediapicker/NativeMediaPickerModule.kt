package com.nativemodules

import android.app.Activity
import android.content.Intent
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Environment
import android.provider.MediaStore
import android.util.Log
import androidx.core.content.FileProvider
import androidx.palette.graphics.Palette
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import java.io.File
import java.io.IOException


class NativeMediaPickerModule(private val reactContext : ReactApplicationContext)
    : NativeMediaPickerSpec(reactContext), ActivityEventListener
{
    override fun getName() = NAME

    private var mediaPickerPromise : Promise? = null
    private var photoUri: Uri? = null

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getMedia(promise: Promise) {
        val currentActivity = reactContext.currentActivity

        if(currentActivity == null || currentActivity.isFinishing){
            promise.reject("ACTIVITY_NOT_FOUND", "Current Activity: ${reactContext.currentActivity}")
            return
        }
        mediaPickerPromise = promise

        val intent = Intent(Intent.ACTION_PICK).apply {
            type = "image/"
        }
        currentActivity.startActivityForResult(intent, IMAGE_PICKER_REQUEST)

    }

    override fun takePhoto(promise: Promise?) {
        val currentActivity = reactContext.currentActivity
        if(currentActivity == null || currentActivity.isFinishing){
            promise?.reject("ACTIVITY_NOT_FOUND", "Current Activity: ${reactContext.currentActivity}")
            return
        }
        mediaPickerPromise = promise
        val photoFile: File? = createImageFile()
        if(photoFile == null){
            promise?.reject("FILE_CREATION_FAILED" , "Failed to create image file")
            return
        }

        photoUri = FileProvider.getUriForFile(
            reactContext,
            reactContext.packageName + ".provider",
            photoFile
        )

        val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE).apply {
            putExtra(MediaStore.EXTRA_OUTPUT, photoUri)
            addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
        }

        currentActivity.startActivityForResult(intent, IMAGE_CAPTURE_REQUEST)
    }

    private fun createImageFile(): File? {
        return try {
            val storageDir = reactContext.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
            File.createTempFile("IMG_" , ".png", storageDir)
        }
        catch (e : IOException){
            e.printStackTrace()
            null
        }
    }

    companion object {
        const val NAME = "NativeMediaPicker"
        private const val IMAGE_PICKER_REQUEST = 1002
        private const val IMAGE_CAPTURE_REQUEST = 1001
    }

    override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
        if(resultCode != Activity.RESULT_OK){
            mediaPickerPromise?.reject("No_IMAGE" , "No image selected")
            mediaPickerPromise = null
            return
        }
        when(requestCode){
            IMAGE_PICKER_REQUEST -> {
                val uri : Uri? = data?.data
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
            }
            IMAGE_CAPTURE_REQUEST -> {
                val dominantHex = getDominantColor(photoUri!!)
                val vibrantHex = getVibrantColor(photoUri!!)
                val averageHex = getAverageColor(photoUri!!)
                val result = Arguments.createMap().apply {
                    putString("uri", photoUri!!.toString())
                    putString("dominantColor", dominantHex)
                    putString("vibrantColor", vibrantHex)
                    putString("averageColor", averageHex)
                }
                mediaPickerPromise?.resolve(result)
            }
        }
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

    override fun onNewIntent(intent: Intent?) {
        // No action needed for now, but must be implemented
    }
}

