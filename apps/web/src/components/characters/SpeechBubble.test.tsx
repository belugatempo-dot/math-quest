import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SpeechBubble from './SpeechBubble';

describe('SpeechBubble', () => {
  it('should render children', () => {
    render(<SpeechBubble>Hello world</SpeechBubble>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('should have speech-bubble testid', () => {
    render(<SpeechBubble>Content</SpeechBubble>);
    expect(screen.getByTestId('speech-bubble')).toBeInTheDocument();
  });

  it('should apply story variant styles by default', () => {
    render(<SpeechBubble>Content</SpeechBubble>);
    const bubble = screen.getByTestId('speech-bubble');
    expect(bubble.className).toContain('bg-blue-500/20');
  });

  it('should apply hint variant styles', () => {
    render(<SpeechBubble variant="hint">Content</SpeechBubble>);
    const bubble = screen.getByTestId('speech-bubble');
    expect(bubble.className).toContain('bg-amber-500/20');
  });

  it('should apply feedback variant styles', () => {
    render(<SpeechBubble variant="feedback">Content</SpeechBubble>);
    const bubble = screen.getByTestId('speech-bubble');
    expect(bubble.className).toContain('bg-green-500/20');
  });

  it('should render triangle pointer as aria-hidden', () => {
    const { container } = render(<SpeechBubble>Content</SpeechBubble>);
    const pointer = container.querySelector('[aria-hidden="true"]');
    expect(pointer).toBeInTheDocument();
  });

  it('should render React elements as children', () => {
    render(
      <SpeechBubble>
        <strong data-testid="strong-child">Bold text</strong>
      </SpeechBubble>
    );
    expect(screen.getByTestId('strong-child')).toBeInTheDocument();
  });
});
