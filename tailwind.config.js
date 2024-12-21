/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.{html, js, php}',
    './**/*.{html, js, php}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

