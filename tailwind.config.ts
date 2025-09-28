import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#059669',
          600: '#059669',
          700: '#047857'
        }
      }
    }
  },
  plugins: []
}
export default config
