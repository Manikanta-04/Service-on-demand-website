/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: '#111118',
        surface2: '#16161f',
        border: 'rgba(255,255,255,0.07)',
        'border-hover': 'rgba(255,255,255,0.15)',
        text: '#f0eefc',
        muted: '#8888aa',
        faint: '#44445a',
        accent: '#7c6ef4',
        accent2: '#34d49e',
        accent3: '#f4856e',
        accent4: '#f4c76e',
        accent5: '#6eb8f4',
        glow: 'rgba(124,110,244,0.18)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Instrument Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      animation: {
        'count-up': 'count-up 2s ease-out forwards',
      },
      keyframes: {
        'count-up': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
