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
        // World-themed via CSS custom properties with fallback defaults
        primary: 'var(--world-primary, #3B82F6)',
        secondary: 'var(--world-secondary, #F97316)',
        accent: 'var(--world-accent, #22C55E)',
        background: 'var(--world-background, #0F172A)',
        foreground: 'var(--world-text, #E2E8F0)',
        // Dark theme surface colors
        surface: '#1E293B',
        'surface-light': '#334155',
        muted: '#94A3B8',
        // Star colors
        'star-gold': '#FCD34D',
        'star-gray': '#475569',
        // UI colors
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        game: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'game-sm': '0 2px 0 rgba(0,0,0,0.3)',
        'game': '0 4px 0 rgba(0,0,0,0.3)',
        'game-lg': '0 6px 0 rgba(0,0,0,0.4)',
        'game-glow': '0 0 15px rgba(59,130,246,0.5)',
        'game-glow-accent': '0 0 15px rgba(34,197,94,0.5)',
        'game-glow-gold': '0 0 20px rgba(252,211,77,0.6)',
        'neon-primary': '0 0 20px rgba(59,130,246,0.4), 0 0 40px rgba(59,130,246,0.2)',
        'neon-accent': '0 0 20px rgba(34,197,94,0.4), 0 0 40px rgba(34,197,94,0.2)',
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        'pulse-correct': 'pulse-correct 0.6s ease-out',
        'pop-in': 'pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'slide-up': 'slide-up 0.4s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        'confetti-fall': 'confetti-fall 2s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.575)',
        wiggle: 'wiggle 0.3s ease-in-out',
        'float-particle': 'float-particle 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'flame-flicker': 'flame-flicker 0.3s ease-in-out infinite alternate',
        fadeIn: 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        'pulse-correct': {
          '0%': { transform: 'scale(1)', backgroundColor: 'rgb(34 197 94)' },
          '50%': { transform: 'scale(1.05)', backgroundColor: 'rgb(34 197 94 / 0.8)' },
          '100%': { transform: 'scale(1)', backgroundColor: 'transparent' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-100%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(59,130,246,0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(59,130,246,0.7)' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        'float-particle': {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-20px) rotate(360deg)', opacity: '0' },
        },
        'flame-flicker': {
          '0%': { transform: 'scale(1) rotate(-2deg)' },
          '100%': { transform: 'scale(1.1) rotate(2deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
