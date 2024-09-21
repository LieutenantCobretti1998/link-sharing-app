/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/**/*.{js,jsx}"
  ],
  theme: {
    colors: {
      "primaryPurple": "#633CFF",
      "lightPurple1": "#BEADFF",
      "lightPurple2": "#EFEBFF",
      "primaryPurple3": "#4015f8",
      "lightBlack-1": "#333333",
      "lightBlack-2": "#737373",
      "lightBlack-3": "#797878",
      "grey": "#D9D9D9",
      "light-grey": "#FAFAFA",
      "white": "#ffffff",
      "red": "#FF3939"
    },
    fontFamily: {
        instrumentBold: ["InInstrumentSans-Bold", "sans-serif"],
        instrumentNormal: ["IInstrumentSans-Regular", "sans-serif"],
        instrumentSemiBold: ["IInstrumentSans-SemiBold", "sans-serif"],
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
      }
    },
    animation: {
      "fill-bounce": "fill-bounce 1s infinite linear",
    },
    extend: {},
  },
  plugins: [],
}

