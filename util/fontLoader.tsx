import { useFonts } from 'expo-font'
import React from "react"


type props = {
    children: React.ReactNode
}

export function FontLoader({ children }: props) {

    const [fontsLoaded] = useFonts({
        'odd': require("../assets/fonts/Frijole-Regular.ttf"),
        'regular': require("../assets/fonts/Poppins-Regular.ttf"),
        'semi_bold': require("../assets/fonts/Poppins-SemiBold.ttf"),
        'bold': require("../assets/fonts/Poppins-Bold.ttf"),
        'medium': require("../assets/fonts/Poppins-Medium.ttf")
    })

    if (!fontsLoaded) return null

    return (
        <>{children}</>
    )
}