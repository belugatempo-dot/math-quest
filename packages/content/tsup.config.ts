import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'tools/parser': 'src/tools/parser.ts',
    'tools/validator': 'src/tools/validator.ts',
    'tools/antiPatternDetector': 'src/tools/antiPatternDetector.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
