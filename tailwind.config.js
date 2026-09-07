/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: '#C85A32',
          hover: '#B54C26',
          dark: '#933B1B',
          light: '#FAEDE6',
          soft: '#F5DDD3',
        },
        indigo: {
          dye: '#1F3A52',
          deep: '#15293A',
          light: '#E8EFF5',
        },
        mustard: {
          DEFAULT: '#D9822B',
          light: '#FEF5E7',
        },
        artisan: {
          bg: '#FAF7F2',
          card: '#FFFFFF',
          cream: '#F4ECE1',
          sand: '#EFE7DA',
          border: '#E8DEC9',
          text: '#2B2521',
          muted: '#766D64',
          subtle: '#9E9488',
        },
        forest: {
          DEFAULT: '#2E7D32',
          light: '#E8F5E9',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        telugu: ['"Noto Sans Telugu"', 'sans-serif'],
      },
      boxShadow: {
        'mobile': '0 12px 36px -4px rgba(43, 37, 33, 0.12), 0 4px 12px -2px rgba(43, 37, 33, 0.08)',
        'craft': '0 2px 10px rgba(200, 90, 50, 0.12)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-radar': 'radar 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'shimmer': 'shimmer 1.8s ease-in-out infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'scale(0.8)', opacity: '0.9' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}

