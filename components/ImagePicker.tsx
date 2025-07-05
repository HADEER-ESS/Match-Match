import COLORS from '@/constant/Color'
import { getImageColorSimilarity } from '@/controller/colorComparesion'
import ImageController from '@/controller/imageController'
import SuggestionController from '@/controller/suggestionController'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AnalysisView from './AnalysisView'
import DonutChart from './DonutChart'
import HorizontalLine from './HorizontalLine'
import ImageView from './ImageView'
import SimilarityText from './SimilarityText'
import SuggestionSectionView from './SuggestionSectionView'
import TryAgainBtn from './TryAgainBtn'


const ImagePicker = () => {
    const { images, getImageInfo, clearData, getCameraImageInfo } = ImageController()
    const { convertHexToRgp, suggests, cleanup } = SuggestionController()
    const [compare, setCompare] = useState<boolean>(false)
    const [copData, setCompData] = useState<any>()
    const [type, setType] = useState<number>(1)  // 1=> for Numbers | 2=> for Chart

    function handleTryAgainBtn() {
        clearData()
        setCompare(false)
        setCompData([])
        cleanup()
    }

    function handlePickNewImage() {
        setCompare(false)
        getImageInfo()
    }
    function handleCameraImage() {
        setCompare(false)
        getCameraImageInfo()
    }

    function compareSimilarityImage() {
        if (images.length === 2) {
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
            let set: Set<string> = new Set()
            set.add(images[0]?.dominantColor)
            set.add(images[1]?.dominantColor)
            set.add(images[0]?.vibrantColor)
            set.add(images[1]?.vibrantColor)
            convertHexToRgp(Array.from(set))
            setCompData(res)
        }
        else {
            setCompare(false)
            Alert.alert("Hi!", "You have to pick image first")
            return null
        }
    }

    return (
        <View style={styles.ImageAnalysisContainer}>
            <View style={styles.pickerContainer}>
                {[0, 1].map(i => (
                    <View key={i}>
                        {images[i]?.uri ? (
                            <ImageView source={images[i].uri} />
                        ) : (
                            <View style={styles.pickImageContainerBnt}>
                                <View style={styles.imagePickerOptionsContainer}>
                                    <TouchableOpacity onPress={handlePickNewImage}>
                                        <Image
                                            source={require('../assets/images/img_pick.webp')}
                                            width={45}
                                            height={45}
                                            resizeMode='contain'
                                            style={{ marginHorizontal: 6 }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleCameraImage}>
                                        <Image
                                            source={require('../assets/images/camera_icv.webp')}
                                            width={45}
                                            height={45}
                                            resizeMode='contain'
                                            style={{ marginHorizontal: 6 }}
                                        />
                                    </TouchableOpacity>

                                </View>

                            </View>
                        )}
                        <AnalysisView
                            dominant={images[i]?.dominantColor}
                            vibrant={images[i]?.vibrantColor}
                            average={images[i]?.averageColor}
                        />
                    </View>
                ))}
            </View>
            <HorizontalLine />
            <Text disabled={compare} onPress={compareSimilarityImage} style={[styles.btnText, { color: compare ? COLORS.black : COLORS.pink }]}>Show Analysis</Text>

            {compare && (
                <View style={styles.analysisContainer}>
                    <View style={styles.analysisOptions}>
                        <Text
                            style={[styles.textOptionStyle, { color: type === 1 ? COLORS.pink : COLORS.gray }]}
                            onPress={() => setType(1)}
                        >
                            Numbers
                        </Text>
                        <Text
                            style={[styles.textOptionStyle, { color: type === 2 ? COLORS.pink : COLORS.gray }]}
                            onPress={() => setType(2)}
                        >
                            Chart
                        </Text>
                    </View>
                    {
                        type === 1 ?
                            <View style={{ marginTop: 36 }}>
                                <SimilarityText text={'Dominant Similarity:'} percentage={copData.dominantSimilarity} />
                                <SimilarityText text={'Vibrant Similarity:'} percentage={copData.vibrantSimilarity} />
                            </View> :
                            <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <DonutChart progress={copData.dominantSimilarity} text={'Dominant'} />
                                <DonutChart progress={copData.vibrantSimilarity} text={'Vibrant'} />
                            </View>
                    }
                    {
                        suggests.length ?
                            <SuggestionSectionView colors={suggests} /> :
                            <ActivityIndicator style={{ marginTop: 24 }} color={COLORS.pink} size={'large'} />
                    }

                    <TryAgainBtn fun={handleTryAgainBtn} />

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
    imagePickerOptionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    analysisContainer: {
        marginTop: 16,
        marginBottom: 24
    },
    analysisOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 50
    },
    textOptionStyle: {
        fontFamily: 'regular',
        fontSize: 13,
        textAlign: 'center'
    },
    pickImageContainerBnt: {
        width: 162,
        height: 176,
        borderRadius: 24,
        backgroundColor: COLORS.baby_blue,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontFamily: 'semi_bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 32
    },
    imgTextStyle: {
        fontFamily: 'semi_bold',
        fontSize: 8,
        color: COLORS.pink,
        marginTop: 16
    }
})