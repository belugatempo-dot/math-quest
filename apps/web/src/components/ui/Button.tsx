'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'ghost' | 'game' | 'game-success';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-primary text-white hover:opacity-90 active:opacity-80 rounded-lg',
      secondary: 'bg-secondary text-white hover:opacity-90 active:opacity-80 rounded-lg',
      success: 'bg-success text-white hover:bg-green-600 active:bg-green-700 rounded-lg',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg',
      ghost: 'text-foreground hover:bg-white/15 rounded-lg',
      game: 'game-button bg-gradient-to-b from-indigo-500 to-indigo-700 text-white rounded-2xl shadow-game hover:scale-105 hover:shadow-game-lg active:translate-y-0.5 active:shadow-game-sm font-bold',
      'game-success': 'game-button bg-gradient-to-b from-green-500 to-green-700 text-white rounded-2xl shadow-game hover:scale-105 hover:shadow-game-lg active:translate-y-0.5 active:shadow-game-sm font-bold',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
