import { useRouter } from 'expo-router'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

// const audioSource = require('../assets/images/intro.mp3')

const OnBoarding = () => {
    // const player = useAudioPlayer(audioSource)
    const route = useRouter()

    function pickImage() {
        console.log("function called")
        route.push("/mainHome")
    }



    // useEffect(() => {
    //     player.seekTo(5);
    //     player.play()
    // }, [])


    return (
        <View style={styles.mainScreen}>
            <Button title="Play Sound" onPress={pickImage} />
            <Button
                title="Replay Sound"
                onPress={pickImage}
            />
            {
                /*
                () => {
                    player.seekTo(0);
                    player.play();
                }
                */
            }
        </View>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    midIconContainer: {},
    mainImage: {}
})