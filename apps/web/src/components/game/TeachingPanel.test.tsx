import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TeachingPanel from './TeachingPanel';
import type { TeachingStep } from '@mathquest/shared';

vi.mock('@/components/characters/CharacterMessage', () => ({
  default: ({ children, characterId, expression, variant }: {
    children: React.ReactNode;
    characterId: string;
    expression: string;
    variant: string;
  }) => (
    <div
      data-testid="character-message"
      data-character={characterId}
      data-expression={expression}
      data-variant={variant}
    >
      {children}
    </div>
  ),
}));

const mockSteps: TeachingStep[] = [
  {
    id: 'step-1',
    characterId: 'prof-owlbert',
    expression: 'happy',
    dialogue: 'Welcome to the lesson!',
  },
  {
    id: 'step-2',
    characterId: 'prof-owlbert',
    expression: 'thinking',
    dialogue: 'Let me explain angles.',
    visualType: 'angle-diagram',
    visualProps: { angleValue: 90 },
  },
  {
    id: 'step-3',
    characterId: 'prof-owlbert',
    expression: 'encouraging',
    dialogue: 'Now you are ready!',
  },
];

describe('TeachingPanel', () => {
  const defaultProps = {
    steps: mockSteps,
    currentStep: 0,
    onNext: vi.fn(),
    onPrev: vi.fn(),
    onSkip: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the current step dialogue', () => {
    render(<TeachingPanel {...defaultProps} />);
    expect(screen.getByText('Welcome to the lesson!')).toBeInTheDocument();
  });

  it('should display step progress indicator', () => {
    render(<TeachingPanel {...defaultProps} />);
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  });

  it('should display step 2 of 3 on second step', () => {
    render(<TeachingPanel {...defaultProps} currentStep={1} />);
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
  });

  it('should render character message with teaching variant', () => {
    render(<TeachingPanel {...defaultProps} />);
    const message = screen.getByTestId('character-message');
    expect(message).toHaveAttribute('data-character', 'prof-owlbert');
    expect(message).toHaveAttribute('data-expression', 'happy');
    expect(message).toHaveAttribute('data-variant', 'teaching');
  });

  it('should show Next Step button on non-last step', () => {
    render(<TeachingPanel {...defaultProps} currentStep={0} />);
    expect(screen.getByRole('button', { name: /next step/i })).toBeInTheDocument();
  });

  it('should show Start Problems button on last step', () => {
    render(<TeachingPanel {...defaultProps} currentStep={2} />);
    expect(screen.getByRole('button', { name: /start problems/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next step/i })).not.toBeInTheDocument();
  });

  it('should show Back button when not on first step', () => {
    render(<TeachingPanel {...defaultProps} currentStep={1} />);
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('should not show Back button on first step', () => {
    render(<TeachingPanel {...defaultProps} currentStep={0} />);
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });

  it('should show Skip button', () => {
    render(<TeachingPanel {...defaultProps} />);
    expect(screen.getByRole('button', { name: /skip/i })).toBeInTheDocument();
  });

  it('should call onNext when Next Step is clicked', () => {
    render(<TeachingPanel {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /next step/i }));
    expect(defaultProps.onNext).toHaveBeenCalledOnce();
  });

  it('should call onNext when Start Problems is clicked', () => {
    render(<TeachingPanel {...defaultProps} currentStep={2} />);
    fireEvent.click(screen.getByRole('button', { name: /start problems/i }));
    expect(defaultProps.onNext).toHaveBeenCalledOnce();
  });

  it('should call onPrev when Back is clicked', () => {
    render(<TeachingPanel {...defaultProps} currentStep={1} />);
    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(defaultProps.onPrev).toHaveBeenCalledOnce();
  });

  it('should show nudge message when Skip is clicked', () => {
    render(<TeachingPanel {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /skip/i }));
    expect(screen.getByText(/reviewing the lesson helps you earn more stars/i)).toBeInTheDocument();
  });

  it('should call onSkip when confirming skip after nudge', () => {
    render(<TeachingPanel {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /skip/i }));
    fireEvent.click(screen.getByRole('button', { name: /skip anyway/i }));
    expect(defaultProps.onSkip).toHaveBeenCalledOnce();
  });

  it('should hide nudge when Go Back to Lesson is clicked', () => {
    render(<TeachingPanel {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /skip/i }));
    expect(screen.getByText(/reviewing the lesson/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /go back to lesson/i }));
    expect(screen.queryByText(/reviewing the lesson/i)).not.toBeInTheDocument();
  });

  it('should render visual area when step has visualType', () => {
    render(<TeachingPanel {...defaultProps} currentStep={1} />);
    expect(screen.getByTestId('teaching-visual-area')).toBeInTheDocument();
  });

  it('should not render visual area when step has no visualType', () => {
    render(<TeachingPanel {...defaultProps} currentStep={0} />);
    expect(screen.queryByTestId('teaching-visual-area')).not.toBeInTheDocument();
  });

  it('should update dialogue when step changes', () => {
    const { rerender } = render(<TeachingPanel {...defaultProps} currentStep={0} />);
    expect(screen.getByText('Welcome to the lesson!')).toBeInTheDocument();

    rerender(<TeachingPanel {...defaultProps} currentStep={1} />);
    expect(screen.getByText('Let me explain angles.')).toBeInTheDocument();
  });

  it('should handle single-step teaching', () => {
    const singleStep: TeachingStep[] = [mockSteps[0]];
    render(<TeachingPanel {...defaultProps} steps={singleStep} currentStep={0} />);
    expect(screen.getByText('Step 1 of 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start problems/i })).toBeInTheDocument();
  });
});
