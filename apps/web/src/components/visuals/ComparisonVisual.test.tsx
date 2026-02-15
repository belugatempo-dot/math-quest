import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ComparisonVisual from './ComparisonVisual';

describe('ComparisonVisual', () => {
  it('should render with testid', () => {
    render(<ComparisonVisual leftValue={10} rightValue={20} />);
    expect(screen.getByTestId('comparison-visual')).toBeInTheDocument();
  });

  it('should display values as labels by default', () => {
    render(<ComparisonVisual leftValue={10} rightValue={20} />);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('should display custom labels when provided', () => {
    render(
      <ComparisonVisual leftValue={10} rightValue={20} leftLabel="3×4" rightLabel="4×5" />
    );
    expect(screen.getByText('3×4')).toBeInTheDocument();
    expect(screen.getByText('4×5')).toBeInTheDocument();
  });

  it('should have accessible aria-label', () => {
    render(<ComparisonVisual leftValue={10} rightValue={20} />);
    expect(
      screen.getByRole('img', { name: 'Comparing 10 and 20' })
    ).toBeInTheDocument();
  });

  it('should use custom labels in aria-label', () => {
    render(
      <ComparisonVisual leftValue={10} rightValue={20} leftLabel="A" rightLabel="B" />
    );
    expect(
      screen.getByRole('img', { name: 'Comparing A and B' })
    ).toBeInTheDocument();
  });

  it('should render two progress bars', () => {
    const { container } = render(
      <ComparisonVisual leftValue={30} rightValue={60} />
    );
    const bars = container.querySelectorAll('.rounded-full.transition-all');
    expect(bars.length).toBe(2);
  });
});
