/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moss: {
          DEFAULT: '#2E4036',
          50: '#E8ECE9',
          100: '#D1D9D3',
          200: '#A3B3A7',
          300: '#758D7B',
          400: '#52664F',
          500: '#2E4036',
          600: '#25332B',
          700: '#1C2621',
          800: '#131A16',
          900: '#0A0D0B',
        },
        clay: {
          DEFAULT: '#CC5833',
          50: '#F9E8E3',
          100: '#F3D1C7',
          200: '#E7A38F',
          300: '#DB7557',
          400: '#CC5833',
          500: '#A34629',
          600: '#7A351F',
          700: '#522315',
          800: '#29120A',
          900: '#140905',
        },
        cream: {
          DEFAULT: '#F2F0E9',
          50: '#FDFCFB',
          100: '#FAF9F6',
          200: '#F5F3ED',
          300: '#F2F0E9',
          400: '#E5E1D4',
          500: '#D8D2BF',
        },
        charcoal: '#1A1A1A',
        success: '#4CAF50',
        error: '#FF4444',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        'card': '2rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'hue-shift': 'hueShift 3s ease-in-out infinite',
      },
      keyframes: {
        hueShift: {
          '0%, 100%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(30deg)' },
        },
      },
    },
  },
  plugins: [],
}
