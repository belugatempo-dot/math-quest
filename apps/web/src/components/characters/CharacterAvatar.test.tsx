import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterAvatar from './CharacterAvatar';
import type { CharacterId, Expression } from './CharacterAvatar';

describe('CharacterAvatar', () => {
  const characters: CharacterId[] = ['grogg', 'lizzie', 'prof-owlbert', 'sir-calculate', 'captain-claw'];
  const expressions: Expression[] = ['neutral', 'happy', 'thinking', 'surprised', 'encouraging'];

  it.each(characters)('should render %s character', (characterId) => {
    render(<CharacterAvatar characterId={characterId} />);
    expect(screen.getByTestId(`avatar-${characterId}`)).toBeInTheDocument();
  });

  it.each(characters)('should render %s with accessible label', (characterId) => {
    render(<CharacterAvatar characterId={characterId} />);
    expect(screen.getByTestId(`avatar-${characterId}`)).toHaveAttribute('role', 'img');
    expect(screen.getByTestId(`avatar-${characterId}`)).toHaveAttribute('aria-label');
  });

  it.each(expressions)('should render grogg with %s expression', (expression) => {
    render(<CharacterAvatar characterId="grogg" expression={expression} />);
    expect(screen.getByTestId('avatar-grogg')).toBeInTheDocument();
  });

  describe('size variants', () => {
    it('should render with sm size (40px)', () => {
      render(<CharacterAvatar characterId="grogg" size="sm" />);
      const svg = screen.getByTestId('avatar-grogg');
      expect(svg.getAttribute('width')).toBe('40');
      expect(svg.getAttribute('height')).toBe('40');
    });

    it('should render with md size (64px)', () => {
      render(<CharacterAvatar characterId="grogg" size="md" />);
      const svg = screen.getByTestId('avatar-grogg');
      expect(svg.getAttribute('width')).toBe('64');
    });

    it('should render with lg size (96px)', () => {
      render(<CharacterAvatar characterId="grogg" size="lg" />);
      const svg = screen.getByTestId('avatar-grogg');
      expect(svg.getAttribute('width')).toBe('96');
    });

    it('should default to md size', () => {
      render(<CharacterAvatar characterId="grogg" />);
      const svg = screen.getByTestId('avatar-grogg');
      expect(svg.getAttribute('width')).toBe('64');
    });
  });

  it('should return null for unknown character id', () => {
    const { container } = render(
      <CharacterAvatar characterId={'unknown' as CharacterId} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('should have proper aria labels', () => {
    render(<CharacterAvatar characterId="prof-owlbert" />);
    expect(screen.getByRole('img', { name: 'Prof. Owlbert' })).toBeInTheDocument();
  });
});
