'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useGameState } from '@/hooks/useGameState';
import ProblemDisplay from '@/components/game/ProblemDisplay';
import AnswerInput from '@/components/game/AnswerInput';
import HintPanel from '@/components/game/HintPanel';
import LevelComplete from '@/components/game/LevelComplete';
import StarDisplay from '@/components/game/StarDisplay';
import Card from '@/components/ui/Card';

export default function PlayPage() {
  const params = useParams();
  const levelId = params.levelId as string;
  const game = useGameState(levelId);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Level not found</h1>
          <Link href="/" className="mt-4 text-primary hover:underline">
            Back to World Map
          </Link>
        </div>
      </div>
    );
  }

  const { state, actions, context } = game;
  const { level, chapter, currentProblem, nextLevel } = context;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href={`/chapter/${chapter.id}`}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ← {chapter.name}
              </Link>
              <h1 className="font-bold text-foreground">{level.name}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Problem {state.currentProblemIndex + 1}/{level.problems.length}
              </div>
              {level.isChallenge && (
                <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                  Challenge ⭐
                </span>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{
                width: `${((state.currentProblemIndex + (state.feedback?.isCorrect ? 1 : 0)) / level.problems.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Problem Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Story Context */}
            {level.storyContext && state.currentProblemIndex === 0 && (
              <Card className="bg-blue-50 border border-blue-200">
                <p className="text-blue-800 italic">{level.storyContext}</p>
              </Card>
            )}

            {/* Problem */}
            <Card>
              <ProblemDisplay
                problem={currentProblem}
                showTeachingPoint={state.showTeachingPoint}
              />
            </Card>

            {/* Answer Input */}
            <Card>
              <AnswerInput
                problem={currentProblem}
                onSubmit={actions.submitAnswer}
                disabled={state.feedback?.isCorrect}
                feedback={state.feedback}
              />
            </Card>
          </div>

          {/* Sidebar - Hints */}
          <div className="lg:col-span-1">
            <Card>
              <HintPanel
                hints={currentProblem.hints}
                isChallenge={level.isChallenge}
                onRevealHint={actions.handleRevealHint}
              />
            </Card>

            {/* Stats */}
            <Card className="mt-4">
              <h3 className="font-semibold text-foreground mb-3">Your Progress</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Attempts</span>
                  <span className="font-medium">{state.attempts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hints Used</span>
                  <span className="font-medium">{state.hintsUsed}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Level Complete Modal */}
      {state.isComplete && (
        <LevelComplete
          levelName={level.name}
          stars={state.earnedStars}
          attempts={state.attempts}
          hintsUsed={state.hintsUsed}
          teachingPoint={currentProblem.teachingPoint}
          nextLevelId={nextLevel?.id}
          chapterId={chapter.id}
        />
      )}
    </div>
  );
}
