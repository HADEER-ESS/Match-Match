import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { getColors } from 'react-native-image-colors';


type ImageData = {
    uri: string;
    base64: string | undefined | null;
    color: any | null;
};

const ImageController = () => {
    const [images, setImages] = useState<ImageData[]>([]); // for two images max

    const getImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            base64: true,
            quality: 1
        })
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const base64 = result.assets[0].base64;
            const newImage: ImageData = { uri, base64, color: null };
            setImages(prev => [...prev, newImage].slice(-2)); // keep last 2 images only
        }
    }

    const getColorAnalysis = async (idx: number) => {
        const targetImage = images[idx]
        if (!targetImage) return;

        let uri = `data:image/jpeg;base64,${targetImage.base64}`
        const color = await getColors(
            uri,
            {
                fallback: '#000000',
                cache: true,
                key: uri
            }
        )
        const updatedImages = [...images];
        updatedImages[idx] = { ...targetImage, color };
        setImages(updatedImages);
    }

    return {
        images,
        getImage,
        getColorAnalysis,
    }
}


export default ImageController