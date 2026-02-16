import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChapterCard from './ChapterCard';
import type { Chapter } from '@mathquest/shared';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockChapter: Chapter = {
  id: 'chapter-3-1',
  worldId: 'world-3',
  number: 1,
  name: 'Getting Started',
  topic: 'Introduction to Multiplication',
  weekStart: 1,
  weekEnd: 3,
  levels: [
    {
      id: 'level-3-1-1',
      chapterId: 'chapter-3-1',
      worldId: 'world-3',
      number: 1,
      name: 'First Steps',
      type: 'teaching',
      storyContext: 'Story',
      problems: [{
        id: 'problem-3-1-1-1',
        levelId: 'level-3-1-1',
        sequence: 1,
        type: 'numeric_input',
        category: 'thinking',
        statement: 'What is 2 times 3?',
        inputType: 'number_pad',
        correctAnswer: { value: 6 },
        hints: [],
        solutionExplanation: 'Multiply',
        teachingPoint: 'Multiplication basics',
        tags: [],
        difficulty: 1,
      }],
      difficulty: 1,
      estimatedMinutes: 5,
      isChallenge: false,
      isBoss: false,
    },
    {
      id: 'level-3-1-2',
      chapterId: 'chapter-3-1',
      worldId: 'world-3',
      number: 2,
      name: 'Practice Time',
      type: 'practice',
      storyContext: 'Story 2',
      problems: [{
        id: 'problem-3-1-2-1',
        levelId: 'level-3-1-2',
        sequence: 1,
        type: 'numeric_input',
        category: 'fluency',
        statement: 'What is 3 times 4?',
        inputType: 'number_pad',
        correctAnswer: { value: 12 },
        hints: [],
        solutionExplanation: 'Multiply',
        teachingPoint: 'Practice multiplication',
        tags: [],
        difficulty: 2,
      }],
      difficulty: 2,
      estimatedMinutes: 8,
      isChallenge: false,
      isBoss: false,
    },
  ],
  learningObjectives: ['Learn basic multiplication', 'Understand arrays', 'Practice fluency'],
  signatureContent: ['Times tables'],
  isBoss: false,
};

describe('ChapterCard', () => {
  it('should render a link to chapter page', () => {
    render(<ChapterCard chapter={mockChapter} totalStars={3} completedLevels={1} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/chapter/chapter-3-1');
  });

  it('should display chapter number', () => {
    render(<ChapterCard chapter={mockChapter} totalStars={0} completedLevels={0} />);
    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
  });

  it('should display chapter name', () => {
    render(<ChapterCard chapter={mockChapter} totalStars={0} completedLevels={0} />);
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
  });

  it('should display star count ratio', () => {
    render(<ChapterCard chapter={mockChapter} totalStars={4} completedLevels={1} />);
    // maxStars = 2 levels * 3 = 6
    expect(screen.getByText('4/6')).toBeInTheDocument();
  });

  it('should display progress with level count', () => {
    render(<ChapterCard chapter={mockChapter} totalStars={3} completedLevels={1} />);
    expect(screen.getByText('1/2 levels')).toBeInTheDocument();
  });

  it('should display learning objectives (sliced to 2)', () => {
    render(<ChapterCard chapter={mockChapter} totalStars={0} completedLevels={0} />);
    // Only first 2 objectives joined by ", "
    expect(
      screen.getByText('Learn basic multiplication, Understand arrays')
    ).toBeInTheDocument();
  });

  it('should display week range', () => {
    render(<ChapterCard chapter={mockChapter} totalStars={0} completedLevels={0} />);
    expect(screen.getByText('Weeks 1-3')).toBeInTheDocument();
  });

  it('should render progress bar', () => {
    const { container } = render(
      <ChapterCard chapter={mockChapter} totalStars={0} completedLevels={1} />
    );
    // 1/2 levels = 50%
    const progressBar = container.querySelector('.h-2 > div');
    expect(progressBar).toBeTruthy();
    expect(progressBar!.getAttribute('style')).toContain('50%');
  });

  it('should show zero progress when no levels completed', () => {
    const { container } = render(
      <ChapterCard chapter={mockChapter} totalStars={0} completedLevels={0} />
    );
    const progressBar = container.querySelector('.h-2 > div');
    expect(progressBar!.getAttribute('style')).toContain('0%');
  });

  it('should show full progress when all levels completed', () => {
    const { container } = render(
      <ChapterCard chapter={mockChapter} totalStars={6} completedLevels={2} />
    );
    const progressBar = container.querySelector('.h-2 > div');
    expect(progressBar!.getAttribute('style')).toContain('100%');
  });

  it('should render a topic emoji in the progress ring', () => {
    render(<ChapterCard chapter={mockChapter} totalStars={0} completedLevels={0} />);
    // mockChapter topic is "Introduction to Multiplication" which is unknown → fallback 📘
    expect(screen.getByText('📘')).toBeInTheDocument();
  });

  it('should render the correct emoji for a known topic', () => {
    const divisionChapter = { ...mockChapter, topic: 'division' };
    render(<ChapterCard chapter={divisionChapter} totalStars={0} completedLevels={0} />);
    expect(screen.getByText('➗')).toBeInTheDocument();
  });
});
