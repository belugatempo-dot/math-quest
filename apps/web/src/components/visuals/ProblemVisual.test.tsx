import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProblemVisual from './ProblemVisual';
import type { Problem } from '@mathquest/shared';

const baseProblem: Problem = {
  id: 'problem-3-1-1-1',
  levelId: 'level-3-1-1',
  sequence: 1,
  type: 'numeric_input',
  category: 'thinking',
  statement: 'What is 5 × 3?',
  inputType: 'number_pad',
  correctAnswer: { value: 15 },
  hints: [],
  solutionExplanation: 'Multiply 5 by 3',
  teachingPoint: 'Multiplication is repeated addition',
  tags: [],
  difficulty: 2,
};

describe('ProblemVisual', () => {
  it('should return null for problems without matching tags', () => {
    const { container } = render(<ProblemVisual problem={baseProblem} />);
    expect(container.innerHTML).toBe('');
  });

  it('should render multiplication array for multiplication-tagged problem', () => {
    const problem = {
      ...baseProblem,
      tags: ['multiplication'],
      statement: 'What is 3 × 4?',
    };
    render(<ProblemVisual problem={problem} />);
    expect(screen.getByTestId('multiplication-array')).toBeInTheDocument();
  });

  it('should render multiplication array for arrays-tagged problem', () => {
    const problem = {
      ...baseProblem,
      tags: ['arrays'],
      statement: 'Show 2 x 5 as an array',
    };
    render(<ProblemVisual problem={problem} />);
    expect(screen.getByTestId('multiplication-array')).toBeInTheDocument();
  });

  it('should not render multiplication array when numbers exceed 12', () => {
    const problem = {
      ...baseProblem,
      tags: ['multiplication'],
      statement: 'What is 15 × 20?',
    };
    const { container } = render(<ProblemVisual problem={problem} />);
    expect(container.querySelector('[data-testid="multiplication-array"]')).not.toBeInTheDocument();
  });

  it('should render number line for number_line-tagged problem', () => {
    const problem = {
      ...baseProblem,
      tags: ['number_line'],
      statement: 'Find 5 on the line from 0 to 10',
    };
    render(<ProblemVisual problem={problem} />);
    expect(screen.getByTestId('number-line')).toBeInTheDocument();
  });

  it('should render number line for skip_counting-tagged problem', () => {
    const problem = {
      ...baseProblem,
      tags: ['skip_counting'],
      statement: 'Count by 3: 3, 6, 9, 12',
    };
    render(<ProblemVisual problem={problem} />);
    expect(screen.getByTestId('number-line')).toBeInTheDocument();
  });

  it('should render comparison visual for compare_without_calc category', () => {
    const problem = {
      ...baseProblem,
      category: 'compare_without_calc' as const,
      statement: 'Which is larger: 12 or 20?',
    };
    render(<ProblemVisual problem={problem} />);
    expect(screen.getByTestId('comparison-visual')).toBeInTheDocument();
  });

  it('should render comparison visual for comparison-tagged problem', () => {
    const problem = {
      ...baseProblem,
      tags: ['comparison'],
      statement: 'Compare 8 and 15',
    };
    render(<ProblemVisual problem={problem} />);
    expect(screen.getByTestId('comparison-visual')).toBeInTheDocument();
  });

  it('should not render comparison when regex does not match', () => {
    const problem = {
      ...baseProblem,
      category: 'compare_without_calc' as const,
      statement: 'Which expression is larger?',
    };
    const { container } = render(<ProblemVisual problem={problem} />);
    expect(container.querySelector('[data-testid="comparison-visual"]')).not.toBeInTheDocument();
  });

  it('should not render number line when fewer than 2 numbers found', () => {
    const problem = {
      ...baseProblem,
      tags: ['number_line'],
      statement: 'Place the number on the line',
    };
    const { container } = render(<ProblemVisual problem={problem} />);
    expect(container.querySelector('[data-testid="number-line"]')).not.toBeInTheDocument();
  });

  describe('triangle visual', () => {
    it('should render triangle visual for triangles tag with multi-triangle statement', () => {
      const problem = {
        ...baseProblem,
        tags: ['triangles'],
        statement: 'Which triangle is equilateral? Triangle A: sides 5, 5, 5 Triangle B: sides 5, 5, 3 Triangle C: sides 3, 4, 5',
      };
      render(<ProblemVisual problem={problem} />);
      expect(screen.getByTestId('triangle-visual')).toBeInTheDocument();
    });

    it('should render triangle visual for triangles tag with single triangle statement', () => {
      const problem = {
        ...baseProblem,
        tags: ['triangles'],
        statement: 'A triangle has sides of length 4, 4, and 4. What type is it?',
      };
      render(<ProblemVisual problem={problem} />);
      expect(screen.getByTestId('triangle-visual')).toBeInTheDocument();
    });

    it('should not render triangle visual when no side data is parseable', () => {
      const problem = {
        ...baseProblem,
        tags: ['triangles'],
        statement: 'How many sides does a triangle have?',
      };
      const { container } = render(<ProblemVisual problem={problem} />);
      expect(container.querySelector('[data-testid="triangle-visual"]')).not.toBeInTheDocument();
    });

    it('should not render triangle visual when triangles tag is absent', () => {
      const problem = {
        ...baseProblem,
        tags: ['geometry'],
        statement: 'Triangle A: sides 5, 5, 5 Triangle B: sides 5, 5, 3',
      };
      const { container } = render(<ProblemVisual problem={problem} />);
      expect(container.querySelector('[data-testid="triangle-visual"]')).not.toBeInTheDocument();
    });
  });
});
