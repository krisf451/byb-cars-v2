const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '525px',
        '4k': '2560px',
        ...defaultTheme.screens,
      },
      colors: {
        darkBg: '#12181b',
        darkBgLight: '#2a2e35',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        slideup: 'slideup .7s ease-in-out',
        slidedown: 'slidedown 1s ease-in-out',
        slideleft: 'slideleft 1s ease-in-out',
        slideright: 'slideright 1s ease-in-out',
        slowfade: 'slowfade 1.1s ease-in-out',
      },
      keyframes: {
        slowfade: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideup: { from: { opacity: 0, transform: 'translateY(25%)' }, to: { opacity: 1, transform: 'none' } },
        slidedown: { from: { opacity: 0, transform: 'translateY(-25%)' }, to: { opacity: 1, transform: 'none' } },
        slideleft: { from: { opacity: 0, transform: 'translateX(-20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        slideright: { from: { opacity: 0, transform: 'translateX(20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwind-scrollbar-hide')],
};
