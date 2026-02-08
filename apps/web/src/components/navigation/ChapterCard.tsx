'use client';

import Link from 'next/link';
import type { Chapter } from '@mathquest/shared';
import Card from '@/components/ui/Card';
import StarDisplay from '@/components/game/StarDisplay';

interface ChapterCardProps {
  chapter: Chapter;
  totalStars: number;
  completedLevels: number;
}

export default function ChapterCard({
  chapter,
  totalStars,
  completedLevels,
}: ChapterCardProps) {
  const maxStars = chapter.levels.length * 3;
  const totalLevels = chapter.levels.length;
  const progress = (completedLevels / totalLevels) * 100;

  return (
    <Link href={`/chapter/${chapter.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-sm font-medium text-primary">
              Chapter {chapter.number}
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {chapter.name}
            </h3>
          </div>
          <div className="text-right">
            <StarDisplay stars={Math.min(3, Math.floor(totalStars / 3))} size="sm" />
            <div className="text-xs text-gray-500 mt-1">
              {totalStars}/{maxStars}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          {chapter.learningObjectives.slice(0, 2).join(', ')}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium">
              {completedLevels}/{totalLevels} levels
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-400">
          Weeks {chapter.weekStart}-{chapter.weekEnd}
        </div>
      </Card>
    </Link>
  );
}
