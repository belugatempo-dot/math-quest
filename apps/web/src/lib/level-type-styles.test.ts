import { describe, it, expect } from 'vitest';
import { getLevelTypeInfo } from './level-type-styles';

describe('getLevelTypeInfo', () => {
  it('returns correct info for teaching type', () => {
    const info = getLevelTypeInfo('teaching');
    expect(info.label).toBe('Learn');
    expect(info.badgeClasses).toBe('bg-blue-900/40 text-blue-300');
    expect(info.badgeSolidClasses).toBe('bg-blue-500');
    expect(info.cardClasses).toBe('border-blue-700/50 bg-blue-900/30');
    expect(info.labelColor).toBe('text-blue-400');
  });

  it('returns correct info for practice type', () => {
    const info = getLevelTypeInfo('practice');
    expect(info.label).toBe('Practice');
    expect(info.badgeClasses).toBe('bg-green-900/40 text-green-300');
    expect(info.cardClasses).toBe('border-green-700/50 bg-green-900/30');
  });

  it('returns correct info for challenge type', () => {
    const info = getLevelTypeInfo('challenge');
    expect(info.label).toBe('Challenge');
    expect(info.badgeClasses).toBe('bg-amber-900/40 text-amber-300');
  });

  it('returns correct info for boss type', () => {
    const info = getLevelTypeInfo('boss');
    expect(info.label).toBe('Boss');
    expect(info.badgeClasses).toBe('bg-purple-900/40 text-purple-300');
  });

  it('returns default info for unknown type', () => {
    const info = getLevelTypeInfo('unknown');
    expect(info.label).toBe('Level');
    expect(info.badgeClasses).toBe('bg-slate-700 text-slate-300');
    expect(info.badgeSolidClasses).toBe('bg-slate-500');
    expect(info.cardClasses).toBe('border-slate-700 bg-slate-800');
    expect(info.labelColor).toBe('text-slate-400');
  });

  it('returns non-empty strings for all fields of all known types', () => {
    for (const type of ['teaching', 'practice', 'challenge', 'boss']) {
      const info = getLevelTypeInfo(type);
      expect(info.label).toBeTruthy();
      expect(info.badgeClasses).toBeTruthy();
      expect(info.badgeSolidClasses).toBeTruthy();
      expect(info.cardClasses).toBeTruthy();
      expect(info.labelColor).toBeTruthy();
    }
  });
});
