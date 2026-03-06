import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy (admin pages still use these)
        primary: "#1a3a4a",
        secondary: "#2d6e6e",
        accent: "#52b788",
        surface: "#f4f6f8",
        border: "#dde3e8",
        text: "#1a2a35",
        subtext: "#4a6070",
        muted: "#7a9aaa",
        // Brand (new design system)
        brand: {
          blue: "#0099CC",
          "blue-dark": "#007BAA",
          "blue-pale": "#F0F9FD",
          "blue-mid": "#D6EFF8",
          orange: "#F5A000",
          "orange-pale": "#FFF8EC",
          navy: "#003D5C",
          "navy-dark": "#001F30",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"DM Sans"', "sans-serif"],
        dm: ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
