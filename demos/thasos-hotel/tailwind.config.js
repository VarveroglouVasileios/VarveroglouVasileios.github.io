/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#f6f1e8', dark: '#ece4d6' },
        ink: { DEFAULT: '#26211c', soft: '#5b5249' },
        rule: '#d9cfbf',
        sea: { 600: '#1d4f63', 700: '#163f50' },
        clay: { 500: '#b4553a', 600: '#9b4630' },
      },
      fontFamily: {
        serif: ['Literata', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
