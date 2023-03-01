/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '80ch': '80ch'
      },
      animation: {
        'gradient-x': 'gradient-x 7s ease infinite'
      }
    },
    keyframes: {
      'gradient-x': {
        '0%, 100%': {
          'background-size': '200% 200%',
          'background-position': 'right center'
        },
        '50%': {
          'background-size': '200% 200%',
          'background-position': 'left center'
        }
      }
    }
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/forms')
  ],
  corePlugins: { preflight: false }
}
