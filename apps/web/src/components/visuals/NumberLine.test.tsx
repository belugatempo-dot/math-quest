import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NumberLine from './NumberLine';

describe('NumberLine', () => {
  it('should render number line with testid', () => {
    render(<NumberLine min={0} max={10} />);
    expect(screen.getByTestId('number-line')).toBeInTheDocument();
  });

  it('should have accessible aria-label', () => {
    render(<NumberLine min={0} max={10} />);
    expect(
      screen.getByRole('img', { name: 'Number line from 0 to 10' })
    ).toBeInTheDocument();
  });

  it('should show min and max values', () => {
    render(<NumberLine min={0} max={20} />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('should show marks', () => {
    render(<NumberLine min={0} max={10} marks={[5]} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should return null when range is zero', () => {
    const { container } = render(<NumberLine min={5} max={5} />);
    expect(container.innerHTML).toBe('');
  });

  it('should return null when range is negative', () => {
    const { container } = render(<NumberLine min={10} max={5} />);
    expect(container.innerHTML).toBe('');
  });

  it('should render highlight circle for highlighted value', () => {
    const { container } = render(
      <NumberLine min={0} max={10} marks={[5]} highlight={5} />
    );
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(1);
  });
});
