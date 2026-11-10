/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        sand: { 50: '#fbf8f3', 100: '#f6f1e9', 200: '#ece3d4' },
        olive: { 600: '#566a3f', 700: '#455535', 800: '#35422a' },
        sea: { 500: '#2a7a99', 600: '#1f6482', 700: '#184e66' },
        clay: { 500: '#c96f4a', 600: '#b05a38' },
      },
      fontFamily: { serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'] },
    },
  },
  plugins: [],
}
