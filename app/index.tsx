import COLORS from '@/constant/Color'
import NativeTextToSpeech from '@/specs/NativeTextToSpeech'
import { useRootNavigationState, useRouter } from 'expo-router'
import React, { useEffect, useRef } from 'react'
import { Image, ImageBackground, StatusBar, StyleSheet } from 'react-native'


const OnBoarding = () => {
    const route = useRouter()
    let navState = useRootNavigationState()
    const hasNavigated = useRef(false)
    console.log("Navigation State: ", navState)



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
        if (!navState.key || hasNavigated.current) return

        hasNavigated.current = true

        welcomingText()
        const timer = setTimeout(() => {
            route.navigate("/mainHome")
        }, 2000)

        return () => clearTimeout(timer)
    }, [navState.key, route])

    return (
        <ImageBackground resizeMode='contain' source={require("../assets/images/splash_background.webp")} style={styles.mainScreen}>
            <StatusBar barStyle={'light-content'} />
            <Image
                source={require("../assets/images/splash_image.webp")}
                style={styles.mainImage}
                width={200}
                height={200}
            />
        </ImageBackground>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    midIconContainer: {},
    mainImage: {
        resizeMode: 'contain'
    }
})