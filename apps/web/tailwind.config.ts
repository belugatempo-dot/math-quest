import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // World 3: Multiplication Mountains theme
        primary: '#3B82F6',
        secondary: '#F97316',
        accent: '#22C55E',
        background: '#F8FAFC',
        foreground: '#1E293B',
        // Star colors
        'star-gold': '#FCD34D',
        'star-gray': '#D1D5DB',
        // UI colors
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
