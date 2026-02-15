import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'game';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg',
      elevated: 'bg-white/15 backdrop-blur-lg border border-white/20 shadow-xl',
      bordered: 'bg-white/10 backdrop-blur-lg border border-white/20',
      game: 'bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 border-b-4 border-b-primary/40 hover:shadow-game-glow',
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
