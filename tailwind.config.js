/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FDF8F3",
          dark: "#E8DDD4",
        },
        beige: "#E8D5C4",
        brown: {
          50: "#FAF6F2",
          100: "#F0E5D8",
          200: "#E0C9B4",
          300: "#CBA98A",
          400: "#B58964",
          500: "#A07046",
          600: "#8B5E3C",
          700: "#744D33",
          800: "#5C3D2A",
          900: "#3D2818",
        },
        gold: {
          DEFAULT: "#D4A853",
          light: "#E8C97A",
        },
        dark: {
          DEFAULT: "#0A0A0A",
          card: "#141414",
          border: "#2A2A2A",
          muted: "#8A8A8A",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
