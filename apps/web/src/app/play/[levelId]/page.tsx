'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useGameState } from '@/hooks/useGameState';
import { WorldThemeProvider } from '@/contexts/WorldThemeContext';
import ProblemDisplay from '@/components/game/ProblemDisplay';
import AnswerInput from '@/components/game/AnswerInput';
import HintPanel from '@/components/game/HintPanel';
import LevelComplete from '@/components/game/LevelComplete';
import CharacterMessage from '@/components/characters/CharacterMessage';
import StreakIndicator from '@/components/game/StreakIndicator';
import GameProgressBar from '@/components/game/GameProgressBar';
import TeachingPanel from '@/components/game/TeachingPanel';
import AdaptiveReteachModal from '@/components/game/AdaptiveReteachModal';

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
  const { level, chapter, world, currentProblem, nextLevel } = context;

  const teachingSteps = level.teaching?.format === 'multi-step-lesson' ? level.teaching.steps : undefined;
  const isTeachingPhase = state.phase === 'teaching';
  const isProblemPhase = state.phase === 'problem' || state.phase === 'feedback' || state.phase === 'teaching-point';
  const isAdaptiveReteach = state.phase === 'adaptive-reteach';

  return (
    <WorldThemeProvider colorPalette={world.colorPalette}>
    <div className="min-h-screen relative">
      {/* Game HUD Header */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-primary/95 to-primary/90 backdrop-blur-sm text-white">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Link
                href={`/chapter/${chapter.id}`}
                className="text-white/60 hover:text-white text-xs transition-colors"
              >
                ← {chapter.name}
              </Link>
              <h1 className="font-bold text-sm text-white">{level.name}</h1>
            </div>
            <div className="flex items-center gap-3">
              <StreakIndicator streak={state.correctStreak} />
              {!isTeachingPhase && (
                <div className="text-xs text-white/70 font-medium">
                  Problem {state.currentProblemIndex + 1}/{level.problems.length}
                </div>
              )}
              {level.isChallenge && (
                <span className="px-2 py-0.5 text-xs font-bold bg-amber-400/20 text-amber-200 rounded-full">
                  Challenge ⭐
                </span>
              )}
            </div>
          </div>

          {/* Segmented progress bar */}
          {!isTeachingPhase && (
            <GameProgressBar
              total={level.problems.length}
              current={state.currentProblemIndex}
              isCurrentCorrect={state.feedback?.isCorrect}
            />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-5">
          {/* Teaching Phase */}
          {isTeachingPhase && teachingSteps && (
            <div className="rounded-2xl border-2 border-purple-300/30 bg-slate-800/90 backdrop-blur-sm p-5 shadow-lg">
              <TeachingPanel
                steps={teachingSteps}
                currentStep={state.currentTeachingStep}
                onNext={actions.nextTeachingStep}
                onPrev={actions.prevTeachingStep}
                onSkip={actions.skipTeaching}
              />
            </div>
          )}

          {/* Problem Phase */}
          {isProblemPhase && (
            <>
              {/* Review Lesson Button */}
              {state.teachingCompleted && teachingSteps && (
                <button
                  onClick={actions.reviewLesson}
                  className="w-full py-2 text-sm font-medium text-purple-400 border border-purple-400/30 rounded-lg hover:bg-purple-400/10 transition-colors"
                >
                  Review Lesson
                </button>
              )}

              {/* Story Context */}
              {level.storyContext && state.currentProblemIndex === 0 && !state.teachingCompleted && (
                <CharacterMessage characterId="grogg" expression="happy" variant="story">
                  <p className="italic">{level.storyContext}</p>
                </CharacterMessage>
              )}

              {/* Problem Area */}
              <div className="rounded-2xl border-2 border-primary/30 bg-slate-800/90 backdrop-blur-sm p-5 shadow-lg">
                <ProblemDisplay
                  problem={currentProblem}
                  showTeachingPoint={state.showTeachingPoint}
                />
              </div>

              {/* Answer Input */}
              <div className="rounded-2xl bg-slate-800/90 backdrop-blur-sm p-5 shadow-md">
                <AnswerInput
                  problem={currentProblem}
                  onSubmit={actions.submitAnswer}
                  disabled={state.feedback?.isCorrect}
                  feedback={state.feedback}
                />
              </div>

              {/* Hints */}
              <div className="rounded-2xl bg-slate-800/90 backdrop-blur-sm p-5 shadow-md">
                <HintPanel
                  hints={currentProblem.hints}
                  isChallenge={level.isChallenge}
                  onRevealHint={actions.handleRevealHint}
                />
              </div>

              {/* Stats */}
              <div className="rounded-2xl bg-slate-800/60 backdrop-blur-sm p-4">
                <div className="flex gap-6 text-sm justify-center">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Attempts</p>
                    <p className="font-bold text-foreground text-lg">{state.attempts}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Hints Used</p>
                    <p className="font-bold text-foreground text-lg">{state.hintsUsed}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Adaptive Re-teach Modal */}
      {isAdaptiveReteach && (
        <AdaptiveReteachModal
          onAccept={actions.acceptReteaching}
          onDecline={actions.declineReteaching}
        />
      )}

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
    </WorldThemeProvider>
  );
}
