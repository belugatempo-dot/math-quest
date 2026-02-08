'use client';

import type { Problem } from '@mathquest/shared';

interface ProblemDisplayProps {
  problem: Problem;
  showTeachingPoint?: boolean;
}

export default function ProblemDisplay({ problem, showTeachingPoint = false }: ProblemDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Problem Statement */}
      <div className="text-xl leading-relaxed text-foreground">
        {problem.statement}
      </div>

      {/* Tags */}
      {problem.tags && problem.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Teaching Point (shown after correct answer) */}
      {showTeachingPoint && problem.teachingPoint && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-medium text-green-800">Key Insight:</p>
          <p className="mt-1 text-green-700">{problem.teachingPoint}</p>
        </div>
      )}
    </div>
  );
}
