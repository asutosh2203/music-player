/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      xl: { min: '701px', max: '1000px' },
      lg: { max: '700px' },
    },
  },
  plugins: [],
};
