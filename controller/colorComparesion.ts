const hexToRGB = (hex: string): Record<string, number> => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

const calcDis = (col1: Record<string, number>, col2: Record<string, number>) => {
    return Math.sqrt(
        Math.pow(col1.r - col2.r, 2) +
        Math.pow(col1.g - col2.g, 2) +
        Math.pow(col1.b - col2.b, 2)
    )
}


// Convert distance to similarity %
const similarityCheck = (colorCode1: string, colorCode2: string): number => {

    let rgb1 = hexToRGB(colorCode1)
    let rgb2 = hexToRGB(colorCode2)

    let distance = calcDis(rgb1, rgb2)
    const maxDistance = Math.sqrt(3 * Math.pow(255, 2)); // ≈ 441.67

    return (1 - distance / maxDistance) * 100;
}

// Final function to compare two images
export const getImageColorSimilarity = (image1Colors: Record<string, string>, image2Colors: Record<string, string>) => {
    const domSim = similarityCheck(image1Colors.dominant, image2Colors.dominant);
    const vibSim = similarityCheck(image1Colors.average, image2Colors.average);

    const finalSimilarity = (domSim + vibSim) / 2;

    return {
        dominantSimilarity: parseInt(domSim.toFixed(2)),
        vibrantSimilarity: parseInt(vibSim.toFixed(2)),
        overallSimilarity: parseInt(finalSimilarity.toFixed(2))
    };
};