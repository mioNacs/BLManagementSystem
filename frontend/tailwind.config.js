/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        dark: {
          bg: '#111827',
          card: '#1f2937',
          border: '#374151',
          text: {
            primary: '#f9fafb',
            secondary: '#e5e7eb',
            muted: '#9ca3af',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'neu-light': '10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff',
        'neu-dark': '5px 5px 10px #0c0c0c, -5px -5px 10px #262626',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'loading-progress': 'loadingProgress 2s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        loadingProgress: {
          '0%': { width: '0%', marginLeft: '0%' },
          '50%': { width: '70%', marginLeft: '30%' },
          '100%': { width: '0%', marginLeft: '100%' },
        },
      }
    },
  },
  plugins: [],
};
