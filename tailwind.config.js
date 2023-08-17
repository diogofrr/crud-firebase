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
      'hippieGreen': '#558044',
      'titanWhite': '#ECEDFF',
      'white': '#FFFFFF',
      'black': '#000000'
    },
  },
  plugins: [],
}
