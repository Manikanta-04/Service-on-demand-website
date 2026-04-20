/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep warm-neutral dark background
        bg: '#0d0e12',
        surface: '#13151c',
        surface2: '#1a1d27',
        surface3: '#20242f',
        // Borders – very subtle
        border: 'rgba(255,255,255,0.06)',
        'border-hover': 'rgba(255,255,255,0.12)',
        // Text
        text: '#e8e6f0',
        muted: '#7a7a96',
        faint: '#3e3e56',
        // Primary accent — warm indigo/slate (not neon)
        accent: '#6366f1',      // indigo-500
        'accent-light': '#818cf8', // indigo-400
        'accent-dim': 'rgba(99,102,241,0.12)',
        // Secondary — muted teal
        teal: '#2dd4bf',
        'teal-dim': 'rgba(45,212,191,0.10)',
        // Warm amber for ratings/prices
        amber: '#f59e0b',
        'amber-dim': 'rgba(245,158,11,0.10)',
        // Status colors
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        // Glow
        glow: 'rgba(99,102,241,0.15)',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
        'accent-glow': '0 0 20px rgba(99,102,241,0.25)',
        'inset-top': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
