/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FBF9F4',
          200: '#F5F0E6',
          300: '#EBE2D3',
        },
        playbook: {
          dark: '#18181B',
          yellow: '#F59E0B',
          coral: '#F43F5E',
          purple: '#8B5CF6',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          green: '#10B981',
          indigo: '#6366F1',
          teal: '#14B8A6',
          orange: '#F97316',
        }
      },
      fontFamily: {
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'play-sm': '0 2px 0 0 rgba(0, 0, 0, 0.08)',
        'play': '0 4px 0 0 #E2E8F0',
        'play-hover': '0 6px 0 0 #CBD5E1',
        'play-active': '0 0 0 0 transparent',
        'play-card': '0 8px 24px -4px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'play-bold': '0 6px 0 0 #0F172A',
        'play-color': '0 4px 0 0 currentColor',
      },
      keyframes: {
        pop: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      },
      animation: {
        pop: 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        wiggle: 'wiggle 0.3s ease-in-out infinite',
        glow: 'pulseGlow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
