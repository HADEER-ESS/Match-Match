import NativeMediaPicker, { ImageReturnData } from '@/specs/NativeMediaPicker';
import { useState } from "react";

const ImageController = () => {
    const [images, setImages] = useState<ImageReturnData[]>([]); // for two images max

    const getImageInfo = async () => {
        try {
            let result = await NativeMediaPicker.getMedia()
            setImages(prev => [...prev, result].slice(-2));
        } catch (error) {
            console.error("error in getting image color info.. ", error)
        }
    }

    const getCameraImageInfo = async () => {
        try {
            let result = await NativeMediaPicker.takePhoto()
            setImages(prev => [...prev, result].slice(-2));
        } catch (error) {
            console.error("error in taking image color info.. ", error)
        }
    }

    const clearData = () => {
        setImages([])
    }

    return {
        images,
        getCameraImageInfo,
        getImageInfo,
        clearData
    }
}

export default ImageController