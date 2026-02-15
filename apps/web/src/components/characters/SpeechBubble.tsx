'use client';

import type { ReactNode } from 'react';

export type BubblePosition = 'left' | 'right';
export type BubbleVariant = 'story' | 'hint' | 'feedback' | 'teaching';

interface SpeechBubbleProps {
  children: ReactNode;
  position?: BubblePosition;
  variant?: BubbleVariant;
}

const VARIANT_STYLES: Record<BubbleVariant, string> = {
  story: 'bg-blue-500/20 border-blue-400/30 text-blue-100',
  hint: 'bg-amber-500/20 border-amber-400/30 text-amber-100',
  feedback: 'bg-green-500/20 border-green-400/30 text-green-100',
  teaching: 'bg-purple-500/20 border-purple-400/30 text-purple-100',
};

export default function SpeechBubble({
  children,
  position = 'left',
  variant = 'story',
}: SpeechBubbleProps) {
  const variantClass = VARIANT_STYLES[variant];

  return (
    <div
      className={`relative rounded-xl border px-4 py-3 ${variantClass}`}
      data-testid="speech-bubble"
    >
      {children}
      {/* Triangle pointer */}
      <div
        className={`absolute top-4 w-3 h-3 border-b border-l rotate-45 ${
          position === 'left' ? '-left-1.5' : '-right-1.5 border-b-0 border-l-0 border-t border-r'
        } ${variantClass.split(' ').slice(0, 2).join(' ')}`}
        aria-hidden="true"
      />
    </div>
  );
}
