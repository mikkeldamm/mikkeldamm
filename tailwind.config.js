module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './domains/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: '#fff',
        primary: '#151314',
        secondary: '#363636',
        action: '#ffb400',
      },
      screens: {
        xs: '530px',
      },
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
      borderRadius: {
        fancy: '67% 33% 56% 44% / 65% 58% 42% 35%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
