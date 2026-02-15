import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StreakIndicator from './StreakIndicator';

describe('StreakIndicator', () => {
  it('should not render when streak is 0', () => {
    const { container } = render(<StreakIndicator streak={0} />);
    expect(container.innerHTML).toBe('');
  });

  it('should not render when streak is 1', () => {
    const { container } = render(<StreakIndicator streak={1} />);
    expect(container.innerHTML).toBe('');
  });

  it('should render when streak is 2', () => {
    render(<StreakIndicator streak={2} />);
    expect(screen.getByTestId('streak-indicator')).toBeInTheDocument();
    expect(screen.getByText('2 in a row!')).toBeInTheDocument();
  });

  it('should render when streak is 5', () => {
    render(<StreakIndicator streak={5} />);
    expect(screen.getByText('5 in a row!')).toBeInTheDocument();
  });

  it('should have accessible role and label', () => {
    render(<StreakIndicator streak={3} />);
    const indicator = screen.getByRole('status');
    expect(indicator).toHaveAttribute('aria-label', '3 correct answers in a row');
  });

  it('should have fire emoji hidden from screen readers', () => {
    const { container } = render(<StreakIndicator streak={3} />);
    const emoji = container.querySelector('[aria-hidden="true"]');
    expect(emoji).toBeInTheDocument();
    expect(emoji?.textContent).toBe('🔥');
  });

  it('should apply animate-pop-in class', () => {
    render(<StreakIndicator streak={2} />);
    expect(screen.getByTestId('streak-indicator').className).toContain('animate-pop-in');
  });
});
