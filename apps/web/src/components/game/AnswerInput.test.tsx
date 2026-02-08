import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AnswerInput from './AnswerInput';
import type { Problem } from '@mathquest/shared';

const baseProblem: Problem = {
  id: 'problem-3-1-1-1',
  levelId: 'level-3-1-1',
  sequence: 1,
  type: 'numeric_input',
  category: 'thinking',
  statement: 'What is 5 times 3?',
  inputType: 'number_pad',
  correctAnswer: { value: 15 },
  hints: [],
  solutionExplanation: 'Multiply 5 by 3',
  teachingPoint: 'Multiplication is repeated addition',
  tags: [],
  difficulty: 2,
};

describe('AnswerInput', () => {
  describe('input type rendering', () => {
    it('should render number_pad with number input and grid buttons', () => {
      render(<AnswerInput problem={baseProblem} onSubmit={vi.fn()} />);
      expect(screen.getByPlaceholderText('Enter your answer...')).toBeInTheDocument();
      // Number pad buttons 0-9
      for (let i = 0; i <= 9; i++) {
        expect(screen.getByRole('button', { name: String(i) })).toBeInTheDocument();
      }
      // Backspace button
      expect(screen.getByRole('button', { name: '←' })).toBeInTheDocument();
    });

    it('should render multiple_choice with text input', () => {
      const mcProblem = { ...baseProblem, inputType: 'multiple_choice' as const };
      render(<AnswerInput problem={mcProblem} onSubmit={vi.fn()} />);
      expect(
        screen.getByPlaceholderText('Enter your answer (A, B, C, or D)...')
      ).toBeInTheDocument();
    });

    it('should render text_field with text input', () => {
      const textProblem = { ...baseProblem, inputType: 'text_field' as const };
      render(<AnswerInput problem={textProblem} onSubmit={vi.fn()} />);
      expect(screen.getByPlaceholderText('Type your answer...')).toBeInTheDocument();
    });

    it('should render default input for unknown input type', () => {
      const otherProblem = { ...baseProblem, inputType: 'slider' as const };
      render(<AnswerInput problem={otherProblem} onSubmit={vi.fn()} />);
      expect(screen.getByPlaceholderText('Type your answer...')).toBeInTheDocument();
    });
  });

  describe('submit behavior', () => {
    it('should not submit when input is empty', () => {
      const onSubmit = vi.fn();
      render(<AnswerInput problem={baseProblem} onSubmit={onSubmit} />);
      const submitButton = screen.getByRole('button', { name: 'Check Answer' });
      expect(submitButton).toBeDisabled();
    });

    it('should submit value when button is clicked', async () => {
      const onSubmit = vi.fn();
      render(<AnswerInput problem={baseProblem} onSubmit={onSubmit} />);
      const input = screen.getByPlaceholderText('Enter your answer...');
      fireEvent.change(input, { target: { value: '15' } });
      const submitButton = screen.getByRole('button', { name: 'Check Answer' });
      fireEvent.click(submitButton);
      expect(onSubmit).toHaveBeenCalledWith(15);
    });

    it('should convert to number for number_pad input', async () => {
      const onSubmit = vi.fn();
      render(<AnswerInput problem={baseProblem} onSubmit={onSubmit} />);
      const input = screen.getByPlaceholderText('Enter your answer...');
      fireEvent.change(input, { target: { value: '42' } });
      fireEvent.click(screen.getByRole('button', { name: 'Check Answer' }));
      expect(onSubmit).toHaveBeenCalledWith(42);
    });

    it('should not submit when number_pad value is non-numeric (input type=number rejects it)', () => {
      const onSubmit = vi.fn();
      render(<AnswerInput problem={baseProblem} onSubmit={onSubmit} />);
      const input = screen.getByPlaceholderText('Enter your answer...');
      // type="number" ignores non-numeric input, value stays empty
      fireEvent.change(input, { target: { value: 'abc' } });
      const submitButton = screen.getByRole('button', { name: 'Check Answer' });
      expect(submitButton).toBeDisabled();
    });

    it('should submit string for text_field input', async () => {
      const onSubmit = vi.fn();
      const textProblem = { ...baseProblem, inputType: 'text_field' as const };
      render(<AnswerInput problem={textProblem} onSubmit={onSubmit} />);
      const input = screen.getByPlaceholderText('Type your answer...');
      fireEvent.change(input, { target: { value: 'hello' } });
      fireEvent.click(screen.getByRole('button', { name: 'Check Answer' }));
      expect(onSubmit).toHaveBeenCalledWith('hello');
    });

    it('should submit on Enter key', async () => {
      const onSubmit = vi.fn();
      render(<AnswerInput problem={baseProblem} onSubmit={onSubmit} />);
      const input = screen.getByPlaceholderText('Enter your answer...');
      fireEvent.change(input, { target: { value: '15' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onSubmit).toHaveBeenCalledWith(15);
    });

    it('should not submit on Enter when disabled', () => {
      const onSubmit = vi.fn();
      render(<AnswerInput problem={baseProblem} onSubmit={onSubmit} disabled />);
      const input = screen.getByPlaceholderText('Enter your answer...');
      fireEvent.change(input, { target: { value: '15' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('feedback display', () => {
    it('should show correct feedback', () => {
      render(
        <AnswerInput
          problem={baseProblem}
          onSubmit={vi.fn()}
          feedback={{ isCorrect: true }}
        />
      );
      expect(screen.getByText('✓ Correct!')).toBeInTheDocument();
    });

    it('should show incorrect feedback', () => {
      render(
        <AnswerInput
          problem={baseProblem}
          onSubmit={vi.fn()}
          feedback={{ isCorrect: false }}
        />
      );
      expect(screen.getByText('✗ Not quite right')).toBeInTheDocument();
    });

    it('should show feedback message when provided', () => {
      render(
        <AnswerInput
          problem={baseProblem}
          onSubmit={vi.fn()}
          feedback={{ isCorrect: false, message: 'Check your multiplication' }}
        />
      );
      expect(screen.getByText('Check your multiplication')).toBeInTheDocument();
    });

    it('should not show feedback when null', () => {
      render(<AnswerInput problem={baseProblem} onSubmit={vi.fn()} feedback={null} />);
      expect(screen.queryByText('✓ Correct!')).not.toBeInTheDocument();
      expect(screen.queryByText('✗ Not quite right')).not.toBeInTheDocument();
    });
  });

  describe('button text', () => {
    it('should show "Check Answer" by default', () => {
      render(<AnswerInput problem={baseProblem} onSubmit={vi.fn()} />);
      expect(screen.getByRole('button', { name: 'Check Answer' })).toBeInTheDocument();
    });

    it('should show "Continue" after correct answer', () => {
      render(
        <AnswerInput
          problem={baseProblem}
          onSubmit={vi.fn()}
          feedback={{ isCorrect: true }}
        />
      );
      expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
    });
  });

  describe('number pad interaction', () => {
    it('should append number when pad button is clicked', () => {
      render(<AnswerInput problem={baseProblem} onSubmit={vi.fn()} />);
      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '5' }));
      const input = screen.getByPlaceholderText('Enter your answer...') as HTMLInputElement;
      expect(input.value).toBe('15');
    });

    it('should delete last character when backspace is clicked', () => {
      render(<AnswerInput problem={baseProblem} onSubmit={vi.fn()} />);
      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '5' }));
      fireEvent.click(screen.getByRole('button', { name: '←' }));
      const input = screen.getByPlaceholderText('Enter your answer...') as HTMLInputElement;
      expect(input.value).toBe('1');
    });
  });
});
