/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F16524',
          gradient_start: '#FF8233',
          gradient_end: '#FDAC55',
          menu_start: '#FF6B1A',
          menu_end: '#FF9642',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
