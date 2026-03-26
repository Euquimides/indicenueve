/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'comic-yellow':              'rgb(var(--color-comic-yellow) / <alpha-value>)',
        'comic-red':                 'rgb(var(--color-comic-red) / <alpha-value>)',
        'primary':                   'rgb(var(--color-primary) / <alpha-value>)',
        'primary-container':         'rgb(var(--color-primary-container) / <alpha-value>)',
        'secondary':                 'rgb(var(--color-secondary) / <alpha-value>)',
        'surface':                   'rgb(var(--color-surface) / <alpha-value>)',
        'surface-container-lowest':  'rgb(var(--color-surface-container-lowest) / <alpha-value>)',
        'surface-container-low':     'rgb(var(--color-surface-container-low) / <alpha-value>)',
        'surface-container':         'rgb(var(--color-surface-container) / <alpha-value>)',
        'surface-container-high':    'rgb(var(--color-surface-container-high) / <alpha-value>)',
        'surface-container-highest': 'rgb(var(--color-surface-container-highest) / <alpha-value>)',
        'on-surface':                'rgb(var(--color-on-surface) / <alpha-value>)',
        'on-surface-variant':        'rgb(var(--color-on-surface-variant) / <alpha-value>)',
        'outline':                   'rgb(var(--color-outline) / <alpha-value>)',
        'outline-variant':           'rgb(var(--color-outline-variant) / <alpha-value>)',
        'error':                     'rgb(var(--color-error) / <alpha-value>)',
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
      fontFamily: {
        headline: ['var(--font-inter)', 'sans-serif'],
        body:     ['var(--font-inter)', 'sans-serif'],
        label:    ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
