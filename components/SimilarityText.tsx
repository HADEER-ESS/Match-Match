import COLORS from '@/constant/Color'
import React from 'react'
import { StyleSheet, Text } from 'react-native'


type props = {
    text: string,
    percentage: number
}

const SimilarityText = ({ text, percentage }: props) => {
    return (
        <Text style={styles.text}>{text}{'  '}
            <Text style={[styles.text, { color: percentage > 80 ? COLORS.pink : COLORS.gray }]}>
                {percentage}%
            </Text>
        </Text>
    )
}

export default SimilarityText

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 18,
        color: COLORS.black
    },
})
