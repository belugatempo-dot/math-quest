import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MultiplicationArray from './MultiplicationArray';

describe('MultiplicationArray', () => {
  it('should render array with correct number of dots', () => {
    const { container } = render(<MultiplicationArray rows={3} cols={4} />);
    const dots = container.querySelectorAll('.rounded-full');
    expect(dots.length).toBe(12);
  });

  it('should have accessible aria-label', () => {
    render(<MultiplicationArray rows={3} cols={4} />);
    expect(
      screen.getByRole('img', { name: '3 rows of 4 dots showing 3 times 4 equals 12' })
    ).toBeInTheDocument();
  });

  it('should display equation text', () => {
    render(<MultiplicationArray rows={5} cols={3} />);
    expect(screen.getByText('5 × 3 = 15')).toBeInTheDocument();
  });

  it('should clamp rows to max 12', () => {
    const { container } = render(<MultiplicationArray rows={20} cols={2} />);
    const dots = container.querySelectorAll('.rounded-full');
    expect(dots.length).toBe(24); // 12 * 2
  });

  it('should clamp cols to max 12', () => {
    const { container } = render(<MultiplicationArray rows={2} cols={15} />);
    const dots = container.querySelectorAll('.rounded-full');
    expect(dots.length).toBe(24); // 2 * 12
  });

  it('should highlight specified count of dots', () => {
    const { container } = render(
      <MultiplicationArray rows={2} cols={3} highlightCount={4} />
    );
    const highlightedDots = container.querySelectorAll('.ring-2');
    expect(highlightedDots.length).toBe(4);
  });

  it('should render with testid', () => {
    render(<MultiplicationArray rows={2} cols={2} />);
    expect(screen.getByTestId('multiplication-array')).toBeInTheDocument();
  });
});
