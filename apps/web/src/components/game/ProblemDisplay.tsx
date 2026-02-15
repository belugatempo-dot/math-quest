'use client';

import type { Problem } from '@mathquest/shared';
import ProblemVisual from '@/components/visuals/ProblemVisual';

/**
 * Formats a problem statement so that inline multiple-choice options
 * (A), B), C), D)) each appear on their own line.
 */
function formatStatement(text: string): string {
  // Insert a newline before each inline option marker.
  // Handles three patterns: "Triangle A:", "A. ", and "A) "
  return text
    .replace(/ (Triangle [A-D]:)/g, '\n$1')
    .replace(/ ([A-D]\. )/g, '\n$1')
    .replace(/ ([A-D]\) )/g, '\n$1');
}

interface ProblemDisplayProps {
  problem: Problem;
  showTeachingPoint?: boolean;
}

export default function ProblemDisplay({ problem, showTeachingPoint = false }: ProblemDisplayProps) {
  return (
    <div className="space-y-4 animate-slide-up" key={problem.id}>
      {/* Problem Statement */}
      <div className="text-2xl leading-relaxed text-foreground font-bold whitespace-pre-line" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        {formatStatement(problem.statement)}
      </div>

      {/* Visual */}
      <ProblemVisual problem={problem} />

      {/* Tags — hidden during active play, shown subtly */}
      {problem.tags && problem.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary/70 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Teaching Point (shown after correct answer) */}
      {showTeachingPoint && problem.teachingPoint && (
        <div className="mt-4 p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-700/50 rounded-2xl animate-slide-up">
          <div className="flex items-start gap-2">
            <span className="text-lg" role="img" aria-label="Light bulb">💡</span>
            <div>
              <p className="text-sm font-bold text-green-300">Key Insight:</p>
              <p className="mt-1 text-green-400">{problem.teachingPoint}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
