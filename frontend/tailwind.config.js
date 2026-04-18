/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        belanosima: ["Belanosima", "sans-serif"],
        instrumentsans: ["Instrument Sans", "sans-serif"],
        josefinsans: ["Josefin Sans", "sans-serif"],
        notokhmer: ["Noto Sans Khmer", "sans-serif"],
        comfortaa: ["Comfortaa", "sans-serif"],
      },
      colors: {
        matcha: {
          light: "#C8D9A0",
          DEFAULT: "#A8C5A0",
          latte: "#B5C99A",
          deep: "#7A9E7E",
          dark: "#4A7C59",
        },
        dark: {
          DEFAULT: "#0a0f0a",
          moss: "#0d1a0f",
          midnight: "#0a1628",
          jade: "#0f1f1a",
          charcoal: "#1a1f1a",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
