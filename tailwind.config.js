const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: '#fff',
        primary: '#151314',
        secondary: '#363636',
        action: '#ffb400',
      },
      screens: {
        xs: '530px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
