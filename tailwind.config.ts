import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['Instrument Sans', 'sans-serif']
      },
      colors: {
        normalWhite: "rgb(255, 255, 255)",
        primaryBlack: "rgb(var(--primary-black))",
        greyDarkest: "rgb(var(--grey-darkest))",
        greyMediumDarker: "rgb(var(--grey-medium-darker))",
        greyMediumLighter: "rgb(var(--grey-medium-lighter))",
        greyLightest: "rgb(var(--grey-lightest))",
        deepBlue: "rgb(var(--deep-blue))",
        mediumBlue: "rgb(var(--medium-blue))",
        normalRed: "hs(var(--normal-red))",
      }
    },
  },
  plugins: [],
};
export default config;
