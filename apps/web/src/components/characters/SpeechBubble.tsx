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
  story: 'bg-blue-900/30 border-blue-700/50 text-blue-200',
  hint: 'bg-amber-900/30 border-amber-700/50 text-amber-200',
  feedback: 'bg-green-900/30 border-green-700/50 text-green-200',
  teaching: 'bg-purple-900/30 border-purple-700/50 text-purple-200',
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
