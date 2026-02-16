'use client';

import { useState, useCallback } from 'react';
import type { Problem } from '@mathquest/shared';
import Button from '@/components/ui/Button';

interface AnswerInputProps {
  problem: Problem;
  onSubmit: (answer: string | number) => void;
  disabled?: boolean;
  feedback?: { isCorrect: boolean; message?: string } | null;
}

function BackspaceIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
      <line x1="18" y1="9" x2="12" y2="15" />
      <line x1="12" y1="9" x2="18" y2="15" />
    </svg>
  );
}

function parseMultipleChoiceOptions(statement: string): string[] {
  const options: string[] = [];
  const regex = /([A-D]\))\s*(.*?)(?=\s+[A-D]\)|$)/g;
  let match;
  while ((match = regex.exec(statement)) !== null) {
    options.push(`${match[1]} ${match[2].trim()}`);
  }
  return options;
}

export default function AnswerInput({
  problem,
  onSubmit,
  disabled = false,
  feedback = null,
}: AnswerInputProps) {
  const [value, setValue] = useState<string>('');

  const handleSubmit = useCallback(() => {
    if (!value.trim()) return;

    // Convert to number if numeric input
    if (problem.inputType === 'number_pad') {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        onSubmit(numValue);
      } else {
        onSubmit(value);
      }
    } else {
      onSubmit(value);
    }
  }, [value, problem.inputType, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !disabled) {
        handleSubmit();
      }
    },
    [handleSubmit, disabled]
  );

  const feedbackAnimation = feedback
    ? feedback.isCorrect
      ? 'animate-pulse-correct'
      : 'animate-shake'
    : '';

  const renderInput = () => {
    switch (problem.inputType) {
      case 'number_pad':
        return (
          <div className="space-y-4">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder="Enter your answer..."
              className="w-full px-4 py-3 text-2xl text-center font-bold border-2 border-primary/30 rounded-2xl focus:border-primary focus:outline-none focus:shadow-game-glow disabled:bg-white/5 bg-white/10 text-foreground transition-all"
              autoFocus
            />
            {/* Game-style number pad */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => setValue((v) => v + num.toString())}
                  disabled={disabled}
                  className="min-h-[64px] py-3 text-xl font-bold bg-gradient-to-b from-white/15 to-white/10 border-2 border-white/25 text-foreground shadow-game-sm hover:shadow-game hover:scale-105 active:translate-y-0.5 active:shadow-none rounded-xl transition-all disabled:opacity-50"
                >
                  {num}
                </button>
              ))}
              <div /> {/* Empty cell for alignment */}
              <button
                onClick={() => setValue((v) => v + '0')}
                disabled={disabled}
                className="min-h-[64px] py-3 text-xl font-bold bg-gradient-to-b from-white/15 to-white/10 border-2 border-white/25 text-foreground shadow-game-sm hover:shadow-game hover:scale-105 active:translate-y-0.5 active:shadow-none rounded-xl transition-all disabled:opacity-50"
              >
                0
              </button>
              <button
                onClick={() => setValue((v) => v.slice(0, -1))}
                disabled={disabled}
                className="min-h-[64px] py-3 text-xl font-bold bg-gradient-to-b from-red-500/20 to-red-500/30 border-2 border-red-400/30 shadow-game-sm hover:shadow-game hover:scale-105 active:translate-y-0.5 active:shadow-none rounded-xl transition-all disabled:opacity-50 flex items-center justify-center text-red-300"
                aria-label="Backspace"
              >
                <BackspaceIcon />
              </button>
            </div>
          </div>
        );

      case 'multiple_choice': {
        const options = parseMultipleChoiceOptions(problem.statement);
        return (
          <div className="space-y-2">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setValue(option)}
                disabled={disabled}
                className={`w-full text-left px-4 py-3 text-lg font-medium border-2 rounded-2xl transition-all ${
                  value === option
                    ? 'border-primary ring-2 ring-primary/50 bg-primary/20 text-foreground'
                    : 'border-white/20 bg-white/10 text-foreground hover:border-white/40 hover:bg-white/15'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      }

      case 'text_field':
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Type your answer..."
            className="w-full px-4 py-3 text-lg font-medium border-2 border-primary/30 rounded-2xl focus:border-primary focus:outline-none focus:shadow-game-glow disabled:bg-white/5 bg-white/10 text-foreground transition-all"
            autoFocus
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderInput()}

      {/* Order hint for set-type problems */}
      {problem.correctAnswer.orderIndependent && (
        <p className="text-sm text-white/50 text-center">(any order)</p>
      )}

      {/* Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl ${feedbackAnimation} ${
            feedback.isCorrect
              ? 'bg-gradient-to-r from-green-500/20 to-green-500/15 text-green-200 border border-green-400/30'
              : 'bg-gradient-to-r from-red-500/20 to-red-500/15 text-red-200 border border-red-400/30'
          }`}
        >
          <p className="font-bold">
            {feedback.isCorrect ? '✓ Correct!' : '✗ Not quite right'}
          </p>
          {feedback.message && <p className="mt-1 text-sm">{feedback.message}</p>}
        </div>
      )}

      {/* Submit Button */}
      <Button
        variant={feedback?.isCorrect ? 'game-success' : 'game'}
        size="lg"
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        className={`w-full text-lg ${!disabled && value.trim() && !feedback?.isCorrect ? 'animate-glow-pulse' : ''}`}
      >
        {feedback?.isCorrect ? 'Continue' : 'Check Answer'}
      </Button>
    </div>
  );
}
