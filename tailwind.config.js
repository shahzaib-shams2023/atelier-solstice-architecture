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
          bg: '#F5F2EB',          // Warm raw travertine
          surface: '#FAF8F5',     // Limestone bone
          panel: '#ECE7DD',       // Muted plaster stone
          sumi: '#111110',        // Deepest Kyoto sumi pine ink
          sumiMuted: '#3A3734',   // Aged charcoal
          sumiLight: '#6A645D',   // Architectural pencil grey
          terracotta: '#B85D3B',  // Fired Bizen clay
          terracottaDark: '#934327',
          terracottaGlow: '#D97746',
          moss: '#505A3E',        // Kyoto moss / Bornholm pine
          stone: '#E2DCD1',       // Precision 1px drafting hairline
          stoneDark: '#CDC4B5',
          ochre: '#C88C48',       // Golden hour sunlight highlight
          bone: '#FCFBF8',
        },
      },
      fontFamily: {
        editorial: ['"Italiana"', 'Didot', 'Bodoni MT', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        architectural: '.28em',
        gallery: '.42em',
        codex: '.55em',
      },
      boxShadow: {
        'plinth': '0 24px 48px -12px rgba(17, 17, 16, 0.07)',
        'plinth-lg': '0 32px 64px -16px rgba(17, 17, 16, 0.12)',
        'tactile': 'inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 12px 28px -8px rgba(17, 17, 16, 0.05)',
      },
    },
  },
  plugins: [],
}
