/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2A4D0F',
        secondary: '#8B4513',
        accent: '#C9A84C',
        cream: '#FAF6EE',
        forest: '#0D1A07',
        purple: '#7B5EA7',
        lavender: '#F0EBFF',
        mauve: '#C4B0E8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
