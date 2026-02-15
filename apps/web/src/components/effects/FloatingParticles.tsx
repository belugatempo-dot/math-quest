'use client';

import { useMemo } from 'react';

const PARTICLE_COUNT = 15;

const SHAPES = ['star', 'circle', 'diamond'] as const;

interface Particle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  shape: typeof SHAPES[number];
  opacity: number;
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: (i / PARTICLE_COUNT) * 100 + Math.random() * (100 / PARTICLE_COUNT),
    size: 6 + (i % 3) * 4,
    delay: (i * 1.2) % 8,
    duration: 6 + (i % 4) * 2,
    shape: SHAPES[i % SHAPES.length],
    opacity: 0.3 + (i % 3) * 0.15,
  }));
}

function ParticleShape({ shape, size }: { shape: string; size: number }) {
  if (shape === 'star') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (shape === 'diamond') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L22 12L12 22L2 12Z" />
      </svg>
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-current"
    />
  );
}

export default function FloatingParticles() {
  const particles = useMemo(generateParticles, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      data-testid="floating-particles"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float-particle text-primary/40"
          style={{
            left: `${p.x}%`,
            bottom: '-20px',
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          <ParticleShape shape={p.shape} size={p.size} />
        </div>
      ))}
    </div>
  );
}
