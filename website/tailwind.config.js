/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '80ch': '80ch'
      },
      animation: {
        spin: 'spin 1s linear infinite'
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
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
