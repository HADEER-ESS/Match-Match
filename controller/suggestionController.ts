import { useState } from "react";

export default function SuggestionController() {

    const [converters, setConverters] = useState<number[][]>([])
    const [suggests, setSuggests] = useState<string[]>([])

    async function convertHexToRgp(hexs: string[]) {

        for (let hex of hexs) {
            setConverters(prev => [...prev, hexToRgbArray(hex)])
        }
        let sug: number[][] = await getSuggestion(converters)

        for (let item of sug) {
            setSuggests(prev => [...prev, rgbArraytoHex(item)])
        }
    }

    function hexToRgbArray(hex: string): number[] {
        const hexColor = hex.replace("#", "");
        if (hexColor.length !== 6) {
            throw new Error("Invalid HEX color format");
        }

        const r = parseInt(hexColor.slice(0, 2), 16);
        const g = parseInt(hexColor.slice(2, 4), 16);
        const b = parseInt(hexColor.slice(4, 6), 16);
        return [r, g, b];
    }

    function rgbArraytoHex(rgb: number[]): string {
        if (rgb.length !== 3 || rgb.some(v => v < 0 || v > 255)) {
            throw new Error("Invalid RGB array");
        }

        const [r, g, b] = rgb;

        let result = "#" +
            [r, g, b]
                .map((val) => val.toString(16).padStart(2, "0"))
                .join("")
                .toUpperCase()

        return result
    }

    async function getSuggestion(hexs: number[][] | undefined) {

        const URL = "http://colormind.io/api/"
        const body = {
            "model": "default",
            "input": hexs
        }

        let res = await fetch(URL, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        let data = (await res.json()).result

        return data;
    }

    function cleanup() {
        setConverters([])
        setSuggests([])
    }


    return {
        convertHexToRgp,
        cleanup,
        suggests
    }


}