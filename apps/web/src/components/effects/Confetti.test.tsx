import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Confetti from './Confetti';

describe('Confetti', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render confetti container', () => {
    render(<Confetti />);
    expect(screen.getByTestId('confetti')).toBeInTheDocument();
  });

  it('should render particles', () => {
    const { container } = render(<Confetti />);
    const confetti = container.querySelector('[data-testid="confetti"]');
    const particles = confetti?.children;
    expect(particles?.length).toBe(40);
  });

  it('should be aria-hidden', () => {
    render(<Confetti />);
    expect(screen.getByTestId('confetti')).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have pointer-events-none', () => {
    render(<Confetti />);
    expect(screen.getByTestId('confetti').className).toContain('pointer-events-none');
  });

  it('should disappear after timeout', () => {
    vi.useFakeTimers();
    render(<Confetti />);
    expect(screen.getByTestId('confetti')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(screen.queryByTestId('confetti')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('should apply animate-confetti-fall class to particles', () => {
    const { container } = render(<Confetti />);
    const particle = container.querySelector('[data-testid="confetti"] > div');
    expect(particle?.className).toContain('animate-confetti-fall');
  });
});
