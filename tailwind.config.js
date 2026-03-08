/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        'glass-dark': 'rgba(15, 23, 42, 0.6)',
        'glass-light': 'rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
}
