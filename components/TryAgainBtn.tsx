import COLORS from '@/constant/Color'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'


type porps = {
    fun: () => void
}

const TryAgainBtn = ({ fun }: porps) => {
    return (
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={fun}
        >
            <Text style={styles.btnText}>Try Again</Text>
        </TouchableOpacity>
    )
}

export default TryAgainBtn

const styles = StyleSheet.create({
    btnContainer: {
        marginHorizontal: 110,
        paddingVertical: 12,
        backgroundColor: COLORS.pink,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'transparent',
        marginTop: 24
    },
    btnText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: "medium",
        textAlign: 'center'
    }
})