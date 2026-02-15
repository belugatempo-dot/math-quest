import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AdaptiveReteachModal from './AdaptiveReteachModal';

vi.mock('@/components/characters/CharacterMessage', () => ({
  default: ({ children, characterId, expression }: {
    children: React.ReactNode;
    characterId: string;
    expression: string;
  }) => (
    <div
      data-testid="character-message"
      data-character={characterId}
      data-expression={expression}
    >
      {children}
    </div>
  ),
}));

describe('AdaptiveReteachModal', () => {
  const defaultProps = {
    onAccept: vi.fn(),
    onDecline: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the modal', () => {
    render(<AdaptiveReteachModal {...defaultProps} />);
    expect(screen.getByTestId('adaptive-reteach-modal')).toBeInTheDocument();
  });

  it('should display character message from prof-owlbert', () => {
    render(<AdaptiveReteachModal {...defaultProps} />);
    const message = screen.getByTestId('character-message');
    expect(message).toHaveAttribute('data-character', 'prof-owlbert');
    expect(message).toHaveAttribute('data-expression', 'encouraging');
  });

  it('should display encouragement text', () => {
    render(<AdaptiveReteachModal {...defaultProps} />);
    expect(screen.getByText(/review the lesson/i)).toBeInTheDocument();
  });

  it('should show accept button', () => {
    render(<AdaptiveReteachModal {...defaultProps} />);
    expect(screen.getByRole('button', { name: /yes, review lesson/i })).toBeInTheDocument();
  });

  it('should show decline button', () => {
    render(<AdaptiveReteachModal {...defaultProps} />);
    expect(screen.getByRole('button', { name: /no, keep trying/i })).toBeInTheDocument();
  });

  it('should call onAccept when accept button is clicked', () => {
    render(<AdaptiveReteachModal {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /yes, review lesson/i }));
    expect(defaultProps.onAccept).toHaveBeenCalledOnce();
  });

  it('should call onDecline when decline button is clicked', () => {
    render(<AdaptiveReteachModal {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /no, keep trying/i }));
    expect(defaultProps.onDecline).toHaveBeenCalledOnce();
  });

  it('should have a backdrop overlay', () => {
    render(<AdaptiveReteachModal {...defaultProps} />);
    expect(screen.getByTestId('modal-backdrop')).toBeInTheDocument();
  });
});
