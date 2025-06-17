import { getImageColorSimilarity } from '@/controller/colorComparesion'
import ImageController from '@/controller/imageController'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AnalysisView from './AnalysisView'
import ImageView from './ImageView'


const ImagePicker = () => {
    const { getImage, images, getColorAnalysis } = ImageController()
    const canCompare = images.length === 2 && images.every(img => img.color);

    const comparison = canCompare
        ? getImageColorSimilarity(images[0].color, images[1].color)
        : null;

    return (
        <View style={styles.ImageAnalysisContainer}>
            <View style={styles.pickerContainer}>
                {[0, 1].map(i => (
                    <View key={i}>
                        <TouchableOpacity onPress={getImage}>
                            {images[i]?.uri ? (
                                <ImageView source={images[i].uri} />
                            ) : (
                                <View style={styles.pickImageContainerBnt}>
                                    <Text style={styles.btnText}>+</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        {images[i] && !images[i].color && (
                            <TouchableOpacity style={styles.btnStyle} onPress={() => getColorAnalysis(i)}>
                                <Text style={[styles.btnText, { color: "#ffffff" }]}>Analyze</Text>
                            </TouchableOpacity>
                        )}

                        {images[i]?.color && <AnalysisView color={images[i].color} />}
                    </View>
                ))}
            </View>
            {comparison && (
                <View style={{ marginTop: 16 }}>
                    <Text style={{ textAlign: 'center' }}>Dominant Similarity:
                        <Text style={{ color: comparison.dominantSimilarity > 80 ? "green" : "pink", marginHorizontal: 6 }}>
                            {comparison.dominantSimilarity}%
                        </Text>
                    </Text>
                    <Text style={{ textAlign: 'center' }}>Average Similarity:
                        <Text style={{ color: comparison.vibrantSimilarity > 80 ? "green" : "pink", marginHorizontal: 6 }}>
                            {comparison.vibrantSimilarity}%
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