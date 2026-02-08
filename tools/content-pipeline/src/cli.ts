#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { parseWorldMarkdown, ParseResult } from '@mathquest/content';
import { detectAntiPatterns, detectMarkdownAntiPatterns, AntiPatternReport } from '@mathquest/content';
import type { World } from '@mathquest/shared';

const program = new Command();

program
  .name('mathquest-content')
  .description('MathQuest content pipeline CLI')
  .version('0.1.0');

program
  .command('parse')
  .description('Parse curriculum markdown files into JSON')
  .argument('<input>', 'Input markdown file path')
  .option('-o, --output <path>', 'Output JSON file path')
  .option('--world <id>', 'World ID (e.g., world-3)', 'world-3')
  .option('--pretty', 'Pretty print JSON output', true)
  .option('--validate', 'Run anti-pattern detection after parsing', true)
  .action(async (input: string, options: { output?: string; world: string; pretty: boolean; validate: boolean }) => {
    console.log(`\n📚 Parsing ${input}...\n`);

    // Read input file
    const inputPath = path.resolve(input);
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ Error: File not found: ${inputPath}`);
      process.exit(1);
    }

    const content = fs.readFileSync(inputPath, 'utf-8');

    // Run initial markdown anti-pattern detection
    console.log('🔍 Scanning for anti-patterns in markdown...');
    const markdownIssues = detectMarkdownAntiPatterns(content);
    if (markdownIssues.length > 0) {
      console.log(`\n⚠️  Found ${markdownIssues.length} anti-patterns in raw markdown:\n`);
      markdownIssues.forEach((issue, i) => {
        console.log(`   ${i + 1}. [${issue.severity.toUpperCase()}] ${issue.text}`);
        if (issue.suggestion) {
          console.log(`      💡 ${issue.suggestion}`);
        }
      });
      console.log('');
    }

    // Parse the markdown
    console.log('📖 Parsing world structure...');
    const result: ParseResult = await parseWorldMarkdown(content, options.world);

    // Report parsing results
    const world = result.world;
    const chapters = world.chapters || [];
    const totalLevels = chapters.reduce((sum, ch) => sum + (ch.levels?.length || 0), 0);
    const totalProblems = chapters.reduce((sum, ch) =>
      sum + ch.levels.reduce((lsum, l) => lsum + (l.problems?.length || 0), 0), 0);

    console.log(`\n✅ Parsed successfully:`);
    console.log(`   📌 World: ${world.name} (${world.id})`);
    console.log(`   📚 Chapters: ${chapters.length}`);
    console.log(`   🎮 Levels: ${totalLevels}`);
    console.log(`   ❓ Problems: ${totalProblems}`);

    // Report errors
    if (result.errors.length > 0) {
      console.log(`\n❌ Parse Errors (${result.errors.length}):`);
      result.errors.forEach((err, i) => {
        console.log(`   ${i + 1}. ${err.message}`);
        if (err.line) console.log(`      Line: ${err.line}`);
        if (err.context) console.log(`      Context: ${err.context}`);
      });
    }

    // Report warnings
    if (result.warnings.length > 0) {
      console.log(`\n⚠️  Content Warnings (${result.warnings.length}):`);
      result.warnings.forEach((warn, i) => {
        console.log(`   ${i + 1}. [${warn.type}] ${warn.message}`);
        if (warn.levelId) console.log(`      Level: ${warn.levelId}`);
        if (warn.problemId) console.log(`      Problem: ${warn.problemId}`);
      });
    }

    // Run anti-pattern detection on parsed content
    if (options.validate && world.chapters && world.chapters.length > 0) {
      console.log('\n🔎 Running anti-pattern detection on parsed content...');
      const report = detectAntiPatterns(world as World);

      if (report.totalIssues > 0) {
        console.log(`\n⚠️  Anti-Pattern Issues (${report.totalIssues}):`);

        const errorCount = report.issues.filter(i => i.severity === 'error').length;
        const warningCount = report.issues.filter(i => i.severity === 'warning').length;
        console.log(`   🔴 Errors: ${errorCount}`);
        console.log(`   🟡 Warnings: ${warningCount}`);

        report.issues.slice(0, 20).forEach((issue, i) => {
          const icon = issue.severity === 'error' ? '🔴' : '🟡';
          console.log(`\n   ${icon} ${issue.type} (${issue.location})`);
          console.log(`      ${issue.text}`);
          if (issue.levelId) console.log(`      Level: ${issue.levelId}`);
          if (issue.suggestion) console.log(`      💡 ${issue.suggestion}`);
        });

        if (report.issues.length > 20) {
          console.log(`\n   ... and ${report.issues.length - 20} more issues`);
        }
      } else {
        console.log('   ✅ No anti-patterns detected!');
      }
    }

    // Write output
    const outputPath = options.output || input.replace(/\.md$/, '.json');
    const jsonContent = options.pretty
      ? JSON.stringify(world, null, 2)
      : JSON.stringify(world);

    fs.writeFileSync(outputPath, jsonContent, 'utf-8');
    console.log(`\n💾 Output written to: ${outputPath}`);

    // Summary
    console.log('\n' + '─'.repeat(50));
    console.log('📊 Summary:');
    console.log(`   Total Levels: ${totalLevels}`);
    console.log(`   Total Problems: ${totalProblems}`);
    console.log(`   Parse Errors: ${result.errors.length}`);
    console.log(`   Warnings: ${result.warnings.length}`);
    console.log(`   Anti-patterns: ${markdownIssues.length}`);
    console.log('─'.repeat(50) + '\n');

    // Exit with error if there are critical issues
    if (result.errors.length > 0) {
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate curriculum JSON files')
  .argument('<input>', 'Input JSON file path')
  .option('--strict', 'Enable strict validation', false)
  .action(async (input: string, options: { strict: boolean }) => {
    console.log(`\n🔍 Validating ${input}...\n`);

    const inputPath = path.resolve(input);
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ Error: File not found: ${inputPath}`);
      process.exit(1);
    }

    const content = fs.readFileSync(inputPath, 'utf-8');
    let world: World;

    try {
      world = JSON.parse(content) as World;
    } catch (e) {
      console.error(`❌ Error: Invalid JSON in ${input}`);
      process.exit(1);
    }

    // Validate structure
    console.log('📋 Validating world structure...');

    const issues: string[] = [];

    if (!world.id) issues.push('Missing world ID');
    if (!world.name) issues.push('Missing world name');
    if (!world.chapters || world.chapters.length === 0) {
      issues.push('No chapters found');
    }

    // Validate chapters
    world.chapters?.forEach((chapter, ci) => {
      if (!chapter.id) issues.push(`Chapter ${ci + 1}: Missing ID`);
      if (!chapter.name) issues.push(`Chapter ${ci + 1}: Missing name`);
      if (!chapter.levels || chapter.levels.length === 0) {
        issues.push(`Chapter ${chapter.id || ci + 1}: No levels found`);
      }

      // Validate levels
      chapter.levels?.forEach((level, li) => {
        if (!level.id) issues.push(`Level ${li + 1} in ${chapter.id}: Missing ID`);
        if (!level.problems || level.problems.length === 0) {
          issues.push(`Level ${level.id || li + 1}: No problems found`);
        }

        // Validate problems
        level.problems?.forEach((problem, pi) => {
          if (!problem.id) issues.push(`Problem ${pi + 1} in ${level.id}: Missing ID`);
          if (!problem.statement) issues.push(`Problem ${problem.id}: Missing statement`);
          if (!problem.correctAnswer) issues.push(`Problem ${problem.id}: Missing answer`);

          // Strict validation
          if (options.strict) {
            if (!problem.hints || problem.hints.length < 3) {
              if (!level.isChallenge) {
                issues.push(`Problem ${problem.id}: Fewer than 3 hints (has ${problem.hints?.length || 0})`);
              }
            }
            if (!problem.teachingPoint) {
              issues.push(`Problem ${problem.id}: Missing teaching point`);
            }
          }
        });
      });
    });

    // Run anti-pattern detection
    console.log('🔎 Running anti-pattern detection...');
    const report = detectAntiPatterns(world);

    if (issues.length > 0) {
      console.log(`\n❌ Validation Issues (${issues.length}):`);
      issues.forEach((issue, i) => {
        console.log(`   ${i + 1}. ${issue}`);
      });
    }

    if (report.totalIssues > 0) {
      console.log(`\n⚠️  Anti-Pattern Issues (${report.totalIssues}):`);
      report.issues.forEach((issue, i) => {
        const icon = issue.severity === 'error' ? '🔴' : '🟡';
        console.log(`   ${i + 1}. ${icon} [${issue.type}] ${issue.text}`);
      });
    }

    // Summary
    const totalLevels = world.chapters?.reduce((sum, ch) => sum + (ch.levels?.length || 0), 0) || 0;
    const totalProblems = world.chapters?.reduce((sum, ch) =>
      sum + ch.levels?.reduce((lsum, l) => lsum + (l.problems?.length || 0), 0) || 0, 0) || 0;

    console.log('\n' + '─'.repeat(50));
    console.log('📊 Validation Summary:');
    console.log(`   World: ${world.name || 'Unknown'}`);
    console.log(`   Chapters: ${world.chapters?.length || 0}`);
    console.log(`   Levels: ${totalLevels}`);
    console.log(`   Problems: ${totalProblems}`);
    console.log(`   Structure Issues: ${issues.length}`);
    console.log(`   Anti-patterns: ${report.totalIssues}`);
    console.log('─'.repeat(50) + '\n');

    if (issues.length > 0 || (options.strict && report.issues.filter(i => i.severity === 'error').length > 0)) {
      process.exit(1);
    }

    console.log('✅ Validation passed!\n');
  });

program
  .command('detect-antipatterns')
  .description('Detect anti-patterns in curriculum content')
  .argument('<input>', 'Input markdown or JSON file path')
  .option('-o, --output <path>', 'Output report file path')
  .option('--format <format>', 'Output format (json, text)', 'text')
  .action(async (input: string, options: { output?: string; format: 'json' | 'text' }) => {
    console.log(`\n🔍 Detecting anti-patterns in ${input}...\n`);

    const inputPath = path.resolve(input);
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ Error: File not found: ${inputPath}`);
      process.exit(1);
    }

    const content = fs.readFileSync(inputPath, 'utf-8');
    const isMarkdown = input.endsWith('.md');

    let report: AntiPatternReport;

    if (isMarkdown) {
      // Detect in raw markdown
      const markdownIssues = detectMarkdownAntiPatterns(content);
      report = {
        totalIssues: markdownIssues.length,
        issues: markdownIssues,
      };

      // Also parse and check structured content
      const parseResult = await parseWorldMarkdown(content, 'world-3');
      if (parseResult.world.chapters && parseResult.world.chapters.length > 0) {
        const structuredReport = detectAntiPatterns(parseResult.world as World);
        report.totalIssues += structuredReport.totalIssues;
        report.issues.push(...structuredReport.issues);
      }
    } else {
      // Assume JSON
      try {
        const world = JSON.parse(content) as World;
        report = detectAntiPatterns(world);
      } catch (e) {
        console.error(`❌ Error: Invalid JSON in ${input}`);
        process.exit(1);
      }
    }

    // Output report
    if (options.format === 'json') {
      const output = JSON.stringify(report, null, 2);
      if (options.output) {
        fs.writeFileSync(options.output, output, 'utf-8');
        console.log(`📄 Report written to: ${options.output}`);
      } else {
        console.log(output);
      }
    } else {
      // Text format
      console.log('═'.repeat(50));
      console.log('ANTI-PATTERN DETECTION REPORT');
      console.log('═'.repeat(50));
      console.log(`\nTotal Issues: ${report.totalIssues}`);
      console.log(`  🔴 Errors: ${report.issues.filter(i => i.severity === 'error').length}`);
      console.log(`  🟡 Warnings: ${report.issues.filter(i => i.severity === 'warning').length}`);

      if (report.totalIssues > 0) {
        // Group by type
        const byType = new Map<string, typeof report.issues>();
        report.issues.forEach(issue => {
          const existing = byType.get(issue.type) || [];
          existing.push(issue);
          byType.set(issue.type, existing);
        });

        console.log('\n─'.repeat(50));
        console.log('ISSUES BY TYPE:');
        console.log('─'.repeat(50));

        byType.forEach((issues, type) => {
          console.log(`\n📌 ${type.toUpperCase().replace(/_/g, ' ')} (${issues.length})`);
          issues.forEach((issue, i) => {
            const icon = issue.severity === 'error' ? '🔴' : '🟡';
            console.log(`\n   ${i + 1}. ${icon} ${issue.text}`);
            if (issue.levelId) console.log(`      Level: ${issue.levelId}`);
            if (issue.problemId) console.log(`      Problem: ${issue.problemId}`);
            if (issue.location) console.log(`      Location: ${issue.location}`);
            if (issue.suggestion) console.log(`      💡 Suggestion: ${issue.suggestion}`);
          });
        });
      }

      console.log('\n' + '═'.repeat(50) + '\n');

      if (options.output) {
        // Write text report to file
        let textReport = `ANTI-PATTERN DETECTION REPORT\n`;
        textReport += `${'='.repeat(50)}\n\n`;
        textReport += `Total Issues: ${report.totalIssues}\n`;
        textReport += `Errors: ${report.issues.filter(i => i.severity === 'error').length}\n`;
        textReport += `Warnings: ${report.issues.filter(i => i.severity === 'warning').length}\n\n`;

        report.issues.forEach((issue, i) => {
          textReport += `${i + 1}. [${issue.severity.toUpperCase()}] ${issue.type}\n`;
          textReport += `   ${issue.text}\n`;
          if (issue.levelId) textReport += `   Level: ${issue.levelId}\n`;
          if (issue.suggestion) textReport += `   Suggestion: ${issue.suggestion}\n`;
          textReport += '\n';
        });

        fs.writeFileSync(options.output, textReport, 'utf-8');
        console.log(`📄 Report written to: ${options.output}`);
      }
    }

    // Exit with error if there are critical issues
    const errorCount = report.issues.filter(i => i.severity === 'error').length;
    if (errorCount > 0) {
      console.log(`\n❌ Found ${errorCount} error(s). Please review and fix.\n`);
      process.exit(1);
    }
  });

program
  .command('stats')
  .description('Show statistics about curriculum content')
  .argument('<input>', 'Input markdown or JSON file path')
  .action(async (input: string) => {
    console.log(`\n📊 Generating statistics for ${input}...\n`);

    const inputPath = path.resolve(input);
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ Error: File not found: ${inputPath}`);
      process.exit(1);
    }

    const content = fs.readFileSync(inputPath, 'utf-8');
    const isMarkdown = input.endsWith('.md');

    let world: Partial<World>;

    if (isMarkdown) {
      const result = await parseWorldMarkdown(content, 'world-3');
      world = result.world;
    } else {
      world = JSON.parse(content) as World;
    }

    const chapters = world.chapters || [];

    // Calculate statistics
    const stats = {
      worldName: world.name || 'Unknown',
      totalChapters: chapters.length,
      totalLevels: 0,
      totalProblems: 0,
      levelsByType: new Map<string, number>(),
      problemsByType: new Map<string, number>(),
      challengeLevels: 0,
      teachingLevels: 0,
      practiceLevels: 0,
      hintsTotal: 0,
      problemsWithHints: 0,
      problemsWithoutHints: 0,
      avgHintsPerProblem: 0,
    };

    chapters.forEach(chapter => {
      chapter.levels?.forEach(level => {
        stats.totalLevels++;

        const levelType = level.type || 'standard';
        stats.levelsByType.set(levelType, (stats.levelsByType.get(levelType) || 0) + 1);

        if (level.isChallenge) stats.challengeLevels++;
        if (levelType === 'teaching') stats.teachingLevels++;
        if (levelType === 'practice') stats.practiceLevels++;

        level.problems?.forEach(problem => {
          stats.totalProblems++;

          const problemType = problem.type || 'unknown';
          stats.problemsByType.set(problemType, (stats.problemsByType.get(problemType) || 0) + 1);

          const hintCount = problem.hints?.length || 0;
          stats.hintsTotal += hintCount;
          if (hintCount > 0) {
            stats.problemsWithHints++;
          } else {
            stats.problemsWithoutHints++;
          }
        });
      });
    });

    stats.avgHintsPerProblem = stats.totalProblems > 0
      ? Math.round((stats.hintsTotal / stats.totalProblems) * 10) / 10
      : 0;

    // Display statistics
    console.log('═'.repeat(50));
    console.log(`CURRICULUM STATISTICS: ${stats.worldName}`);
    console.log('═'.repeat(50));

    console.log('\n📚 OVERVIEW');
    console.log(`   Chapters: ${stats.totalChapters}`);
    console.log(`   Levels: ${stats.totalLevels}`);
    console.log(`   Problems: ${stats.totalProblems}`);

    console.log('\n🎮 LEVELS BY TYPE');
    stats.levelsByType.forEach((count, type) => {
      const pct = Math.round((count / stats.totalLevels) * 100);
      console.log(`   ${type}: ${count} (${pct}%)`);
    });

    console.log('\n❓ PROBLEMS BY TYPE');
    stats.problemsByType.forEach((count, type) => {
      const pct = Math.round((count / stats.totalProblems) * 100);
      console.log(`   ${type}: ${count} (${pct}%)`);
    });

    console.log('\n💡 HINTS');
    console.log(`   Total hints: ${stats.hintsTotal}`);
    console.log(`   Problems with hints: ${stats.problemsWithHints}`);
    console.log(`   Problems without hints: ${stats.problemsWithoutHints}`);
    console.log(`   Average hints/problem: ${stats.avgHintsPerProblem}`);

    console.log('\n' + '═'.repeat(50) + '\n');
  });

program.parse();
