/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stitch Cognitive OS design system tokens
        stitch: {
          bg: '#101415',
          surface: '#101415',
          'surface-dim': '#101415',
          'surface-bright': '#363a3b',
          'surface-lowest': '#0b0f10',
          'surface-low': '#191c1e',
          'surface-container': '#1d2022',
          'surface-high': '#272a2c',
          'surface-highest': '#323537',
          'surface-raised': '#1E293B',
          border: '#1E293B',
          'border-subtle': '#2B3545',
          'border-variant': '#434655',
          primary: '#b4c5ff',
          'primary-container': '#2563eb',
          'on-primary': '#002a78',
          'on-primary-container': '#eeefff',
          secondary: '#b9c7df',
          'secondary-container': '#3c4a5e',
          'on-surface': '#e0e3e5',
          'on-variant': '#c3c6d7',
          outline: '#8d90a0',
          'outline-variant': '#434655',
          green: '#22C55E',
          yellow: '#FACC15',
          red: '#EF4444',
        },
        terracotta: {
          DEFAULT: '#C85A32',
          hover: '#B54C26',
          dark: '#933B1B',
          light: '#2D1B16',
          soft: '#3D241C',
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
          bg: '#101415',
          card: '#191c1e',
          container: '#1d2022',
          cream: '#272a2c',
          sand: '#1E293B',
          border: '#1E293B',
          text: '#e0e3e5',
          muted: '#8d90a0',
          subtle: '#c3c6d7',
        },
        forest: {
          DEFAULT: '#22C55E',
          light: '#143820',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        telugu: ['"Noto Sans Telugu"', 'sans-serif'],
      },
      boxShadow: {
        'mobile': '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)',
        'craft': '0 0 20px -2px rgba(37, 99, 235, 0.35)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'hud': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-blue': '0 0 16px rgba(37, 99, 235, 0.4)',
        'glow-primary': '0 0 20px rgba(180, 197, 255, 0.35)',
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

