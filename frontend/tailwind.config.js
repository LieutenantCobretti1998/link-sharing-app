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
    extend: {},
  },
  plugins: [],
}

