'use client';

import { useEffect, useState } from 'react';

const COLORS = ['#FCD34D', '#3B82F6', '#22C55E', '#F97316', '#EF4444', '#A855F7', '#EC4899', '#14B8A6'];
const PARTICLE_COUNT = 40;

type ParticleShape = 'rect' | 'circle' | 'star';

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
  rotation: number;
  shape: ParticleShape;
}

function getShape(index: number): ParticleShape {
  const shapes: ParticleShape[] = ['rect', 'circle', 'star'];
  return shapes[index % shapes.length];
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[i % COLORS.length],
    delay: Math.random() * 0.8,
    size: 4 + Math.random() * 8,
    rotation: Math.random() * 360,
    shape: getShape(i),
  }));
}

function getClipPath(shape: ParticleShape): string | undefined {
  if (shape === 'star') {
    return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
  }
  return undefined;
}

export default function Confetti() {
  const [particles] = useState(generateParticles);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
      data-testid="confetti"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            top: '-5%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'rect' ? '2px' : '0',
            clipPath: getClipPath(p.shape),
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
