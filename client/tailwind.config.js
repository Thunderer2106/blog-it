/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        teal: {
          light: "#4FD1C5",
          DEFAULT: "#319795",
          dark: "#2C7A7B",
        },
        gray: {
          light: "#F7FAFC",
          DEFAULT: "#A0AEC0",
          dark: "#2D3748",
        },
        white: "#FFFFFF",
        coral: {
          light: "#FEB2B2",
          DEFAULT: "#F56565",
          dark: "#E53E3E",
        },
        gold: {
          light: "#FAF089",
          DEFAULT: "#D69E2E",
          dark: "#B7791F",
        },
        navy: {
          light: "#63B3ED",
          DEFAULT: "#2C5282",
          dark: "#2A4365",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
