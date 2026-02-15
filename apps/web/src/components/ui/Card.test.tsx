import React, { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('should render children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('should apply default variant (default) classes', () => {
    render(<Card>Test</Card>);
    const card = screen.getByText('Test').closest('div')!;
    expect(card.className).toContain('bg-white/10');
    expect(card.className).toContain('shadow-lg');
  });

  describe('variants', () => {
    it.each([
      ['default', 'bg-white/10'],
      ['elevated', 'bg-white/15'],
      ['bordered', 'bg-white/10'],
    ] as const)('should apply %s variant classes', (variant, expectedClass) => {
      render(<Card variant={variant}>Test</Card>);
      const card = screen.getByText('Test').closest('div')!;
      expect(card.className).toContain(expectedClass);
    });
  });

  it('should apply custom className', () => {
    render(<Card className="my-class">Test</Card>);
    const card = screen.getByText('Test').closest('div')!;
    expect(card.className).toContain('my-class');
  });

  it('should forward ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref Test</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should apply base classes', () => {
    render(<Card>Test</Card>);
    const card = screen.getByText('Test').closest('div')!;
    expect(card.className).toContain('rounded-xl');
    expect(card.className).toContain('p-6');
  });
});
