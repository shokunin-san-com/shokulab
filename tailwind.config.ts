import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a3a4a",
        secondary: "#2d6e6e",
        accent: "#52b788",
        surface: "#f4f6f8",
        border: "#dde3e8",
        text: "#1a2a35",
        subtext: "#4a6070",
        muted: "#7a9aaa",
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
