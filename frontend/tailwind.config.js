/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: {
          50:  '#FDFCF8',
          100: '#F9F6EE',
          200: '#F2ECDF',
          300: '#E8DFD0',
          400: '#D9CDB8',
          500: '#C4B49A',
          600: '#A8967A',
          700: '#87745A',
          800: '#5E5040',
          900: '#3C3228',
        },
        ink: {
          50:  '#F5F3EF',
          100: '#E8E4DC',
          200: '#CBC3B5',
          300: '#A89E8F',
          400: '#85796A',
          500: '#635849',
          600: '#47392C',
          700: '#2E2317',
          800: '#1C160D',
          900: '#100D07',
        },
        amber: {
          50:  '#FFFBF0',
          100: '#FEF3CC',
          200: '#FCE38A',
          300: '#F9CE47',
          400: '#F5B920',
          500: '#D9980D',
          600: '#B07A08',
          700: '#8A5E05',
          800: '#654504',
          900: '#4A3203',
        },
        jade: {
          50:  '#F0FAF5',
          100: '#D6F2E4',
          200: '#A9E3C6',
          500: '#22864F',
          600: '#1A6B3F',
          700: '#145232',
        },
      },
      fontFamily: {
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono:  ['"DM Mono"', 'monospace'],
      },
      boxShadow: {
        'xs':    '0 1px 2px rgba(28,22,13,0.04)',
        'sm':    '0 2px 4px rgba(28,22,13,0.06), 0 1px 2px rgba(28,22,13,0.04)',
        'md':    '0 4px 12px rgba(28,22,13,0.08), 0 2px 4px rgba(28,22,13,0.04)',
        'lg':    '0 12px 32px rgba(28,22,13,0.10), 0 4px 8px rgba(28,22,13,0.05)',
        'xl':    '0 24px 48px rgba(28,22,13,0.12), 0 8px 16px rgba(28,22,13,0.06)',
        'inner-sm': 'inset 0 1px 3px rgba(28,22,13,0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'pulse-soft': 'pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite',
        'wave': 'wave 1.4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.35s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%':      { transform: 'scaleY(1)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(12px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
