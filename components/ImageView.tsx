import React from 'react'
import { Image, View } from 'react-native'

const ImageView = ({ source }: { source: string }) => {
    return (
        <View>
            <Image source={{ uri: source }} width={150} height={150} />
        </View>
    )
}

export default ImageView