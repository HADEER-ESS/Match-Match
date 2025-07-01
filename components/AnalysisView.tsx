import COLORS from '@/constant/Color'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type ImageColor = {
    dominant: string,
    vibrant: string,
    average: string
}


function ShowedText({ txt, color }: { txt: string, color: string }) {
    return (
        <View style={styles.infoContainer}>
            <Text style={styles.textTitleStyle}>{txt}</Text>
            <View style={[styles.colorBox, { backgroundColor: color ?? COLORS.baby_blue }]}></View>
        </View>
    )
}


const AnalysisView = ({ dominant, vibrant, average }: ImageColor) => {
    return (
        <View style={{ marginVertical: 24, }}>
            <ShowedText txt={"Dominant"} color={dominant} />
            <ShowedText txt={"Vibrant"} color={vibrant} />
        </View>
    )
}

export default AnalysisView

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    colorBox: {
        width: 71,
        height: 16,
        borderRadius: 4,
        // marginVertical: 5
    },
    textTitleStyle: {
        color: COLORS.black,
        fontSize: 13,
        fontFamily: 'regular'
    }
})