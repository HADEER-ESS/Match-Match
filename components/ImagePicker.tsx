import { getImageColorSimilarity } from '@/controller/colorComparesion'
import ImageController from '@/controller/imageController'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AnalysisView from './AnalysisView'
import ImageView from './ImageView'


const ImagePicker = () => {
    const { images, getImageInfo } = ImageController()
    const [compare, setCompare] = useState<boolean>(false)
    const [copData, setCompData] = useState<any>()

    function compareSimilarityImage() {
        setCompare(true)
        let res = getImageColorSimilarity(
            {
                dominant: images[0]?.dominantColor,
                average: images[0]?.vibrantColor
            },
            {
                dominant: images[1]?.dominantColor,
                average: images[1]?.vibrantColor
            }
        )

        setCompData(res)
    }

    return (
        <View style={styles.ImageAnalysisContainer}>
            <View style={styles.pickerContainer}>
                {[0, 1].map(i => (
                    <View key={i}>
                        <TouchableOpacity onPress={getImageInfo}>
                            {images[i]?.uri ? (
                                <ImageView source={images[i].uri} />
                            ) : (
                                <View style={styles.pickImageContainerBnt}>
                                    <Text style={styles.btnText}>+</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <AnalysisView
                            dominant={images[i]?.dominantColor}
                            vibrant={images[i]?.vibrantColor}
                            average={images[i]?.averageColor}
                        />
                    </View>
                ))}
            </View>
            {images.length === 2 &&
                <TouchableOpacity style={styles.btnStyle} onPress={compareSimilarityImage}>
                    <Text style={styles.btnText}>Analyis</Text>
                </TouchableOpacity>}
            {compare && (
                <View style={{ marginTop: 16 }}>
                    <Text style={{ textAlign: 'center' }}>Dominant Similarity:
                        <Text style={{ color: copData.dominantSimilarity > 80 ? "green" : "pink", marginHorizontal: 6 }}>
                            {copData.dominantSimilarity}%
                        </Text>
                    </Text>
                    <Text style={{ textAlign: 'center' }}>Average Similarity:
                        <Text style={{ color: copData.vibrantSimilarity > 80 ? "green" : "pink", marginHorizontal: 6 }}>
                            {copData.vibrantSimilarity}%
                        </Text>
                    </Text>
                </View>

            )}
        </View>
    );
}

export default ImagePicker


const styles = StyleSheet.create({
    ImageAnalysisContainer: {
        flexDirection: 'column',
    },
    btnStyle: {
        backgroundColor: '#f010ff',
        paddingVertical: 8,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    pickImageContainerBnt: {
        borderColor: '#d1d1d1',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 20,
        width: 150,
        height: 150
    },
    btnText: {
        fontSize: 25,
        color: '#000000',
        fontWeight: '200'
    }
})