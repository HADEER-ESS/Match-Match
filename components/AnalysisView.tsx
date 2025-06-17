import React from 'react'
import { StyleSheet, Text, View } from 'react-native'



const AnalysisView = ({ color }: Record<string, string>) => {
    return (
        <View style={{ marginVertical: 18 }}>
            <View style={styles.infoContainer}>
                <View style={[styles.colorBox, { backgroundColor: color?.dominant }]}></View>
                <Text>Dominant</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={[styles.colorBox, { backgroundColor: color?.average }]}></View>
                <Text>Average</Text>
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