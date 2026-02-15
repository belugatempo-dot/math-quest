import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TriangleVisual from './TriangleVisual';
import type { TriangleDef } from './TriangleVisual';

describe('TriangleVisual', () => {
  it('should render with data-testid', () => {
    const triangles: TriangleDef[] = [{ sides: [5, 5, 5] }];
    render(<TriangleVisual triangles={triangles} />);
    expect(screen.getByTestId('triangle-visual')).toBeInTheDocument();
  });

  it('should have accessible aria-label for single triangle', () => {
    const triangles: TriangleDef[] = [{ sides: [3, 4, 5] }];
    render(<TriangleVisual triangles={triangles} />);
    const el = screen.getByTestId('triangle-visual');
    expect(el).toHaveAttribute('role', 'img');
    expect(el).toHaveAttribute('aria-label', 'Triangle with sides 3, 4, 5');
  });

  it('should have accessible aria-label for multiple labeled triangles', () => {
    const triangles: TriangleDef[] = [
      { label: 'A', sides: [5, 5, 5] },
      { label: 'B', sides: [5, 5, 3] },
    ];
    render(<TriangleVisual triangles={triangles} />);
    const el = screen.getByTestId('triangle-visual');
    expect(el).toHaveAttribute(
      'aria-label',
      'Triangle A with sides 5, 5, 5. Triangle B with sides 5, 5, 3'
    );
  });

  it('should render correct number of SVG polygon elements', () => {
    const triangles: TriangleDef[] = [
      { label: 'A', sides: [5, 5, 5] },
      { label: 'B', sides: [3, 4, 5] },
      { label: 'C', sides: [5, 5, 3] },
    ];
    const { container } = render(<TriangleVisual triangles={triangles} />);
    const polygons = container.querySelectorAll('polygon');
    expect(polygons).toHaveLength(3);
  });

  it('should display side length labels', () => {
    const triangles: TriangleDef[] = [{ sides: [3, 4, 5] }];
    render(<TriangleVisual triangles={triangles} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should display letter labels when provided', () => {
    const triangles: TriangleDef[] = [
      { label: 'A', sides: [5, 5, 5] },
      { label: 'B', sides: [5, 5, 3] },
    ];
    render(<TriangleVisual triangles={triangles} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('should not display letter labels when not provided', () => {
    const triangles: TriangleDef[] = [{ sides: [3, 4, 5] }];
    render(<TriangleVisual triangles={triangles} />);
    expect(screen.queryByText('A')).not.toBeInTheDocument();
  });

  it('should handle equilateral triangle', () => {
    const triangles: TriangleDef[] = [{ sides: [6, 6, 6] }];
    const { container } = render(<TriangleVisual triangles={triangles} />);
    expect(container.querySelectorAll('polygon')).toHaveLength(1);
  });

  it('should handle isosceles triangle', () => {
    const triangles: TriangleDef[] = [{ sides: [5, 5, 3] }];
    const { container } = render(<TriangleVisual triangles={triangles} />);
    expect(container.querySelectorAll('polygon')).toHaveLength(1);
  });

  it('should handle scalene triangle', () => {
    const triangles: TriangleDef[] = [{ sides: [3, 4, 5] }];
    const { container } = render(<TriangleVisual triangles={triangles} />);
    expect(container.querySelectorAll('polygon')).toHaveLength(1);
  });

  it('should return null for invalid triangle (inequality violation)', () => {
    const triangles: TriangleDef[] = [{ sides: [1, 2, 10] }];
    const { container } = render(<TriangleVisual triangles={triangles} />);
    expect(container.innerHTML).toBe('');
  });

  it('should skip invalid triangles but render valid ones', () => {
    const triangles: TriangleDef[] = [
      { label: 'A', sides: [1, 2, 10] },  // invalid
      { label: 'B', sides: [3, 4, 5] },   // valid
    ];
    const { container } = render(<TriangleVisual triangles={triangles} />);
    expect(container.querySelectorAll('polygon')).toHaveLength(1);
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});
