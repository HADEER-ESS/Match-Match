import { useAudioPlayer } from 'expo-audio'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

const audioSource = require('../assets/images/intro.mp3')

const OnBoarding = () => {
    const player = useAudioPlayer(audioSource)

    // useEffect(() => {
    //     player.seekTo(5);
    //     player.play()
    // }, [])


    return (
        <View style={styles.mainScreen}>
            <Button title="Play Sound" onPress={() => player.play()} />
            <Button
                title="Replay Sound"
                onPress={() => {
                    player.seekTo(0);
                    player.play();
                }}
            />
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