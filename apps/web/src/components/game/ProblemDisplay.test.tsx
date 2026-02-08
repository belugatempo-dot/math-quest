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
    expect(container.querySelectorAll('.bg-blue-100')).toHaveLength(0);
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
});
