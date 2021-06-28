module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './domains/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      background: '#F2E8DE',
      primary: '#151314',
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate( 0.0deg)' },
          '10%': { transform: 'rotate(14.0deg)' },
          '20%': { transform: 'rotate(-8.0deg)' },
          '30%': { transform: 'rotate(14.0deg)' },
          '40%': { transform: 'rotate(-4.0deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate( 0.0deg)' },
          '100%': { transform: 'rotate( 0.0deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 2.5s ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
