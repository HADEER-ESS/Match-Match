import COLORS from '@/constant/Color'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { ReText } from 'react-native-redash'
import Svg, { Circle, G } from 'react-native-svg'


const AnimatedCircle = Animated.createAnimatedComponent(Circle)

type props = {
    progress: number,
    text: string
}

const DonutChart = ({ progress, text }: props) => {

    const CIRCUMFERANCE = 450
    const REDIUS = CIRCUMFERANCE / (2 * Math.PI)
    const STROCK_WIDTH = 15
    const HALF_CIRCLE = REDIUS + STROCK_WIDTH
    const DIAMETER = HALF_CIRCLE * 2

    const progressValue = useSharedValue<number>(0)

    useEffect(() => {
        if (!progress) {
            progressValue.value = withTiming(0, { duration: 2000 })
        }
        else {
            let percentage = progress / 100
            progressValue.value = withTiming(percentage, { duration: 2000 })
        }
    }, [progress, progressValue])

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: CIRCUMFERANCE * (1 - progressValue.value)
        }
    }, [progressValue.value])




    const animatedText = useDerivedValue(() => {
        return `${text}`
    })
    const animatedPercentageText = useDerivedValue(() => {
        return `${Math.floor(progressValue.value * 100)}%`
    })

    return (
        <View style={styles.container}>
            <ReText
                style={[styles.innerTextStyle, { top: 50, fontSize: 14 }]}
                text={animatedPercentageText}
            />
            <ReText
                style={[styles.innerTextStyle, { top: 70, fontSize: 11 }]}
                text={animatedText}
            />
            <Svg
                width={DIAMETER}
                height={DIAMETER}
                viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}
            >
                <G
                    origin={`${HALF_CIRCLE} , ${HALF_CIRCLE}`}
                    rotation={-90}
                >
                    <AnimatedCircle
                        animatedProps={animatedProps}
                        fill={'transparent'}
                        stroke={COLORS.pink}
                        r={REDIUS}
                        cx={"50%"}
                        cy={'50%'}
                        strokeWidth={STROCK_WIDTH}
                        strokeLinecap='square'
                        strokeDasharray={CIRCUMFERANCE}
                    />
                    <Circle
                        fill={'transparent'}
                        stroke={COLORS.gray}
                        r={REDIUS}
                        cx={"50%"}
                        cy={'50%'}
                        strokeWidth={STROCK_WIDTH}
                        strokeLinecap='square'
                        strokeDasharray={CIRCUMFERANCE}
                        strokeOpacity={0.2}
                    />
                </G>
            </Svg>
        </View>
    )
}

export default DonutChart

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerTextStyle: {
        position: 'absolute',
        color: COLORS.black,
        fontFamily: 'regular',
        fontSize: 11,
    }
})
