import COLORS from '@/constant/Color'
import NativeTextToSpeech from '@/specs/NativeTextToSpeech'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, ImageBackground, StatusBar, StyleSheet } from 'react-native'


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
        }, 2000)
    })

    return (
        <ImageBackground source={require("../assets/images/splash_background.webp")} style={styles.mainScreen}>
            <StatusBar barStyle={'light-content'} />
            <Image
                source={require("../assets/images/splash_image.webp")}
                style={styles.mainImage}
                width={225}
                height={225}
            />
        </ImageBackground>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    midIconContainer: {},
    mainImage: {
        resizeMode: 'contain'
    }
})