'use client';

interface StarDisplayProps {
  stars: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showEmpty?: boolean;
  animated?: boolean;
}

export default function StarDisplay({
  stars,
  maxStars = 3,
  size = 'md',
  showEmpty = true,
  animated = false,
}: StarDisplayProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className={`flex gap-0.5 ${sizes[size]}`} role="img" aria-label={`${stars} out of ${maxStars} stars`}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <span
          key={i}
          className={`${i < stars ? 'text-star-gold drop-shadow-[0_0_4px_rgba(252,211,77,0.6)]' : 'text-star-gray'} ${
            animated && i < stars ? 'animate-pop-in' : ''
          } transition-all`}
          style={animated && i < stars ? { animationDelay: `${i * 0.2}s`, animationFillMode: 'both' } : undefined}
          aria-hidden="true"
        >
          {i < stars ? '★' : showEmpty ? '☆' : ''}
        </span>
      ))}
    </div>
  );
}
