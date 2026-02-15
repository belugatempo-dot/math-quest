import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterMessage from './CharacterMessage';

describe('CharacterMessage', () => {
  it('should render character avatar and speech bubble', () => {
    render(
      <CharacterMessage characterId="grogg">
        Hello!
      </CharacterMessage>
    );
    expect(screen.getByTestId('character-message')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-grogg')).toBeInTheDocument();
    expect(screen.getByTestId('speech-bubble')).toBeInTheDocument();
  });

  it('should render message text', () => {
    render(
      <CharacterMessage characterId="lizzie">
        Great job!
      </CharacterMessage>
    );
    expect(screen.getByText('Great job!')).toBeInTheDocument();
  });

  it('should pass variant to speech bubble', () => {
    render(
      <CharacterMessage characterId="prof-owlbert" variant="hint">
        Think about it...
      </CharacterMessage>
    );
    const bubble = screen.getByTestId('speech-bubble');
    expect(bubble.className).toContain('bg-amber-500/20');
  });

  it('should pass size to avatar', () => {
    render(
      <CharacterMessage characterId="grogg" size="lg">
        Big message
      </CharacterMessage>
    );
    const avatar = screen.getByTestId('avatar-grogg');
    expect(avatar.getAttribute('width')).toBe('96');
  });

  it('should render with feedback variant', () => {
    render(
      <CharacterMessage characterId="grogg" variant="feedback">
        Correct!
      </CharacterMessage>
    );
    const bubble = screen.getByTestId('speech-bubble');
    expect(bubble.className).toContain('bg-green-500/20');
  });
});
