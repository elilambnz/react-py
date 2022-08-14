/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        '80ch': '80ch'
      }
    },
  },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [],
  corePlugins: { preflight: false },
};
