/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'comic': ['Comic Neue', 'cursive'],
      },
      colors: {
        'toon-pink': '#FFB6E1',
        'toon-blue': '#A8E6CF',
        'toon-yellow': '#FFD93D',
        'toon-purple': '#C7CEEA',
        'toon-orange': '#FFB347',
        // Love theme colors
        'love-pink': '#ff99c8',
        'love-hot-pink': '#ff4b81',
        'love-red': '#ff6f61',
        'love-soft': '#ffe0f0',
        'love-deep-purple': '#4c1d95',
      },
      animation: {
        'bounce-slow': 'bounce 1s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

