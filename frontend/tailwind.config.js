/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/**/*.{js,jsx}"
  ],
  theme: {
    colors: {
        "primaryPurple": "#633CFF",
        "successGreen": "#B1D690",
        "successGreenDark": "#4C4B16",
        "lightPurple1": "#BEADFF",
        "lightPurple2": "#EFEBFF",
        "primaryPurple3": "#4015f8",
        "lightBlack-1": "#333333",
        "lightBlack-2": "#737373",
        "lightBlack-3": "#797878",
        "grey": "#D9D9D9",
        "light-grey": "#FAFAFA",
        "light-grey-2": "#e5e5e5",
        "white": "#ffffff",
        "red": "#FF3939",
        "dark-red": "#9f0404",
    },
    fontFamily: {
        instrumentBold: ["InstrumentSans-Bold", "sans-serif"],
        instrumentNormal: ["InstrumentSans-Regular", "sans-serif"],
        instrumentSemiBold: ["InstrumentSans-SemiBold", "sans-serif"],
    },
    keyframes: {
      "fill-bounce": {
        "0%, 100%": {
          transform: "translateY(0)",
          fill: "transparent"
        },
        "50%": {
          transform: 'translateY(-25%)',
          fill: "#633CFF"
        }
      },
      "spin": {
          "0%": {
          transform: "rotate(0deg)"
          },
          "100%": {
              transform: "rotate(360deg)"
          }
      }
    },
    animation: {
      "fill-bounce": "fill-bounce 1s infinite linear",
      "spin": "spin 1s infinite linear"
    },
    extend: {},
    screens: {
        "xs": "320px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1366px",
        "2xl": "1920px",
        "3xl": "2560px",
        "max-xs": {"max": "640px"},
        "max-sm": {"max": "1280px"},
    },
  },
  plugins: [],
}

