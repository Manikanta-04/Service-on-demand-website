/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:        '#09090d',
        surface:   '#111117',
        surface2:  '#17171f',
        surface3:  '#1e1e28',
        border:    'rgba(255,255,255,0.06)',
        'border-hover': 'rgba(255,255,255,0.11)',

        text:  '#e4e4e8',
        muted: '#62627a',
        faint: '#2a2a35',

        // Primary — desaturated slate-indigo (NOT electric)
        accent:         '#4e51ae',
        'accent-hover': '#575bbd',
        'accent-light': '#9496cc',
        'accent-dim':   'rgba(78,81,174,0.10)',
        'accent-border':'rgba(78,81,174,0.22)',

        // Supporting — muted forest teal
        teal:        '#0b9167',
        'teal-light':'#3db896',
        'teal-dim':  'rgba(11,145,103,0.10)',

        // Amber — ratings only
        amber:       '#b87d10',
        'amber-dim': 'rgba(184,125,16,0.10)',

        // Status
        success: '#15803d',
        warning: '#b45309',
        danger:  '#b91c1c',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      fontSize: {
        '2xs': ['11px', '1.4'],
        xs:    ['12px', '1.5'],
        sm:    ['13px', '1.5'],
        base:  ['15px', '1.65'],
        lg:    ['17px', '1.5'],
        xl:    ['20px', '1.4'],
        '2xl': ['24px', '1.3'],
        '3xl': ['30px', '1.25'],
        '4xl': ['38px', '1.15'],
        '5xl': ['50px', '1.08'],
        '6xl': ['64px', '1.05'],
      },

      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.025em',
        tight:    '-0.015em',
        normal:   '0',
        wide:     '0.04em',
        wider:    '0.08em',
        widest:   '0.12em',
      },

      boxShadow: {
        // Elevation via shadow — never colored
        'xs':   '0 1px 2px rgba(0,0,0,0.25)',
        'sm':   '0 1px 4px rgba(0,0,0,0.3)',
        'md':   '0 4px 12px rgba(0,0,0,0.35)',
        'lg':   '0 8px 24px rgba(0,0,0,0.4)',
        'xl':   '0 16px 48px rgba(0,0,0,0.45)',
        // Inner highlight for surfaces
        'inset-t': 'inset 0 1px 0 rgba(255,255,255,0.05)',
        'inset-b': 'inset 0 -1px 0 rgba(0,0,0,0.2)',
      },

      animation: {
        'fade-in':  'fadeIn 0.3s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'pulse-slow':'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
