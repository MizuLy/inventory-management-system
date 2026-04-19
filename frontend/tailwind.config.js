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
        coffee: {
          base: "#3B1F0A", // dark espresso bg
          surface: "#F5F0E8", // cream card bg
          terracotta: "#C47B4E", // warm accent
          rose: "#C49A8A", // dusty rose
          olive: "#6B7C5C", // natural green
          teal: "#2A7C74", // bold CTA / highlight
          gold: "#C49A2A", // honey/amber badge
          text: "#2C1A0E", // dark warm text
          muted: "#8C7B6E", // subtle secondary text
          border: "#D6C9B8", // warm neutral border
        },
        nord: {
          // Polar Night (Darks)
          900: "#2E3440", // nord0
          800: "#3B4252", // nord1
          700: "#434C5E", // nord2
          600: "#4C566A", // nord3

          // Snow Storm (Lights/Text)
          400: "#D8DEE9", // nord4
          300: "#E5E9F0", // nord5
          200: "#ECEFF4", // nord6 (purest white)

          // Frost (Primary Accents)
          frost: "#88C0D0", // nord8 (light blue)
          frostDark: "#81A1C1", // nord9 (medium blue)
          frostDeep: "#5E81AC", // nord10 (dark blue)
          frostIce: "#8FBCBB", // nord7 (cyan/teal)

          // Aurora (Status Colors)
          red: "#BF616A", // nord11
          orange: "#D08770", // nord12
          yellow: "#EBCB8B", // nord13
          green: "#A3BE8C", // nord14
          purple: "#B48EAD", // nord15

          // Semantic Aliases
          white: "#ECEFF4",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: true,
  },
};
