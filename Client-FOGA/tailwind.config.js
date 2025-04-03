const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    // Add paths to any animation components
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Custom color extensions
        'ministry-blue': '#4a6da7',
        'ministry-yellow': '#ffd166',
        'ministry-pink': '#ff9a9e',
        'ministry-teal': '#a0e7e5',
        'ministry-green': '#b5ead7',
        'ministry-red': '#ff6b6b',
      },
      animation: {
        'float': 'float 6s infinite ease-in-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
      },
      fontFamily: {
        // Child-friendly fonts
        'sans': ['"Comic Sans MS"', '"Marker Felt"', '"Arial Rounded MT Bold"', 'sans-serif'],
        'display': ['"Baloo 2"', '"Fredoka One"', 'cursive'],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/forms'),
    // Add other plugins as needed
  ],
}