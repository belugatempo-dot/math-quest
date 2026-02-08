import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StarDisplay from './StarDisplay';

describe('StarDisplay', () => {
  it('should render filled stars for given star count', () => {
    render(<StarDisplay stars={2} />);
    const container = screen.getByRole('img');
    const stars = container.querySelectorAll('span');
    // Default maxStars is 3
    expect(stars).toHaveLength(3);
    expect(stars[0].textContent).toBe('★');
    expect(stars[1].textContent).toBe('★');
    expect(stars[2].textContent).toBe('☆');
  });

  it('should render correct aria-label', () => {
    render(<StarDisplay stars={2} maxStars={3} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', '2 out of 3 stars');
  });

  it('should render aria-label with custom maxStars', () => {
    render(<StarDisplay stars={4} maxStars={5} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', '4 out of 5 stars');
  });

  it('should render all empty stars when stars is 0', () => {
    render(<StarDisplay stars={0} />);
    const container = screen.getByRole('img');
    const stars = container.querySelectorAll('span');
    stars.forEach((star) => {
      expect(star.textContent).toBe('☆');
    });
  });

  it('should render all filled stars when stars equals maxStars', () => {
    render(<StarDisplay stars={3} maxStars={3} />);
    const container = screen.getByRole('img');
    const stars = container.querySelectorAll('span');
    stars.forEach((star) => {
      expect(star.textContent).toBe('★');
    });
  });

  it('should hide empty stars when showEmpty is false', () => {
    render(<StarDisplay stars={1} maxStars={3} showEmpty={false} />);
    const container = screen.getByRole('img');
    const stars = container.querySelectorAll('span');
    expect(stars[0].textContent).toBe('★');
    expect(stars[1].textContent).toBe('');
    expect(stars[2].textContent).toBe('');
  });

  describe('size variants', () => {
    it.each([
      ['sm', 'text-lg'],
      ['md', 'text-2xl'],
      ['lg', 'text-4xl'],
    ] as const)('should apply %s size class', (size, expectedClass) => {
      render(<StarDisplay stars={1} size={size} />);
      const container = screen.getByRole('img');
      expect(container.className).toContain(expectedClass);
    });
  });

  it('should mark star spans as aria-hidden', () => {
    render(<StarDisplay stars={1} />);
    const container = screen.getByRole('img');
    const stars = container.querySelectorAll('span');
    stars.forEach((star) => {
      expect(star.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('should apply filled star color class', () => {
    render(<StarDisplay stars={1} />);
    const container = screen.getByRole('img');
    const stars = container.querySelectorAll('span');
    expect(stars[0].className).toContain('text-star-gold');
  });

  it('should apply empty star color class', () => {
    render(<StarDisplay stars={0} />);
    const container = screen.getByRole('img');
    const stars = container.querySelectorAll('span');
    expect(stars[0].className).toContain('text-star-gray');
  });
});
