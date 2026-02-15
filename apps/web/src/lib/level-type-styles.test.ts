import { describe, it, expect } from 'vitest';
import { getLevelTypeInfo } from './level-type-styles';

describe('getLevelTypeInfo', () => {
  it('returns correct info for teaching type', () => {
    const info = getLevelTypeInfo('teaching');
    expect(info.label).toBe('Learn');
    expect(info.badgeClasses).toBe('bg-blue-500/20 text-blue-200');
    expect(info.badgeSolidClasses).toBe('bg-blue-500');
    expect(info.cardClasses).toBe('border-blue-400/30 bg-blue-500/15');
    expect(info.labelColor).toBe('text-blue-300');
  });

  it('returns correct info for practice type', () => {
    const info = getLevelTypeInfo('practice');
    expect(info.label).toBe('Practice');
    expect(info.badgeClasses).toBe('bg-green-500/20 text-green-200');
    expect(info.cardClasses).toBe('border-green-400/30 bg-green-500/15');
  });

  it('returns correct info for challenge type', () => {
    const info = getLevelTypeInfo('challenge');
    expect(info.label).toBe('Challenge');
    expect(info.badgeClasses).toBe('bg-amber-500/20 text-amber-200');
  });

  it('returns correct info for boss type', () => {
    const info = getLevelTypeInfo('boss');
    expect(info.label).toBe('Boss');
    expect(info.badgeClasses).toBe('bg-purple-500/20 text-purple-200');
  });

  it('returns default info for unknown type', () => {
    const info = getLevelTypeInfo('unknown');
    expect(info.label).toBe('Level');
    expect(info.badgeClasses).toBe('bg-white/15 text-white/70');
    expect(info.badgeSolidClasses).toBe('bg-slate-500');
    expect(info.cardClasses).toBe('border-white/20 bg-white/10');
    expect(info.labelColor).toBe('text-white/60');
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
