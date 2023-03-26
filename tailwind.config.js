/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi"],
        krona: ["Krona One"],
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      width: {
        inherit: "inherit",
      },
      colors: {
        grass: "#4B6B42",
        gold: "#DFB85C",
        splitwise: "#5AC5A7",
        "splitwise-dark": "#3f8c76",
        gray: "D8D8D0",
        gray: "D8D8D0",
        gray: "D8D8D0",
        gray: "D8D8D0",
        custom: {
          bg: "#fafafa",
          red: "#C55A34",
          green: "#2B4427",
          cyan: "#78A390",
          yellow: "#EAB840",
          pink: "#D08DAD",
          blue: "#A4C0D9",
          beige: "#D8D8D0",
        },
      },
      borderRadius: {
        xxl: "2rem",
      },
      boxShadow: {
        // top: "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        top: "0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 -4px 6px -4px rgb(0 0 0 / 0.1)",
      },
      flex: {
        2: "2 2 0%",
      },
    },
  },
  plugins: [],
};
