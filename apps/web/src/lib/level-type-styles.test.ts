import { describe, it, expect } from 'vitest';
import { getLevelTypeInfo } from './level-type-styles';

describe('getLevelTypeInfo', () => {
  it('returns correct info for teaching type', () => {
    const info = getLevelTypeInfo('teaching');
    expect(info.label).toBe('Learn');
    expect(info.badgeClasses).toBe('bg-blue-100 text-blue-700');
    expect(info.badgeSolidClasses).toBe('bg-blue-500');
    expect(info.cardClasses).toBe('border-blue-200 bg-blue-50');
    expect(info.labelColor).toBe('text-blue-600');
  });

  it('returns correct info for practice type', () => {
    const info = getLevelTypeInfo('practice');
    expect(info.label).toBe('Practice');
    expect(info.badgeClasses).toBe('bg-green-100 text-green-700');
    expect(info.cardClasses).toBe('border-green-200 bg-green-50');
  });

  it('returns correct info for challenge type', () => {
    const info = getLevelTypeInfo('challenge');
    expect(info.label).toBe('Challenge');
    expect(info.badgeClasses).toBe('bg-amber-100 text-amber-700');
  });

  it('returns correct info for boss type', () => {
    const info = getLevelTypeInfo('boss');
    expect(info.label).toBe('Boss');
    expect(info.badgeClasses).toBe('bg-purple-100 text-purple-700');
  });

  it('returns default info for unknown type', () => {
    const info = getLevelTypeInfo('unknown');
    expect(info.label).toBe('Level');
    expect(info.badgeClasses).toBe('bg-gray-100 text-gray-700');
    expect(info.badgeSolidClasses).toBe('bg-gray-500');
    expect(info.cardClasses).toBe('border-gray-200 bg-white');
    expect(info.labelColor).toBe('text-gray-600');
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
