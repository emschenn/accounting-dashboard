/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        inherit: "inherit",
      },
      colors: {
        grass: "#4B6B42",
        gold: "#DFB85C",
      },
      borderRadius: {
        xxl: "2rem",
      },
    },
  },
  plugins: [],
};
