/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        solstice: {
          bg: '#F6F3EB',       // Raw Travertine Warm Beige
          surface: '#FAF8F5',  // Bone Chalk
          panel: '#EFECE4',    // Muted Sandstone
          sumi: '#1E1C1A',     // Deep Kyoto Sumi Ink
          sumiLight: '#3D3935',
          terracotta: '#C86D51', // Burnt Terracotta
          terracottaDark: '#A85238',
          moss: '#606C38',     // Olive Moss
          stone: '#E3DED4',    // Stone border
        },
      },
      fontFamily: {
        editorial: ['"Italiana"', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        architectural: '.28em',
        gallery: '.4em',
      },
    },
  },
  plugins: [],
}
