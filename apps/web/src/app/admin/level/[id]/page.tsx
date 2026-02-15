'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getLevelWithContext } from '@/lib/world-data';
import Card from '@/components/ui/Card';
import { getLevelTypeInfo } from '@/lib/level-type-styles';

export default function AdminLevelPage() {
  const params = useParams();
  const levelId = params.id as string;
  const levelContext = getLevelWithContext(levelId);

  if (!levelContext) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Level not found</h1>
          <Link href="/admin" className="mt-4 text-primary hover:underline">
            Back to Content Browser
          </Link>
        </div>
      </div>
    );
  }

  const { level, chapter } = levelContext;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/admin"
            className="text-gray-400 hover:text-white text-sm mb-2 inline-block"
          >
            ← Back to Content Browser
          </Link>
          <div className="flex items-center gap-3">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getLevelTypeInfo(level.type).badgeSolidClasses}`}
            >
              {level.type}
            </span>
            <h1 className="text-2xl font-bold">{level.name}</h1>
            {level.isChallenge && <span className="text-amber-400" aria-hidden="true">⭐</span>}
          </div>
          <p className="text-gray-400 mt-1">
            {chapter.name} • {level.id}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Level Metadata */}
        <Card>
          <h2 className="font-bold text-lg mb-4">Level Info</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-slate-400">Type</p>
              <p className="font-medium">{level.type}</p>
            </div>
            <div>
              <p className="text-slate-400">Difficulty</p>
              <p className="font-medium">{level.difficulty}/5</p>
            </div>
            <div>
              <p className="text-slate-400">Est. Time</p>
              <p className="font-medium">{level.estimatedMinutes} min</p>
            </div>
            <div>
              <p className="text-slate-400">Challenge</p>
              <p className="font-medium">{level.isChallenge ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {level.storyContext && (
            <div className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-700/50">
              <p className="text-sm text-blue-400 font-medium">Story Context</p>
              <p className="text-blue-200 mt-1">{level.storyContext}</p>
            </div>
          )}
        </Card>

        {/* Problems */}
        {level.problems.map((problem, index) => (
          <Card key={problem.id}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Problem {index + 1}</h2>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">
                  {problem.type}
                </span>
                <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">
                  {problem.inputType}
                </span>
              </div>
            </div>

            {/* Statement */}
            <div className="mb-4">
              <p className="text-sm text-slate-400 mb-1">Statement</p>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <p className="text-lg">{problem.statement}</p>
              </div>
            </div>

            {/* Answer */}
            <div className="mb-4">
              <p className="text-sm text-slate-400 mb-1">Correct Answer</p>
              <div className="p-4 bg-green-900/30 rounded-lg border border-green-700/50">
                <p className="text-green-300 font-medium">
                  {typeof problem.correctAnswer.value === 'object'
                    ? JSON.stringify(problem.correctAnswer.value)
                    : String(problem.correctAnswer.value)}
                </p>
                {problem.correctAnswer.displayValue && (
                  <p className="text-sm text-green-400 mt-1">
                    Display: {problem.correctAnswer.displayValue}
                  </p>
                )}
              </div>
            </div>

            {/* Teaching Point */}
            {problem.teachingPoint && (
              <div className="mb-4">
                <p className="text-sm text-slate-400 mb-1">Teaching Point</p>
                <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700/50">
                  <p className="text-blue-200">{problem.teachingPoint}</p>
                </div>
              </div>
            )}

            {/* Solution Explanation */}
            {problem.solutionExplanation && (
              <div className="mb-4">
                <p className="text-sm text-slate-400 mb-1">Solution Explanation</p>
                <div className="p-4 bg-amber-900/30 rounded-lg border border-amber-700/50">
                  <p className="text-amber-200">{problem.solutionExplanation}</p>
                </div>
              </div>
            )}

            {/* Hints */}
            {problem.hints && problem.hints.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-slate-400 mb-2">
                  Hints ({problem.hints.length})
                </p>
                <div className="space-y-2">
                  {problem.hints.map((hint, hintIndex) => (
                    <div
                      key={hintIndex}
                      className="p-3 bg-purple-900/30 rounded-lg border border-purple-700/50 flex gap-3"
                    >
                      <span className="px-2 py-1 bg-purple-700 text-purple-200 rounded text-xs font-medium">
                        Tier {hint.tier}
                      </span>
                      <p className="text-purple-200">{hint.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {problem.tags && problem.tags.length > 0 && (
              <div>
                <p className="text-sm text-slate-400 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-500">
              ID: {problem.id} • Category: {problem.category} • Difficulty:{' '}
              {problem.difficulty}/5
            </div>
          </Card>
        ))}

        {/* Play Button */}
        <div className="text-center">
          <Link
            href={`/play/${level.id}`}
            className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            Play This Level →
          </Link>
        </div>
      </main>
    </div>
  );
}
