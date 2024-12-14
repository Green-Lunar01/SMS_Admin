/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#13A541'
        },
        secondary: {
          light: '#EDFBF0'
        }
      }
    }
  },
  plugins: []
};
