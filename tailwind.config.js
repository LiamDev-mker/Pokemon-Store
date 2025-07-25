/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-bg": "#53284e",
        "purple-bg2": "#451e40",
      },
      fontFamily: {
        krub: ["Krub", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        "press-start": ["Press Start 2P", "cursive"],
        staatliches: ["Staatliches", "sans-serif"],
      },
    },
  },
  plugins: [],
};
