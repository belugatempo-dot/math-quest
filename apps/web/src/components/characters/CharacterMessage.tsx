'use client';

import type { ReactNode } from 'react';
import CharacterAvatar from './CharacterAvatar';
import SpeechBubble from './SpeechBubble';
import type { CharacterId, Expression, AvatarSize } from './CharacterAvatar';
import type { BubbleVariant } from './SpeechBubble';

interface CharacterMessageProps {
  characterId: CharacterId;
  expression?: Expression;
  size?: AvatarSize;
  variant?: BubbleVariant;
  children: ReactNode;
}

export default function CharacterMessage({
  characterId,
  expression = 'neutral',
  size = 'md',
  variant = 'story',
  children,
}: CharacterMessageProps) {
  return (
    <div className="flex items-start gap-3" data-testid="character-message">
      <div className="flex-shrink-0">
        <CharacterAvatar characterId={characterId} expression={expression} size={size} />
      </div>
      <SpeechBubble position="left" variant={variant}>
        {children}
      </SpeechBubble>
    </div>
  );
}
