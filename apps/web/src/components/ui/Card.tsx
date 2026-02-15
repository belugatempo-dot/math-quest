import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'game';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-slate-800/90 border border-slate-700/50 shadow-md',
      elevated: 'bg-slate-800/90 border border-slate-700/50 shadow-lg',
      bordered: 'bg-slate-800/90 border border-slate-700/50',
      game: 'game-card shadow-lg border-b-4 border-primary/30 hover:shadow-game-glow',
    };

    return (
      <div
        ref={ref}
        className={`rounded-xl p-6 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
