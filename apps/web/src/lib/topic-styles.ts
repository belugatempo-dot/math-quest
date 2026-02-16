const TOPIC_EMOJI_MAP: Record<string, string> = {
  // World 3 topics
  'triangles': '📐',
  'skip-counting': '🔢',
  'perimeter': '📏',
  'multiplication facts': '✖️',
  'perfect squares': '🔲',
  'order of operations': '🧮',
  'variables': '🔤',
  'division': '➗',
  'units of measurement': '⚖️',
  'unit fractions': '🍕',
  'estimation': '🎯',
  'area measurement': '⬜',
  // World 4 topics
  'angles': '📐',
  'multiplication': '✖️',
  'exponents': '🚀',
  'counting': '🔢',
  'logic': '🧩',
  'primes': '💎',
  'fractions': '🍕',
  'integers': '🔣',
  'fraction-operations': '🍰',
  'decimals': '🔸',
  'probability': '🎲',
};

const DEFAULT_EMOJI = '📘';

export function getTopicEmoji(topic: string): string {
  return TOPIC_EMOJI_MAP[topic] ?? DEFAULT_EMOJI;
}
