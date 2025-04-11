import { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    mode: "",
    extend: {
      fontSize: {
        base: 'var(--font-size-base)',
      },
      fontFamily: {
        sans: ['var(--font-family-base)'],
        mono: ['var(--font-family-mono)'],
      }
    },
  },
  plugins: [],
} satisfies Config;

