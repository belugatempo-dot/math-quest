'use client';

interface StarDisplayProps {
  stars: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showEmpty?: boolean;
}

export default function StarDisplay({
  stars,
  maxStars = 3,
  size = 'md',
  showEmpty = true,
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
          className={i < stars ? 'text-star-gold' : 'text-star-gray'}
          aria-hidden="true"
        >
          {i < stars ? '★' : showEmpty ? '☆' : ''}
        </span>
      ))}
    </div>
  );
}
