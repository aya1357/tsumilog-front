/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'notosansjp-regular': ['NotoSansJP-Regular', 'sans-serif'],
        'notosansjp-medium': ['NotoSansJP-Medium', 'sans-serif'],
        'notosansjp-bold': ['NotoSansJP-Bold', 'sans-serif']
      },
      colors: {
        base: {
          white: '#FBFBFD',
          black: '#191D31',
        },
        primary: {
          100: '#0061FF0A',
          200: '#0061FF1A',
          300: '#0061FF'
        },
        neutral: {
          100: '#8C8E98',
          200: '#666876'
        },
        danger: '#F75555'
      },
    }
  },
  plugins: []
}
