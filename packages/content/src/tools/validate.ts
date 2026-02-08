#!/usr/bin/env tsx
/**
 * CLI script to validate curriculum JSON files
 */

import { readFileSync } from 'fs';
import { validateWorld } from './validator';
import { detectAntiPatterns } from './antiPatternDetector';

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: validate <world-json-file>');
    process.exit(1);
  }

  const filePath = args[0];

  try {
    const content = readFileSync(filePath, 'utf-8');
    const world = JSON.parse(content);

    console.log(`Validating ${filePath}...\n`);

    // Schema validation
    const validationResult = validateWorld(world);

    if (!validationResult.isValid) {
      console.error('Schema validation FAILED:');
      validationResult.errors.forEach(e => {
        console.error(`  - ${e.path}: ${e.message}`);
      });
    } else {
      console.log('Schema validation PASSED');
    }

    // Anti-pattern detection
    const antiPatternReport = detectAntiPatterns(world);

    if (antiPatternReport.totalIssues > 0) {
      console.log(`\nAnti-pattern detection found ${antiPatternReport.totalIssues} issues:`);
      antiPatternReport.issues.forEach(issue => {
        const severity = issue.severity === 'error' ? 'ERROR' : 'WARNING';
        console.log(`  [${severity}] ${issue.type}: ${issue.text}`);
        if (issue.suggestion) {
          console.log(`    Suggestion: ${issue.suggestion}`);
        }
      });
    } else {
      console.log('\nAnti-pattern detection: No issues found');
    }

    // Summary
    const hasErrors =
      !validationResult.isValid ||
      antiPatternReport.issues.some(i => i.severity === 'error');

    if (hasErrors) {
      console.log('\n❌ Validation FAILED');
      process.exit(1);
    } else {
      console.log('\n✅ Validation PASSED');
      process.exit(0);
    }
  } catch (error) {
    console.error(`Error reading or parsing file: ${error}`);
    process.exit(1);
  }
}

main();
