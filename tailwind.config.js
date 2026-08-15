import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        contrast: 'rgb(var(--color-contrast) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        gold: {
          50: '#fdfbf7',
          100: '#f9f5ec',
          200: '#f2e8d4',
          300: '#e8d5b0',
          400: '#d9bb82',
          500: '#c59a4c',
          600: '#ab7f37',
          700: '#8c622b',
          800: '#714e26',
          900: '#5e4123',
        },
        royal: {
          navy: '#0A1128',
          blue: '#1C3144',
          maroon: '#4A0E17',
          emerald: '#064E3B',
          charcoal: '#1A1A1A',
        },
      },
      screens: {
        sm: '32em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        '2xl': '96em',
        'sm-max': {max: '48em'},
        'sm-only': {min: '32em', max: '48em'},
        'md-only': {min: '48em', max: '64em'},
        'lg-only': {min: '64em', max: '80em'},
        'xl-only': {min: '80em', max: '96em'},
        '2xl-only': {min: '96em'},
      },
      boxShadow: {
        border: 'inset 0px 0px 0px 1px rgb(var(--color-primary) / 0.08)',
        darkHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.4)',
        lightHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.05)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Cinzel"', 'Cinzel', '"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin],
};
