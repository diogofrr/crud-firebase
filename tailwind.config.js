/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'tuna': '#30324D',
      'chetwodeBlue': '#8184CC',
      'hippieGreen': {
        100: '#B3CCA9',
        200: '#8FBD8E',
        300: '#6BAC73',
        400: '#5D9C68',
        500: '#558044',
        600: '#446939',
        700: '#334D29'
      },
      'titanWhite': '#ECEDFF',
      'white': '#FFFFFF',
      'black': '#000000',
      'gray': {
        100: '#F9F9F9',
        200: '#EAEAEB',
        300: '#DBDBDC',
        400: '#CFCFCF',
        500: '#C7C7C7',
        600: '#B0B0B0',
        700: '#7A7A7A'
      },
      'blue': {
        100: '#C0D9ED',
        200: '#99C1E1',
        300: '#73A9D5',
        400: '#4C91C9',
        500: '#176FA6',
        600: '#115992',
        700: '#0B417D'
      },
      'yellow': {
        100: '#EED5A1',
        200: '#E5C17C',
        300: '#DAAE58',
        400: '#CF9A33',
        500: '#D79F42',
        600: '#C18B31',
        700: '#AB7720'
      },
      'red': {
        100: '#D99AAD',
        200: '#D07D8B',
        300: '#C7516A',
        400: '#BD3152',
        500: '#A63A50',
        600: '#902344',
        700: '#7A1C38'
      }
    }
  },
  plugins: [],
}
