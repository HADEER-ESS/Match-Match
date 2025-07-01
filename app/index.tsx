import COLORS from '@/constant/Color'
import NativeTextToSpeech from '@/specs/NativeTextToSpeech'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'


const OnBoarding = () => {
    const route = useRouter()

    function welcomingText() {
        NativeTextToSpeech.speak()
            .then((res) => {
                console.log("TTS works successfully ", res)
            })
            .catch((error) => {
                console.log("TTS error ", error)
            })
    }

    useEffect(() => {
        welcomingText()
        setTimeout(() => {
            route.push("/mainHome")
        }, 5000)
    })

    return (
        <View style={styles.mainScreen}>
            <Image
                source={require("../assets/images/splash_image.png")}
                style={styles.mainImage}
                width={225}
                height={225}
            />
        </View>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    midIconContainer: {},
    mainImage: {
        resizeMode: 'contain'
    }
})