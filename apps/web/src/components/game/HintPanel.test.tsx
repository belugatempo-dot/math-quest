import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HintPanel from './HintPanel';
import type { Hint } from '@mathquest/shared';

const mockHints: Hint[] = [
  { tier: 1, cost: 0, text: 'Think about what multiplication means conceptually', type: 'conceptual' },
  { tier: 2, cost: 1, text: 'Try breaking the problem into smaller groups', type: 'directional' },
  { tier: 3, cost: 2, text: 'Five groups of three means 3+3+3+3+3 which is fifteen', type: 'scaffolded' },
];

describe('HintPanel', () => {
  describe('challenge mode', () => {
    it('should show challenge message', () => {
      render(<HintPanel hints={mockHints} isChallenge />);
      expect(screen.getByText('Challenge Level')).toBeInTheDocument();
      expect(screen.getByText('No hints available - you can do this!')).toBeInTheDocument();
    });

    it('should not render hint buttons in challenge mode', () => {
      render(<HintPanel hints={mockHints} isChallenge />);
      expect(screen.queryByText('Get Hint')).not.toBeInTheDocument();
    });
  });

  describe('empty hints', () => {
    it('should show challenge-like message when no hints', () => {
      render(<HintPanel hints={[]} />);
      expect(screen.getByText('Challenge Level')).toBeInTheDocument();
    });
  });

  describe('normal mode', () => {
    it('should render all hint tiers', () => {
      render(<HintPanel hints={mockHints} />);
      expect(screen.getByText('Hint 1')).toBeInTheDocument();
      expect(screen.getByText('Hint 2')).toBeInTheDocument();
      expect(screen.getByText('Hint 3')).toBeInTheDocument();
    });

    it('should show hints as hidden initially', () => {
      render(<HintPanel hints={mockHints} />);
      expect(screen.getByText('Click "Get Hint" to reveal')).toBeInTheDocument();
      expect(screen.getAllByText('Reveal previous hints first')).toHaveLength(2);
    });

    it('should show Get Hint button with Free label for tier 1', () => {
      render(<HintPanel hints={mockHints} />);
      expect(screen.getByRole('button', { name: /Get Hint \(Free\)/ })).toBeInTheDocument();
    });

    it('should reveal hint 1 when Get Hint is clicked', () => {
      render(<HintPanel hints={mockHints} />);
      fireEvent.click(screen.getByRole('button', { name: /Get Hint/ }));
      expect(
        screen.getByText('Think about what multiplication means conceptually')
      ).toBeInTheDocument();
    });

    it('should show -1 star label for tier 2 after revealing tier 1', () => {
      render(<HintPanel hints={mockHints} />);
      // Reveal tier 1
      fireEvent.click(screen.getByRole('button', { name: /Get Hint/ }));
      // Now button should show tier 2 cost
      expect(screen.getByRole('button', { name: /Get Hint \(-1 star\)/ })).toBeInTheDocument();
    });

    it('should show -2 stars label for tier 3 after revealing tier 2', () => {
      render(<HintPanel hints={mockHints} />);
      // Reveal tier 1
      fireEvent.click(screen.getByRole('button', { name: /Get Hint/ }));
      // Reveal tier 2
      fireEvent.click(screen.getByRole('button', { name: /Get Hint/ }));
      expect(
        screen.getByRole('button', { name: /Get Hint \(-2 stars\)/ })
      ).toBeInTheDocument();
    });

    it('should hide Get Hint button when all hints are revealed', () => {
      render(<HintPanel hints={mockHints} />);
      fireEvent.click(screen.getByRole('button', { name: /Get Hint/ }));
      fireEvent.click(screen.getByRole('button', { name: /Get Hint/ }));
      fireEvent.click(screen.getByRole('button', { name: /Get Hint/ }));
      expect(screen.queryByRole('button', { name: /Get Hint/ })).not.toBeInTheDocument();
    });

    it('should call onRevealHint with correct tier', () => {
      const onRevealHint = vi.fn();
      render(<HintPanel hints={mockHints} onRevealHint={onRevealHint} />);
      fireEvent.click(screen.getByRole('button', { name: /Get Hint/ }));
      expect(onRevealHint).toHaveBeenCalledWith(1);
      fireEvent.click(screen.getByRole('button', { name: /Get Hint/ }));
      expect(onRevealHint).toHaveBeenCalledWith(2);
      fireEvent.click(screen.getByRole('button', { name: /Get Hint/ }));
      expect(onRevealHint).toHaveBeenCalledWith(3);
    });

    it('should display cost labels in hint cards', () => {
      render(<HintPanel hints={mockHints} />);
      expect(screen.getByText('Free')).toBeInTheDocument();
      expect(screen.getByText('-1 star')).toBeInTheDocument();
      expect(screen.getByText('-2 stars')).toBeInTheDocument();
    });
  });
});
