'use client';

import { useState, useCallback } from 'react';
import type { Problem, InputType } from '@mathquest/shared';
import Button from '@/components/ui/Button';

interface AnswerInputProps {
  problem: Problem;
  onSubmit: (answer: string | number) => void;
  disabled?: boolean;
  feedback?: { isCorrect: boolean; message?: string } | null;
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
              className="w-full px-4 py-3 text-xl text-center border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none disabled:bg-gray-100"
              autoFocus
            />
            {/* Number pad for touch */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <button
                  key={num}
                  onClick={() => setValue((v) => v + num.toString())}
                  disabled={disabled}
                  className="py-3 text-xl font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setValue((v) => v.slice(0, -1))}
                disabled={disabled}
                className="py-3 text-xl font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                ←
              </button>
            </div>
          </div>
        );

      case 'multiple_choice':
        return (
          <div className="space-y-2">
            {/* This would need options from the problem - simplified for now */}
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder="Enter your answer (A, B, C, or D)..."
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none disabled:bg-gray-100"
              autoFocus
            />
          </div>
        );

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
            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none disabled:bg-gray-100"
            autoFocus
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderInput()}

      {/* Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-lg ${
            feedback.isCorrect
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          <p className="font-medium">
            {feedback.isCorrect ? '✓ Correct!' : '✗ Not quite right'}
          </p>
          {feedback.message && <p className="mt-1 text-sm">{feedback.message}</p>}
        </div>
      )}

      {/* Submit Button */}
      <Button
        variant={feedback?.isCorrect ? 'success' : 'primary'}
        size="lg"
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        className="w-full"
      >
        {feedback?.isCorrect ? 'Continue' : 'Check Answer'}
      </Button>
    </div>
  );
}
