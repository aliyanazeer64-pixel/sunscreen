/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F9B233',
          50: '#FFF9E6',
          100: '#FFF4D6',
          200: '#FFE8AD',
          300: '#FFDB7A',
          400: '#FFC94D',
          500: '#F9B233',
          600: '#E0991A',
          700: '#B87810',
          800: '#8F5D0B',
          900: '#664108',
        },
        accent: {
          DEFAULT: '#FF8A00',
          light: '#FFB84D',
          dark: '#CC6E00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
