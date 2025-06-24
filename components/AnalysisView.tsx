import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type ImageColor = {
    dominant: string,
    vibrant: string,
    average: string
}

const AnalysisView = ({ dominant, vibrant, average }: ImageColor) => {
    return (
        <View style={{ marginVertical: 18 }}>
            <View style={styles.infoContainer}>
                <View style={[styles.colorBox, { backgroundColor: dominant }]}></View>
                <Text>Dominant</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={[styles.colorBox, { backgroundColor: vibrant }]}></View>
                <Text>Vibrant</Text>
            </View>
        </View>
    )
}

export default AnalysisView

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    colorBox: {
        width: 25,
        height: 25,
        borderRadius: 6,
        marginVertical: 5
    }
})