import { describe, it, expect } from 'vitest';
import { getTopicEmoji } from './topic-styles';

describe('getTopicEmoji', () => {
  describe('World 3 topics', () => {
    it.each([
      ['triangles', '📐'],
      ['skip-counting', '🔢'],
      ['perimeter', '📏'],
      ['multiplication facts', '✖️'],
      ['perfect squares', '🔲'],
      ['order of operations', '🧮'],
      ['variables', '🔤'],
      ['division', '➗'],
      ['units of measurement', '⚖️'],
      ['unit fractions', '🍕'],
      ['estimation', '🎯'],
      ['area measurement', '⬜'],
    ])('should return %s for topic "%s"', (topic, emoji) => {
      expect(getTopicEmoji(topic)).toBe(emoji);
    });
  });

  describe('World 4 topics', () => {
    it.each([
      ['angles', '📐'],
      ['multiplication', '✖️'],
      ['exponents', '🚀'],
      ['counting', '🔢'],
      ['logic', '🧩'],
      ['primes', '💎'],
      ['fractions', '🍕'],
      ['integers', '🔣'],
      ['fraction-operations', '🍰'],
      ['decimals', '🔸'],
      ['probability', '🎲'],
    ])('should return %s for topic "%s"', (topic, emoji) => {
      expect(getTopicEmoji(topic)).toBe(emoji);
    });
  });

  describe('fallback', () => {
    it('should return 📘 for unknown topics', () => {
      expect(getTopicEmoji('unknown-topic')).toBe('📘');
    });

    it('should return 📘 for empty string', () => {
      expect(getTopicEmoji('')).toBe('📘');
    });
  });
});
