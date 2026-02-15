import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProblemDisplay from './ProblemDisplay';
import type { Problem } from '@mathquest/shared';

const mockProblem: Problem = {
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
  tags: ['multiplication', 'basic'],
  difficulty: 2,
};

describe('ProblemDisplay', () => {
  it('should render the problem statement', () => {
    render(<ProblemDisplay problem={mockProblem} />);
    expect(screen.getByText('What is 5 times 3?')).toBeInTheDocument();
  });

  it('should render tags when present', () => {
    render(<ProblemDisplay problem={mockProblem} />);
    expect(screen.getByText('multiplication')).toBeInTheDocument();
    expect(screen.getByText('basic')).toBeInTheDocument();
  });

  it('should not render tags section when tags are empty', () => {
    const problemNoTags = { ...mockProblem, tags: [] };
    const { container } = render(<ProblemDisplay problem={problemNoTags} />);
    // No tag badges should be rendered
    // No tag badges should be rendered
    expect(container.querySelectorAll('[class*="rounded-full"]')).toHaveLength(0);
  });

  it('should not show teaching point by default', () => {
    render(<ProblemDisplay problem={mockProblem} />);
    expect(screen.queryByText('Key Insight:')).not.toBeInTheDocument();
    expect(screen.queryByText(mockProblem.teachingPoint)).not.toBeInTheDocument();
  });

  it('should show teaching point when showTeachingPoint is true', () => {
    render(<ProblemDisplay problem={mockProblem} showTeachingPoint />);
    expect(screen.getByText('Key Insight:')).toBeInTheDocument();
    expect(screen.getByText('Multiplication is repeated addition')).toBeInTheDocument();
  });

  it('should not show teaching point even when true if teachingPoint is empty', () => {
    const problemNoTeaching = { ...mockProblem, teachingPoint: '' };
    render(<ProblemDisplay problem={problemNoTeaching} showTeachingPoint />);
    expect(screen.queryByText('Key Insight:')).not.toBeInTheDocument();
  });

  describe('multiple-choice formatting', () => {
    it('should insert line breaks before inline A)/B)/C)/D) options', () => {
      const mcProblem: Problem = {
        ...mockProblem,
        statement: 'Which is largest? A) 12 B) 8 C) 15 D) 3',
      };
      const { container } = render(<ProblemDisplay problem={mcProblem} />);
      const statementEl = container.querySelector('[class*="whitespace-pre-line"]');
      expect(statementEl).toBeInTheDocument();
      // The text content should have newlines before each option
      expect(statementEl!.textContent).toContain('Which is largest?');
      expect(statementEl!.textContent).toContain('\nA) 12');
      expect(statementEl!.textContent).toContain('\nB) 8');
      expect(statementEl!.textContent).toContain('\nC) 15');
      expect(statementEl!.textContent).toContain('\nD) 3');
    });

    it('should preserve existing newlines in statements', () => {
      const nlProblem: Problem = {
        ...mockProblem,
        statement: 'Line one\nLine two\nLine three',
      };
      const { container } = render(<ProblemDisplay problem={nlProblem} />);
      const statementEl = container.querySelector('[class*="whitespace-pre-line"]');
      expect(statementEl).toBeInTheDocument();
      expect(statementEl!.textContent).toBe('Line one\nLine two\nLine three');
    });

    it('should not modify statements without multiple-choice options', () => {
      render(<ProblemDisplay problem={mockProblem} />);
      const statementEl = screen.getByText('What is 5 times 3?');
      expect(statementEl).toBeInTheDocument();
      expect(statementEl.textContent).toBe('What is 5 times 3?');
    });

    it('should insert line breaks before Triangle A:/B:/C: options', () => {
      const triangleProblem: Problem = {
        ...mockProblem,
        statement: 'Which triangle is equilateral? Triangle A: sides 5,5,5 Triangle B: sides 5,5,3 Triangle C: sides 3,4,5',
      };
      const { container } = render(<ProblemDisplay problem={triangleProblem} />);
      const statementEl = container.querySelector('[class*="whitespace-pre-line"]');
      expect(statementEl).toBeInTheDocument();
      expect(statementEl!.textContent).toContain('Which triangle is equilateral?');
      expect(statementEl!.textContent).toContain('\nTriangle A: sides 5,5,5');
      expect(statementEl!.textContent).toContain('\nTriangle B: sides 5,5,3');
      expect(statementEl!.textContent).toContain('\nTriangle C: sides 3,4,5');
    });

    it('should insert line breaks before A./B./C. dot-format options', () => {
      const dotProblem: Problem = {
        ...mockProblem,
        statement: 'Which shape has 4 equal sides? A. Square B. Rectangle C. Parallelogram D. Trapezoid',
      };
      const { container } = render(<ProblemDisplay problem={dotProblem} />);
      const statementEl = container.querySelector('[class*="whitespace-pre-line"]');
      expect(statementEl).toBeInTheDocument();
      expect(statementEl!.textContent).toContain('Which shape has 4 equal sides?');
      expect(statementEl!.textContent).toContain('\nA. Square');
      expect(statementEl!.textContent).toContain('\nB. Rectangle');
      expect(statementEl!.textContent).toContain('\nC. Parallelogram');
      expect(statementEl!.textContent).toContain('\nD. Trapezoid');
    });
  });
});
