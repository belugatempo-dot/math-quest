'use client';

import type { Problem } from '@mathquest/shared';
import MultiplicationArray from './MultiplicationArray';
import NumberLine from './NumberLine';
import ComparisonVisual from './ComparisonVisual';
import TriangleVisual from './TriangleVisual';
import type { TriangleDef } from './TriangleVisual';

interface ProblemVisualProps {
  problem: Problem;
}

const MULT_REGEX = /(\d+)\s*[x×*]\s*(\d+)/i;
const COMPARE_REGEX = /(\d+)\s*(?:or|vs|and|,)\s*(\d+)/i;
const MULTI_TRIANGLE_REGEX = /Triangle ([A-D]): sides (\d+),\s*(\d+),\s*(\d+)/g;
const SINGLE_TRIANGLE_REGEX = /triangle.*?sides\s+(?:of\s+length\s+)?(\d+),\s*(\d+),?\s*(?:and\s+)?(\d+)/i;

function parseMultiplication(statement: string): { rows: number; cols: number } | null {
  const match = statement.match(MULT_REGEX);
  if (!match) return null;
  const a = parseInt(match[1], 10);
  const b = parseInt(match[2], 10);
  if (a > 12 || b > 12 || a < 1 || b < 1) return null;
  return { rows: a, cols: b };
}

function parseComparison(statement: string): { left: number; right: number } | null {
  const match = statement.match(COMPARE_REGEX);
  if (!match) return null;
  return { left: parseInt(match[1], 10), right: parseInt(match[2], 10) };
}

function parseTriangles(statement: string): TriangleDef[] {
  // Try multi-triangle format first: "Triangle A: sides 5, 5, 5"
  const results: TriangleDef[] = [];
  let match: RegExpExecArray | null;
  // Reset lastIndex since MULTI_TRIANGLE_REGEX has global flag
  MULTI_TRIANGLE_REGEX.lastIndex = 0;
  while ((match = MULTI_TRIANGLE_REGEX.exec(statement)) !== null) {
    results.push({
      label: match[1],
      sides: [parseInt(match[2], 10), parseInt(match[3], 10), parseInt(match[4], 10)],
    });
  }
  if (results.length > 0) return results;

  // Try single-triangle format: "a triangle has sides of length 4, 4, and 4"
  const single = statement.match(SINGLE_TRIANGLE_REGEX);
  if (single) {
    return [{
      sides: [parseInt(single[1], 10), parseInt(single[2], 10), parseInt(single[3], 10)],
    }];
  }

  return [];
}

export default function ProblemVisual({ problem }: ProblemVisualProps) {
  const tags = problem.tags ?? [];

  // Multiplication array for multiplication-tagged problems
  if (tags.includes('multiplication') || tags.includes('arrays')) {
    const mult = parseMultiplication(problem.statement);
    if (mult) {
      return (
        <div className="flex justify-center my-3">
          <MultiplicationArray rows={mult.rows} cols={mult.cols} />
        </div>
      );
    }
  }

  // Number line for number_line-tagged problems
  if (tags.includes('number_line') || tags.includes('skip_counting')) {
    const numbers = problem.statement.match(/\d+/g)?.map(Number) ?? [];
    if (numbers.length >= 2) {
      const min = Math.min(...numbers);
      const max = Math.max(...numbers);
      return (
        <div className="my-3">
          <NumberLine min={min} max={max} marks={numbers} />
        </div>
      );
    }
  }

  // Comparison visual for compare-tagged problems
  if (problem.category === 'compare_without_calc' || tags.includes('comparison')) {
    const comparison = parseComparison(problem.statement);
    if (comparison) {
      return (
        <div className="my-3">
          <ComparisonVisual leftValue={comparison.left} rightValue={comparison.right} />
        </div>
      );
    }
  }

  // Triangle visual for triangle-tagged problems
  if (tags.includes('triangles')) {
    const triangles = parseTriangles(problem.statement);
    if (triangles.length > 0) {
      return (
        <div className="flex justify-center my-3">
          <TriangleVisual triangles={triangles} />
        </div>
      );
    }
  }

  return null;
}
