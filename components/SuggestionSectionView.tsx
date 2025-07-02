import COLORS from '@/constant/Color'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type props = {
    colors: string[]
}

const SuggestionSectionView = ({ colors }: props) => {
    return (
        <View style={{ marginTop: 24 }}>
            <Text style={styles.textTitle}>Suggested Colors</Text>
            <View style={styles.viewContainer}>
                {
                    colors.map((itm, idx) => <View key={idx} style={[styles.colorBox, { backgroundColor: itm }]} />)
                }
            </View>
        </View>

    )
}

export default SuggestionSectionView

const styles = StyleSheet.create({
    viewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 16,
    },
    textTitle: {
        fontSize: 16,
        fontFamily: 'semi_bold',
        color: COLORS.pink
    },
    colorBox: {
        width: 36,
        height: 17,
        aspectRatio: 1,
        marginBottom: 16,
        marginHorizontal: 8,
        borderRadius: 8,
    }
})
