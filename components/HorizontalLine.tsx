import COLORS from '@/constant/Color'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const HorizontalLine = () => {
    return (
        <View style={styles.viewContainer}>
            <View style={styles.viewCircle}></View>
            <View style={styles.viewLine}></View>
            <View style={styles.viewCircle}></View>
        </View>
    )
}

export default HorizontalLine

const styles = StyleSheet.create({
    viewContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32
    },
    viewCircle: {
        backgroundColor: COLORS.pink,
        width: 6,
        height: 6,
        borderRadius: 6
    },
    viewLine: {
        backgroundColor: COLORS.pink,
        width: 201,
        height: 1.5
    }
})