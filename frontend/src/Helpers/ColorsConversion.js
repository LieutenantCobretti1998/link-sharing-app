"use strict";

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split("").map(char => char + char).join("");
    }

    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

function rgbToHex(r, g, b) {
    return (
        "#" + [r, g, b].map((value) => {
            const hex = value.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join("")
    )
}

function averageColors(colors) {
    const total = colors.reduce((acc, color) => {
        acc.r += color.r;
        acc.g += color.g;
        acc.b += color.b;
        return acc;
    },
        {r: 0, g: 0, b: 0});

    return {
        r: Math.round(total.r / colors.length),
        g: Math.round(total.g / colors.length),
        b: Math.round(total.b / colors.length),
    }
}

export {hexToRgb, averageColors, rgbToHex}