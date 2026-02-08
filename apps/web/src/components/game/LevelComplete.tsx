'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StarDisplay from './StarDisplay';

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
        <div className="mb-4">
          <div className="text-4xl mb-2">{getMessage()}</div>
          <h2 className="text-xl font-bold text-foreground">{levelName}</h2>
        </div>

        <div className="flex justify-center mb-6">
          <StarDisplay stars={stars} size="lg" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Attempts</p>
            <p className="text-xl font-bold text-foreground">{attempts}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Hints Used</p>
            <p className="text-xl font-bold text-foreground">{hintsUsed}</p>
          </div>
        </div>

        {teachingPoint && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-left">
            <p className="text-sm font-medium text-green-800">Remember:</p>
            <p className="mt-1 text-green-700">{teachingPoint}</p>
          </div>
        )}

        <div className="space-y-2">
          {nextLevelId ? (
            <Link href={`/play/${nextLevelId}`} className="block">
              <Button variant="primary" size="lg" className="w-full">
                Next Level →
              </Button>
            </Link>
          ) : (
            <Link href={`/chapter/${chapterId}`} className="block">
              <Button variant="success" size="lg" className="w-full">
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
      </Card>
    </div>
  );
}
