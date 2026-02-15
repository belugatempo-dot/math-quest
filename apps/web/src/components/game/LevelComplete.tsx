'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import StarDisplay from './StarDisplay';
import Confetti from '@/components/effects/Confetti';
import CharacterMessage from '@/components/characters/CharacterMessage';

interface LevelCompleteProps {
  levelName: string;
  stars: number;
  attempts: number;
  hintsUsed: number;
  teachingPoint?: string;
  nextLevelId?: string;
  chapterId: string;
}

export default function LevelComplete({
  levelName,
  stars,
  attempts,
  hintsUsed,
  teachingPoint,
  nextLevelId,
  chapterId,
}: LevelCompleteProps) {
  const getMessage = () => {
    if (stars === 3) return 'Perfect! ';
    if (stars === 2) return 'Great job! ';
    if (stars === 1) return 'You did it! ';
    return 'Level Complete ';
  };

  const getGroggMessage = () => {
    if (stars === 3) return 'Amazing work! You nailed every problem!';
    if (stars === 2) return 'Really well done! You\'re getting stronger!';
    if (stars === 1) return 'You made it through! Keep practicing to earn more stars!';
    return 'Don\'t give up! Try again to earn some stars!';
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      {stars >= 2 && <Confetti />}
      <div className="max-w-md w-full text-center animate-bounce-in rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
        <div className="mb-4">
          <div className="text-4xl mb-2">{getMessage()}</div>
          <h2 className="text-xl font-bold text-foreground">{levelName}</h2>
        </div>

        <div className="flex justify-center mb-6">
          <StarDisplay stars={stars} size="lg" animated />
        </div>

        {/* Character congratulation */}
        <div className="mb-6">
          <CharacterMessage
            characterId="grogg"
            expression={stars >= 2 ? 'happy' : 'encouraging'}
            variant="feedback"
            size="sm"
          >
            <p>{getGroggMessage()}</p>
          </CharacterMessage>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/15 to-blue-500/10 border border-blue-400/30">
            <p className="text-white/60 text-xs font-medium">Attempts</p>
            <p className="text-2xl font-bold text-foreground">{attempts}</p>
          </div>
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/15 to-purple-500/10 border border-purple-400/30">
            <p className="text-white/60 text-xs font-medium">Hints Used</p>
            <p className="text-2xl font-bold text-foreground">{hintsUsed}</p>
          </div>
        </div>

        {teachingPoint && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl text-left">
            <p className="text-sm font-bold text-green-200">Remember:</p>
            <p className="mt-1 text-green-300">{teachingPoint}</p>
          </div>
        )}

        <div className="space-y-2">
          {nextLevelId ? (
            <Link href={`/play/${nextLevelId}`} className="block">
              <Button variant="game" size="lg" className="w-full text-lg animate-glow-pulse">
                Next Level →
              </Button>
            </Link>
          ) : (
            <Link href={`/chapter/${chapterId}`} className="block">
              <Button
                variant="game-success"
                size="lg"
                className="w-full text-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-shimmer bg-[length:200%_auto]"
              >
                Chapter Complete!
              </Button>
            </Link>
          )}
          <Link href={`/chapter/${chapterId}`} className="block">
            <Button variant="ghost" size="md" className="w-full">
              Back to Chapter
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
