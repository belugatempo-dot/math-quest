'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { allWorlds, getAllLevels, getChapter } from '@/lib/world-data';
import Card from '@/components/ui/Card';
import { getLevelTypeInfo } from '@/lib/level-type-styles';

type FilterType = 'all' | 'teaching' | 'practice' | 'challenge' | 'boss';

export default function AdminPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [selectedWorldId, setSelectedWorldId] = useState<string>('all');

  const allLevels = useMemo(
    () => selectedWorldId === 'all' ? getAllLevels() : getAllLevels(selectedWorldId),
    [selectedWorldId]
  );

  const filteredLevels = useMemo(() => {
    return allLevels.filter((level) => {
      const matchesFilter = filter === 'all' || level.type === filter;
      const matchesSearch =
        search === '' ||
        level.name.toLowerCase().includes(search.toLowerCase()) ||
        level.id.toLowerCase().includes(search.toLowerCase()) ||
        level.problems.some((p) =>
          p.statement.toLowerCase().includes(search.toLowerCase())
        );
      return matchesFilter && matchesSearch;
    });
  }, [allLevels, filter, search]);

  const stats = useMemo(() => {
    const byType: Record<string, number> = {};
    const byChapter: Record<string, number> = {};
    let totalProblems = 0;
    let problemsWithHints = 0;
    let problemsWithTeachingPoints = 0;

    for (const level of allLevels) {
      byType[level.type] = (byType[level.type] || 0) + 1;
      byChapter[level.chapterId] = (byChapter[level.chapterId] || 0) + 1;

      for (const problem of level.problems) {
        totalProblems++;
        if (problem.hints && problem.hints.length > 0) problemsWithHints++;
        if (problem.teachingPoint && problem.teachingPoint.length > 10)
          problemsWithTeachingPoints++;
      }
    }

    return { byType, byChapter, totalProblems, problemsWithHints, problemsWithTeachingPoints };
  }, [allLevels]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg text-white border-b border-white/15">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Content Preview</h1>
              <p className="text-white/60">
                Browse and inspect all {allLevels.length} levels
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-white/15 text-white/80 hover:bg-white/20 rounded-lg transition-colors"
            >
              ← Back to App
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <div className="text-3xl font-bold text-primary">{allLevels.length}</div>
            <div className="text-sm text-white/60">Total Levels</div>
          </Card>
          <Card>
            <div className="text-3xl font-bold text-secondary">{stats.totalProblems}</div>
            <div className="text-sm text-white/60">Total Problems</div>
          </Card>
          <Card>
            <div className="text-3xl font-bold text-success">
              {stats.totalProblems > 0
                ? Math.round((stats.problemsWithHints / stats.totalProblems) * 100)
                : 0}%
            </div>
            <div className="text-sm text-white/60">Have Hints</div>
          </Card>
          <Card>
            <div className="text-3xl font-bold text-accent">
              {stats.totalProblems > 0
                ? Math.round((stats.problemsWithTeachingPoints / stats.totalProblems) * 100)
                : 0}%
            </div>
            <div className="text-sm text-white/60">Have Teaching Points</div>
          </Card>
        </div>

        {/* Level Type Distribution */}
        <Card className="mb-8">
          <h2 className="font-bold text-lg mb-4">Levels by Type</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(stats.byType).map(([type, count]) => (
              <div key={type} className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getLevelTypeInfo(type).badgeClasses}`}
                >
                  {type}
                </span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <label htmlFor="level-search" className="sr-only">Search levels</label>
          <input
            id="level-search"
            type="text"
            placeholder="Search levels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-white/25 rounded-lg bg-white/10 text-foreground focus:border-primary focus:outline-none"
          />

          <div className="flex gap-2">
            <label htmlFor="world-filter" className="sr-only">Filter by world</label>
            <select
              id="world-filter"
              value={selectedWorldId}
              onChange={(e) => setSelectedWorldId(e.target.value)}
              className="px-3 py-2 border border-white/25 rounded-lg bg-white/10 text-foreground text-sm focus:border-primary focus:outline-none"
            >
              <option value="all">All Worlds</option>
              {allWorlds.map((world) => (
                <option key={world.id} value={world.id}>{world.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            {(['all', 'teaching', 'practice', 'challenge', 'boss'] as FilterType[]).map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === type
                      ? 'bg-primary text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/15'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Level List */}
        <div className="space-y-2">
          {filteredLevels.map((level) => {
            const chapter = getChapter(level.chapterId);
            return (
              <Link
                key={level.id}
                href={`/admin/level/${level.id}`}
                className="block"
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-white/50">{level.id}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${getLevelTypeInfo(level.type).badgeClasses}`}
                        >
                          {level.type}
                        </span>
                        {level.isChallenge && (
                          <span className="text-amber-500" aria-hidden="true">⭐</span>
                        )}
                      </div>
                      <h3 className="font-medium text-foreground">{level.name}</h3>
                      <p className="text-sm text-white/60">
                        {chapter?.name} • {level.problems.length} problem(s)
                      </p>
                    </div>
                    <div className="text-white/50">→</div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredLevels.length === 0 && (
          <div className="text-center py-12 text-white/60">
            No levels match your search criteria
          </div>
        )}
      </main>
    </div>
  );
}
