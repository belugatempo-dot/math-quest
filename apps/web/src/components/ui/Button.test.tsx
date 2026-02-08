import React, { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('should render children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('should apply default variant (primary) classes', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-primary');
  });

  it('should apply default size (md) classes', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('px-4 py-2 text-base');
  });

  describe('variants', () => {
    it.each([
      ['primary', 'bg-primary'],
      ['secondary', 'bg-secondary'],
      ['success', 'bg-success'],
      ['outline', 'border-2 border-primary'],
      ['ghost', 'text-foreground'],
    ] as const)('should apply %s variant classes', (variant, expectedClass) => {
      render(<Button variant={variant}>Test</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain(expectedClass);
    });
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'px-3 py-1.5 text-sm'],
      ['md', 'px-4 py-2 text-base'],
      ['lg', 'px-6 py-3 text-lg'],
    ] as const)('should apply %s size classes', (size, expectedClass) => {
      render(<Button size={size}>Test</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain(expectedClass);
    });
  });

  it('should apply disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should forward ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('should apply custom className', () => {
    render(<Button className="my-custom-class">Test</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('my-custom-class');
  });
});
