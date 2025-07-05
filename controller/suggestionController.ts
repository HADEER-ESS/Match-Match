import { useState } from "react";

export default function SuggestionController() {

    const [suggests, setSuggests] = useState<string[]>([])

    async function convertHexToRgp(hexs: string[]) {

        for (let hex of hexs) {
            let color = await getSuggestion(hex)
            setSuggests((prev) => [...prev, ...color])
        }
    }

    async function getSuggestion(hex: string): Promise<string[]> {

        const URL = `https://www.thecolorapi.com/scheme?hex=${hex.replace("#", "")}&mode=analogic&count=3`

        let res = await fetch(URL)

        let data = await res.json()
        let results = data.colors

        let colors = []

        for (let i = 0; i < results.length; i++) {
            let color = results[i].hex.value
            colors.push(color)
        }
        return colors;
    }

    function cleanup() {
        setSuggests([])
    }


    return {
        convertHexToRgp,
        cleanup,
        suggests
    }


}