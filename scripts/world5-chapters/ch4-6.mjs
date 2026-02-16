/**
 * World 5 Chapters 4-6: Statistics Strait, Factor Fjords, Fraction Falls
 * 40 levels, 120 problems
 */

// ── helpers ──────────────────────────────────────────────
function mc(value, display) { return { value, displayValue: display || value }; }
function num(value, display) { return { value: Number(value), displayValue: display || String(value) }; }
function txt(value, display) { return { value, displayValue: display || value }; }
function hint(tier, text, type) {
  const costs = { 1: 0, 2: 1, 3: 2 };
  return { tier, cost: costs[tier], text, type };
}
function problem(id, levelId, seq, opts) {
  return {
    id, levelId, sequence: seq,
    type: opts.type || 'numeric_input',
    category: opts.category || 'thinking',
    statement: opts.statement,
    inputType: opts.inputType || 'number_pad',
    correctAnswer: opts.answer,
    hints: opts.hints,
    solutionExplanation: opts.solution,
    teachingPoint: opts.teachingPoint,
    tags: opts.tags || [],
    difficulty: opts.difficulty || 2,
  };
}
function level(id, chapterId, number, name, type, diff, story, problems) {
  return {
    id, chapterId, worldId: 'world-5', number, name, type,
    storyContext: story, problems, difficulty: diff,
    estimatedMinutes: type === 'boss' ? 10 : type === 'challenge' ? 7 : type === 'practice' ? 5 : 4,
    isChallenge: type === 'challenge' || type === 'boss',
    isBoss: type === 'boss',
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHAPTER 4 — Statistics Strait
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function createChapter4() {
  const ch = 4, cid = `chapter-5-${ch}`;
  const levels = [
    // 1 — The Average Island (teaching, 1)
    level(`level-5-${ch}-1`, cid, 1, 'The Average Island', 'teaching', 1,
      'Prof. Owlbert arrives at Statistics Strait. "The mean — or average — is what each person would get if you shared everything equally."',
      [
        problem(`problem-5-${ch}-1-1`, `level-5-${ch}-1`, 1, {
          statement: 'Find the mean of 4, 8, and 6. (Mean = sum ÷ count)',
          answer: num(6, '(4+8+6) ÷ 3 = 18 ÷ 3 = 6'),
          hints: [
            hint(1, 'Add all the numbers, then divide by how many there are.', 'conceptual'),
            hint(2, 'Sum = 4 + 8 + 6 = 18. Count = 3.', 'directional'),
            hint(3, '18 ÷ 3 = 6.', 'scaffolded'),
          ],
          solution: 'Mean = (4+8+6)/3 = 18/3 = 6',
          teachingPoint: 'The mean (average) is the sum of all values divided by the count. It tells you the "fair share" if everything were split evenly.',
          tags: ['statistics', 'mean', 'average'], difficulty: 1,
        }),
        problem(`problem-5-${ch}-1-2`, `level-5-${ch}-1`, 2, {
          statement: 'Five friends scored 10, 8, 6, 9, and 7 on a quiz. What is the mean score?',
          answer: num(8, '(10+8+6+9+7) ÷ 5 = 40 ÷ 5 = 8'),
          hints: [
            hint(1, 'Add all five scores, then divide by 5.', 'conceptual'),
            hint(2, '10+8+6+9+7 = 40. Divide by 5.', 'directional'),
            hint(3, '40 ÷ 5 = 8.', 'scaffolded'),
          ],
          solution: 'Mean = 40/5 = 8',
          teachingPoint: 'If all five friends scored 8, the total would be the same (40). The mean "evens out" the differences.',
          tags: ['statistics', 'mean', 'quiz-scores'], difficulty: 1,
        }),
        problem(`problem-5-${ch}-1-3`, `level-5-${ch}-1`, 3, {
          statement: 'The mean of four numbers is 10. What is their sum?',
          answer: num(40, 'Sum = mean × count = 10 × 4 = 40'),
          hints: [
            hint(1, 'Mean = sum ÷ count. You can rearrange: sum = mean × count.', 'conceptual'),
            hint(2, 'Sum = 10 × 4.', 'directional'),
            hint(3, '10 × 4 = 40.', 'scaffolded'),
          ],
          solution: 'Sum = mean × count = 10 × 4 = 40',
          teachingPoint: 'Mean = sum/count, so sum = mean × count. If you know the average and how many values, you can find the total.',
          tags: ['statistics', 'mean', 'working-backwards'], difficulty: 1,
        }),
      ]
    ),

    // 2 — Mean Practice (practice, 2)
    level(`level-5-${ch}-2`, cid, 2, 'Mean Practice', 'practice', 2,
      'Grogg practices calculating means. "Sum divided by count — I can do this!"',
      [
        problem(`problem-5-${ch}-2-1`, `level-5-${ch}-2`, 1, {
          statement: 'Find the mean of 12, 18, 15, and 11.',
          answer: num(14, '(12+18+15+11) ÷ 4 = 56 ÷ 4 = 14'),
          hints: [
            hint(1, 'Add all four numbers, then divide by 4.', 'conceptual'),
            hint(2, '12 + 18 + 15 + 11 = 56.', 'directional'),
            hint(3, '56 ÷ 4 = 14.', 'scaffolded'),
          ],
          solution: '56 ÷ 4 = 14', teachingPoint: 'The mean of 12, 18, 15, 11 is 14. Notice it falls between the smallest and largest values.',
          tags: ['statistics', 'mean', 'practice'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-2-2`, `level-5-${ch}-2`, 2, {
          statement: 'A student scored 85, 90, 78, and 95 on four tests. What is the mean score?',
          answer: num(87, '(85+90+78+95)/4 = 348/4 = 87'),
          hints: [
            hint(1, 'Add the four test scores, divide by 4.', 'conceptual'),
            hint(2, '85 + 90 + 78 + 95 = 348.', 'directional'),
            hint(3, '348 ÷ 4 = 87.', 'scaffolded'),
          ],
          solution: '348 ÷ 4 = 87', teachingPoint: 'The mean score is 87. It is pulled down slightly by the lowest score (78) and up by the highest (95).',
          tags: ['statistics', 'mean', 'test-scores'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-2-3`, `level-5-${ch}-2`, 3, {
          statement: 'The mean of 5 numbers is 12. Four of the numbers are 10, 14, 11, and 15. What is the fifth number?',
          answer: num(10, 'Sum must be 60. 10+14+11+15=50. Fifth = 60-50 = 10'),
          hints: [
            hint(1, 'If the mean is 12 and there are 5 numbers, what must the total sum be?', 'conceptual'),
            hint(2, 'Sum = 12 × 5 = 60. The four known numbers sum to 50.', 'directional'),
            hint(3, 'Fifth number = 60 - 50 = 10.', 'scaffolded'),
          ],
          solution: 'Sum = 60, known sum = 50, fifth = 10',
          teachingPoint: 'To find a missing value given the mean: calculate the required sum (mean × count), then subtract the known values.',
          tags: ['statistics', 'mean', 'working-backwards'], difficulty: 2,
        }),
      ]
    ),

    // 3 — The Middle Value (teaching, 2)
    level(`level-5-${ch}-3`, cid, 3, 'The Middle Value', 'teaching', 2,
      'Lizzie explains: "The median is the middle value when you line up all the numbers in order."',
      [
        problem(`problem-5-${ch}-3-1`, `level-5-${ch}-3`, 1, {
          statement: 'Find the median of 3, 7, 5, 9, 1. (First put them in order!)',
          answer: num(5, 'Ordered: 1, 3, 5, 7, 9. Middle = 5'),
          hints: [
            hint(1, 'Sort the numbers from least to greatest first.', 'conceptual'),
            hint(2, 'Ordered: 1, 3, 5, 7, 9. The middle number is the third one.', 'directional'),
            hint(3, 'The median is 5 — it is in the exact middle of the sorted list.', 'scaffolded'),
          ],
          solution: 'Ordered: 1,3,5,7,9 → median = 5',
          teachingPoint: 'The median is the middle value after sorting. For an odd number of values, the median is the one in the center position.',
          tags: ['statistics', 'median', 'sorting'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-3-2`, `level-5-${ch}-3`, 2, {
          statement: 'Find the median of 4, 8, 2, 10. (Even number of values — average the two middle ones.)',
          answer: num(6, 'Ordered: 2, 4, 8, 10. Middle two: 4 and 8. (4+8)/2 = 6'),
          hints: [
            hint(1, 'Sort: 2, 4, 8, 10. With 4 numbers, there is no single middle — average the middle two.', 'conceptual'),
            hint(2, 'Middle two are 4 and 8. Average them.', 'directional'),
            hint(3, '(4 + 8) ÷ 2 = 6. The median is 6.', 'scaffolded'),
          ],
          solution: 'Ordered: 2,4,8,10. Median = (4+8)/2 = 6',
          teachingPoint: 'With an even number of values, the median is the average of the two middle values. Here: (4+8)/2 = 6.',
          tags: ['statistics', 'median', 'even-count'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-3-3`, `level-5-${ch}-3`, 3, {
          statement: 'Find the median of 15, 20, 10, 25, 30, 5, 35.',
          answer: num(20, 'Ordered: 5,10,15,20,25,30,35. Middle = 20'),
          hints: [
            hint(1, 'Sort the 7 numbers and find the 4th one (middle of 7).', 'conceptual'),
            hint(2, 'Ordered: 5, 10, 15, 20, 25, 30, 35. The 4th value is...', 'directional'),
            hint(3, 'The 4th value is 20. The median is 20.', 'scaffolded'),
          ],
          solution: 'Median = 20 (the 4th of 7 sorted values)',
          teachingPoint: 'For n values, the median is at position (n+1)/2. For 7 values: position 4. The median is 20.',
          tags: ['statistics', 'median', 'odd-count'], difficulty: 2,
        }),
      ]
    ),

    // 4 — Mode and Range (teaching, 2)
    level(`level-5-${ch}-4`, cid, 4, 'Mode and Range', 'teaching', 2,
      'Prof. Owlbert adds two more tools. "The mode is the most frequent value. The range shows how spread out the data is."',
      [
        problem(`problem-5-${ch}-4-1`, `level-5-${ch}-4`, 1, {
          statement: 'Find the mode of: 3, 5, 7, 5, 2, 5, 8. The mode is the value that appears most often.',
          answer: num(5, '5 appears 3 times, more than any other value'),
          hints: [
            hint(1, 'Count how many times each number appears.', 'conceptual'),
            hint(2, '3→1, 5→3, 7→1, 2→1, 8→1. Which appears most?', 'directional'),
            hint(3, '5 appears 3 times. The mode is 5.', 'scaffolded'),
          ],
          solution: 'Mode = 5 (appears 3 times)',
          teachingPoint: 'The mode is the value that occurs most frequently. A data set can have one mode, multiple modes, or no mode (if all values appear equally).',
          tags: ['statistics', 'mode'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-4-2`, `level-5-${ch}-4`, 2, {
          statement: 'Find the range of: 12, 5, 8, 20, 3. (Range = highest - lowest)',
          answer: num(17, '20 - 3 = 17'),
          hints: [
            hint(1, 'The range is the difference between the highest and lowest values.', 'conceptual'),
            hint(2, 'Highest = 20, lowest = 3.', 'directional'),
            hint(3, 'Range = 20 - 3 = 17.', 'scaffolded'),
          ],
          solution: 'Range = 20 - 3 = 17',
          teachingPoint: 'The range measures how spread out the data is. Range = maximum - minimum. A large range means the data is spread out.',
          tags: ['statistics', 'range'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-4-3`, `level-5-${ch}-4`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'Dataset: 4, 4, 7, 7, 7, 10. What is the mode? A) 4 B) 7 C) 10 D) No mode',
          answer: mc('B) 7', 'B — 7 appears 3 times, more than any other value'),
          hints: [
            hint(1, 'Count each value: how many 4s, 7s, and 10s?', 'conceptual'),
            hint(2, '4 appears twice, 7 appears three times, 10 appears once.', 'directional'),
            hint(3, '7 appears the most (3 times). Mode = 7.', 'scaffolded'),
          ],
          solution: 'Mode = 7 (appears 3 times)',
          teachingPoint: 'Even when multiple values repeat, the mode is the one that repeats the MOST. 7 appears 3 times, beating 4 (which appears twice).',
          tags: ['statistics', 'mode', 'frequency'], difficulty: 2,
        }),
      ]
    ),

    // 5 — Mean vs Median (practice, 3)
    level(`level-5-${ch}-5`, cid, 5, 'Mean vs Median', 'practice', 3,
      'Lizzie asks: "When the mean and median give different answers, which one should you use?"',
      [
        problem(`problem-5-${ch}-5-1`, `level-5-${ch}-5`, 1, {
          statement: 'Data: 2, 3, 4, 5, 36. What is the mean?',
          answer: num(10, '(2+3+4+5+36)/5 = 50/5 = 10'),
          hints: [
            hint(1, 'Add all values and divide by 5.', 'conceptual'),
            hint(2, '2+3+4+5+36 = 50.', 'directional'),
            hint(3, '50 ÷ 5 = 10.', 'scaffolded'),
          ],
          solution: 'Mean = 50/5 = 10',
          teachingPoint: 'The mean of 2,3,4,5,36 is 10. Notice that 10 is higher than 4 of the 5 values! The outlier 36 pulls the mean up.',
          tags: ['statistics', 'mean', 'outliers'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-5-2`, `level-5-${ch}-5`, 2, {
          statement: 'Data: 2, 3, 4, 5, 36. What is the median?',
          answer: num(4, 'Already sorted, middle value = 4'),
          hints: [
            hint(1, 'Data is already sorted. Find the middle value of 5 numbers.', 'conceptual'),
            hint(2, 'The 3rd value (middle of 5) is the median.', 'directional'),
            hint(3, 'Median = 4.', 'scaffolded'),
          ],
          solution: 'Median = 4 (3rd of 5 sorted values)',
          teachingPoint: 'The median (4) better represents this data than the mean (10) because the outlier 36 does not affect the median.',
          tags: ['statistics', 'median', 'outliers'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-5-3`, `level-5-${ch}-5`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'A set of salaries: $30K, $35K, $40K, $45K, $500K. Which measure best represents the "typical" salary? A) Mean B) Median',
          answer: mc('B) Median', 'B — The median ($40K) is typical; the mean ($130K) is skewed by the $500K outlier'),
          hints: [
            hint(1, 'The mean is pulled by extreme values. Is there an extreme value here?', 'conceptual'),
            hint(2, '$500K is much higher than the rest. It will inflate the mean.', 'directional'),
            hint(3, 'Median = $40K (typical). Mean ≈ $130K (inflated by the outlier). Median is more representative.', 'scaffolded'),
          ],
          solution: 'Median ($40K) — not affected by the $500K outlier.',
          teachingPoint: 'When data has outliers (extreme values), the median is more representative than the mean. The median resists the pull of outliers.',
          tags: ['statistics', 'mean-vs-median', 'outliers'], difficulty: 3,
        }),
      ]
    ),

    // 6 — Reading Bar Graphs (teaching, 2)
    level(`level-5-${ch}-6`, cid, 6, 'Reading Bar Graphs', 'teaching', 2,
      'Grogg finds a bar graph on a sign. "Each bar shows how many — taller bars mean more!"',
      [
        problem(`problem-5-${ch}-6-1`, `level-5-${ch}-6`, 1, {
          statement: 'A bar graph shows: Red=8, Blue=12, Green=6, Yellow=10. How many total items are there?',
          answer: num(36, '8+12+6+10 = 36'),
          hints: [
            hint(1, 'Add up all the bar values to find the total.', 'conceptual'),
            hint(2, '8 + 12 + 6 + 10 = ?', 'directional'),
            hint(3, '8 + 12 + 6 + 10 = 36 items total.', 'scaffolded'),
          ],
          solution: 'Total = 8+12+6+10 = 36',
          teachingPoint: 'To find the total from a bar graph, add up the values represented by each bar.',
          tags: ['statistics', 'bar-graphs', 'total'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-6-2`, `level-5-${ch}-6`, 2, {
          statement: 'In the same graph (Red=8, Blue=12, Green=6, Yellow=10), how many more items are Blue than Green?',
          answer: num(6, '12 - 6 = 6'),
          hints: [
            hint(1, 'Subtract the smaller from the larger to find the difference.', 'conceptual'),
            hint(2, 'Blue = 12, Green = 6. Difference = 12 - 6.', 'directional'),
            hint(3, '12 - 6 = 6 more blue items.', 'scaffolded'),
          ],
          solution: '12 - 6 = 6 more blue items',
          teachingPoint: 'To compare categories in a bar graph, subtract the smaller value from the larger.',
          tags: ['statistics', 'bar-graphs', 'comparison'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-6-3`, `level-5-${ch}-6`, 3, {
          statement: 'Red=8, Blue=12, Green=6, Yellow=10. What is the mean number of items per color?',
          answer: num(9, '36 ÷ 4 = 9'),
          hints: [
            hint(1, 'Mean = total ÷ number of categories.', 'conceptual'),
            hint(2, 'Total = 36, categories = 4.', 'directional'),
            hint(3, '36 ÷ 4 = 9 items per color on average.', 'scaffolded'),
          ],
          solution: 'Mean = 36/4 = 9',
          teachingPoint: 'You can compute statistics from graph data just like from a list of numbers. The mean is the total divided by the number of categories.',
          tags: ['statistics', 'bar-graphs', 'mean'], difficulty: 2,
        }),
      ]
    ),

    // 7 — Histograms and Line Plots (teaching, 3)
    level(`level-5-${ch}-7`, cid, 7, 'Histograms and Line Plots', 'teaching', 3,
      'Prof. Owlbert shows different types of graphs. "Histograms group data into ranges. Line plots show individual data points."',
      [
        problem(`problem-5-${ch}-7-1`, `level-5-${ch}-7`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'A histogram shows: 0-10: 5 students, 11-20: 12 students, 21-30: 3 students. How many students total? A) 17 B) 20 C) 15 D) 30',
          answer: mc('B) 20', 'B — 5 + 12 + 3 = 20 students'),
          hints: [
            hint(1, 'Add the frequencies from each bar/bin.', 'conceptual'),
            hint(2, '5 + 12 + 3 = ?', 'directional'),
            hint(3, '5 + 12 + 3 = 20 students total.', 'scaffolded'),
          ],
          solution: '5 + 12 + 3 = 20 students',
          teachingPoint: 'Histograms group data into bins (ranges). The height of each bar shows how many data points fall in that range.',
          tags: ['statistics', 'histograms', 'frequency'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-7-2`, `level-5-${ch}-7`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'Which is better for showing exact individual values: a histogram or a line plot? A) Histogram B) Line plot',
          answer: mc('B) Line plot', 'B — Line plots show each individual data point'),
          hints: [
            hint(1, 'Histograms group data into ranges. Line plots show each value.', 'conceptual'),
            hint(2, 'If you want to see exact values, you need individual points.', 'directional'),
            hint(3, 'Line plots show every individual value, while histograms group them. Line plots are better for exact values.', 'scaffolded'),
          ],
          solution: 'Line plots show individual data points.',
          teachingPoint: 'Line plots (dot plots) show each data point individually. Histograms group data into bins — you lose individual values but see the overall shape.',
          tags: ['statistics', 'line-plots', 'histograms', 'comparison'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-7-3`, `level-5-${ch}-7`, 3, {
          statement: 'A line plot shows test scores: 70 (2 dots), 80 (5 dots), 90 (3 dots). What is the total number of students?',
          answer: num(10, '2 + 5 + 3 = 10'),
          hints: [
            hint(1, 'Each dot represents one student. Count all dots.', 'conceptual'),
            hint(2, '2 + 5 + 3 = ?', 'directional'),
            hint(3, '2 + 5 + 3 = 10 students.', 'scaffolded'),
          ],
          solution: '2 + 5 + 3 = 10 students',
          teachingPoint: 'In a line plot, each dot represents one data point. The total number of data points is the sum of all dots.',
          tags: ['statistics', 'line-plots', 'counting'], difficulty: 3,
        }),
      ]
    ),

    // 8 — Choosing the Right Display (practice, 3)
    level(`level-5-${ch}-8`, cid, 8, 'Choosing the Right Display', 'practice', 3,
      'Lizzie has different datasets. "Not every graph works for every type of data. Let\'s match them!"',
      [
        problem(`problem-5-${ch}-8-1`, `level-5-${ch}-8`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'You want to show favorite ice cream flavors among 30 students. Best display? A) Line plot B) Bar graph C) Histogram D) Scatter plot',
          answer: mc('B) Bar graph', 'B — Bar graphs are best for comparing categories (flavors)'),
          hints: [
            hint(1, 'Ice cream flavors are categories, not numbers on a scale.', 'conceptual'),
            hint(2, 'For categorical data, you need a graph that shows counts per category.', 'directional'),
            hint(3, 'Bar graphs compare categories. Each flavor gets its own bar.', 'scaffolded'),
          ],
          solution: 'Bar graph — best for comparing categorical data.',
          teachingPoint: 'Bar graphs are ideal for categorical data (flavors, colors, types). Histograms are for numerical ranges.',
          tags: ['statistics', 'data-display', 'bar-graphs'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-8-2`, `level-5-${ch}-8`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'You want to show the distribution of 100 test scores (0-100). Best display? A) Bar graph B) Pie chart C) Histogram D) Line plot',
          answer: mc('C) Histogram', 'C — Histograms group numerical data into ranges, perfect for showing score distributions'),
          hints: [
            hint(1, 'Test scores are numerical. You want to see the shape of the distribution.', 'conceptual'),
            hint(2, 'With 100 different possible scores, individual bars would be too many. Grouping into ranges helps.', 'directional'),
            hint(3, 'Histograms group numerical data into bins (like 0-10, 11-20, etc.) showing the distribution shape.', 'scaffolded'),
          ],
          solution: 'Histogram — groups numerical data into bins.',
          teachingPoint: 'Histograms are perfect for showing how numerical data is distributed. They group values into bins and show the frequency of each bin.',
          tags: ['statistics', 'data-display', 'histograms'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-8-3`, `level-5-${ch}-8`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'You have 15 students\' exact heights. You want to see each individual value. Best display? A) Histogram B) Bar graph C) Line plot D) Pie chart',
          answer: mc('C) Line plot', 'C — Line plots (dot plots) show each individual data point'),
          hints: [
            hint(1, 'You want to see EACH individual value, not grouped data.', 'conceptual'),
            hint(2, 'With only 15 values, you can show each one as a dot.', 'directional'),
            hint(3, 'A line plot (dot plot) shows each data point individually on a number line.', 'scaffolded'),
          ],
          solution: 'Line plot — shows each individual value.',
          teachingPoint: 'Line plots (dot plots) are great for small datasets where you want to see every individual value. For large datasets, use histograms.',
          tags: ['statistics', 'data-display', 'line-plots'], difficulty: 3,
        }),
      ]
    ),

    // 9 — Misleading Statistics (challenge, 3)
    level(`level-5-${ch}-9`, cid, 9, 'Misleading Statistics', 'challenge', 3,
      'Admiral Axiom warns: "Not all statistics tell the truth. Some graphs and numbers are designed to mislead you!"',
      [
        problem(`problem-5-${ch}-9-1`, `level-5-${ch}-9`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'find_the_error',
          statement: 'A graph shows sales going from 100 to 110, but the y-axis starts at 95 instead of 0. This makes the increase look: A) Smaller than it really is B) Larger than it really is C) About right D) Impossible to tell',
          answer: mc('B) Larger than it really is', 'B — Starting the y-axis above zero exaggerates the visual difference between bars'),
          hints: [
            hint(1, 'When the y-axis doesn\'t start at zero, what happens to the visual comparison?', 'conceptual'),
            hint(2, 'The bar for 110 looks much taller than 100 when the axis starts at 95 vs starting at 0.', 'directional'),
            hint(3, 'A truncated y-axis makes a 10% increase look like a 200-300% increase visually. It exaggerates.', 'scaffolded'),
          ],
          solution: 'Truncated y-axis exaggerates differences.',
          teachingPoint: 'A y-axis that doesn\'t start at zero makes differences look bigger than they are. Always check the axis scale!',
          tags: ['statistics', 'misleading', 'truncated-axis'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-9-2`, `level-5-${ch}-9`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'find_the_error',
          statement: 'A company says "Customer satisfaction is at 95%!" but they only surveyed 20 of their most loyal customers. Is this misleading? A) No, 95% is clearly good B) Yes, the sample is biased',
          answer: mc('B) Yes, the sample is biased', 'B — Only surveying loyal customers creates a biased sample that overestimates satisfaction'),
          hints: [
            hint(1, 'Would loyal customers be more or less satisfied than average?', 'conceptual'),
            hint(2, 'A sample should represent ALL customers, not just the most loyal ones.', 'directional'),
            hint(3, 'Sampling only loyal customers gives artificially high results. The sample is biased.', 'scaffolded'),
          ],
          solution: 'Biased sample — only loyal customers surveyed.',
          teachingPoint: 'A biased sample does not represent the whole population. Survey results are only valid if the sample is randomly selected and representative.',
          tags: ['statistics', 'misleading', 'biased-sample'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-9-3`, `level-5-${ch}-9`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'find_the_error',
          statement: '"The average salary at XYZ Corp is $200,000!" If the CEO makes $5,000,000 and 49 employees make $100,000, is the mean misleading here? A) No, it is accurate B) Yes, the median would be better',
          answer: mc('B) Yes, the median would be better', 'B — One extreme salary pulls the mean far above what most employees earn'),
          hints: [
            hint(1, 'Is $200K representative of what most people at the company earn?', 'conceptual'),
            hint(2, 'The CEO salary is an extreme outlier that pulls the mean way up.', 'directional'),
            hint(3, 'Mean = ($5M + 49×$100K)/50 = $198K. But 49 of 50 earn $100K. Median = $100K is more representative.', 'scaffolded'),
          ],
          solution: 'Median ($100K) better represents typical salary than mean ($198K).',
          teachingPoint: 'When a dataset has extreme outliers, the mean can be misleading. The median gives a better picture of what is "typical."',
          tags: ['statistics', 'misleading', 'mean-vs-median'], difficulty: 3,
        }),
      ]
    ),

    // 10 — Surveys and Sampling (teaching, 3)
    level(`level-5-${ch}-10`, cid, 10, 'Surveys and Sampling', 'teaching', 3,
      'Prof. Owlbert explains: "To learn about a large group, we study a smaller sample. But the sample must be fair!"',
      [
        problem(`problem-5-${ch}-10-1`, `level-5-${ch}-10`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'To find out what music students at a school prefer, which sample is best? A) Ask the band class B) Ask every 5th student entering school C) Ask your friends D) Ask the teachers',
          answer: mc('B) Ask every 5th student entering school', 'B — Systematic sampling from all students is the least biased method'),
          hints: [
            hint(1, 'Which group best represents ALL students at the school?', 'conceptual'),
            hint(2, 'Band students like music. Friends are similar to you. Teachers are not students.', 'directional'),
            hint(3, 'Every 5th student is random and includes students from all groups. This is least biased.', 'scaffolded'),
          ],
          solution: 'Systematic sampling from all students.',
          teachingPoint: 'A good sample is random and representative. Asking every 5th student captures variety. Asking only one group (band, friends) creates bias.',
          tags: ['statistics', 'sampling', 'bias'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-10-2`, `level-5-${ch}-10`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'A survey of 10 people finds 7 prefer dogs. Can we conclude that 70% of the entire country prefers dogs? A) Yes, 70% is clear B) No, the sample is too small',
          answer: mc('B) No, the sample is too small', 'B — 10 people is far too small to represent an entire country'),
          hints: [
            hint(1, 'How well can 10 people represent millions?', 'conceptual'),
            hint(2, 'Small samples have high variability — results could be very different with a different 10 people.', 'directional'),
            hint(3, 'A sample of 10 is too small to generalize to a whole country. Larger samples give more reliable results.', 'scaffolded'),
          ],
          solution: 'Sample too small to generalize.',
          teachingPoint: 'Larger samples give more reliable results. A sample of 10 people cannot accurately represent millions. Statistical claims need adequate sample sizes.',
          tags: ['statistics', 'sampling', 'sample-size'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-10-3`, `level-5-${ch}-10`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'A survey question asks: "Don\'t you agree that our park is wonderful?" Is this a good survey question? A) Yes, it is clear B) No, it is biased/leading',
          answer: mc('B) No, it is biased/leading', 'B — The question leads the respondent toward agreeing'),
          hints: [
            hint(1, 'Does the question suggest what answer the surveyor wants?', 'conceptual'),
            hint(2, '"Don\'t you agree" pushes toward "yes." A neutral question would not suggest an answer.', 'directional'),
            hint(3, 'Leading questions bias the results. A better question: "How would you rate our park?"', 'scaffolded'),
          ],
          solution: 'Biased/leading — suggests the desired answer.',
          teachingPoint: 'Good survey questions are neutral and do not suggest an answer. "Don\'t you agree..." is a leading question that biases results.',
          tags: ['statistics', 'surveys', 'bias', 'leading-questions'], difficulty: 3,
        }),
      ]
    ),

    // 11 — Data Detective (challenge, 4)
    level(`level-5-${ch}-11`, cid, 11, 'Data Detective', 'challenge', 4,
      'Lizzie challenges: "Given the mean, median, and mode — can you figure out the missing data?"',
      [
        problem(`problem-5-${ch}-11-1`, `level-5-${ch}-11`, 1, {
          category: 'working_backwards',
          statement: 'A set of 5 numbers has a mean of 8 and a median of 7. The numbers in order are: 3, 5, 7, ?, 15. What is the missing number?',
          answer: num(10, 'Sum = 5×8 = 40. Known sum = 3+5+7+15 = 30. Missing = 10'),
          hints: [
            hint(1, 'Use the mean to find the total sum.', 'conceptual'),
            hint(2, 'Sum = 5 × 8 = 40. Known values = 3+5+7+15 = 30.', 'directional'),
            hint(3, 'Missing = 40 - 30 = 10. Check order: 3,5,7,10,15. Median=7. Correct!', 'scaffolded'),
          ],
          solution: 'Missing = 40 - 30 = 10',
          teachingPoint: 'When you know the mean and count, you can find the total sum. Then subtract the known values to find the missing one.',
          tags: ['statistics', 'working-backwards', 'mean'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-11-2`, `level-5-${ch}-11`, 2, {
          category: 'working_backwards',
          statement: 'Three numbers have a mean of 12 and a range of 10. The smallest number is 7. What is the largest number?',
          answer: num(17, 'Largest = smallest + range = 7 + 10 = 17'),
          hints: [
            hint(1, 'Range = largest - smallest. You know the range and smallest.', 'conceptual'),
            hint(2, 'Largest = 7 + 10 = 17.', 'directional'),
            hint(3, 'Largest = 17. Sum = 36. Third = 36-7-17 = 12. Check: mean = 36/3 = 12. Correct!', 'scaffolded'),
          ],
          solution: 'Largest = 7 + 10 = 17',
          teachingPoint: 'Range = max - min. If you know the range and minimum, add them to find the maximum.',
          tags: ['statistics', 'working-backwards', 'range'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-11-3`, `level-5-${ch}-11`, 3, {
          category: 'working_backwards',
          statement: 'A student has test scores of 85, 92, and 78. What score does she need on a 4th test to have a mean of 88?',
          answer: num(97, 'Need sum = 4×88 = 352. Current sum = 255. Need 352-255 = 97'),
          hints: [
            hint(1, 'Figure out what total sum of 4 tests gives a mean of 88.', 'conceptual'),
            hint(2, 'Required sum = 88 × 4 = 352. Current total = 85+92+78 = 255.', 'directional'),
            hint(3, 'Needed score = 352 - 255 = 97.', 'scaffolded'),
          ],
          solution: 'Required sum = 352. Current = 255. Need 97.',
          teachingPoint: 'To reach a target mean: compute required total (mean × count), subtract what you already have. This is a very practical skill for grades!',
          tags: ['statistics', 'working-backwards', 'mean', 'real-world'], difficulty: 4,
        }),
      ]
    ),

    // 12 — Statistics Puzzles (challenge, 4)
    level(`level-5-${ch}-12`, cid, 12, 'Statistics Puzzles', 'challenge', 4,
      'Admiral Axiom presents tricky statistics problems. "Think carefully about what the numbers really tell you!"',
      [
        problem(`problem-5-${ch}-12-1`, `level-5-${ch}-12`, 1, {
          category: 'working_backwards',
          statement: 'Adding the number 20 to a set increases the mean from 10 to 12. How many numbers were in the set originally?',
          answer: num(4, 'Old sum = 10n. New sum = 10n+20. New mean = (10n+20)/(n+1)=12. Solve: 10n+20=12n+12, 8=2n, n=4'),
          hints: [
            hint(1, 'Let n = original count. Old sum = 10n. New sum = 10n + 20. New count = n + 1.', 'conceptual'),
            hint(2, '(10n + 20) / (n + 1) = 12. Multiply both sides by (n+1).', 'directional'),
            hint(3, '10n + 20 = 12n + 12. So 8 = 2n, n = 4.', 'scaffolded'),
          ],
          solution: 'n = 4 numbers originally',
          teachingPoint: 'Algebra meets statistics! Set up an equation using the mean formula and solve for the unknown count.',
          tags: ['statistics', 'algebra', 'working-backwards'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-12-2`, `level-5-${ch}-12`, 2, {
          category: 'thinking',
          statement: 'In a class of 20 students, the mean score is 75. If the top 5 scores are removed, the mean of the remaining 15 drops to 70. What was the mean of the removed 5 scores?',
          answer: num(90, 'Total = 1500. Remaining = 1050. Removed = 450. Mean = 450/5 = 90'),
          hints: [
            hint(1, 'Find the total for all 20, then the total for 15. The difference is the removed total.', 'conceptual'),
            hint(2, 'Total = 20 × 75 = 1500. Remaining total = 15 × 70 = 1050.', 'directional'),
            hint(3, 'Removed total = 1500 - 1050 = 450. Mean = 450/5 = 90.', 'scaffolded'),
          ],
          solution: 'Removed mean = (1500-1050)/5 = 90',
          teachingPoint: 'You can work with sub-groups by computing their totals from means and counts, then finding differences.',
          tags: ['statistics', 'subgroups', 'mean'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-12-3`, `level-5-${ch}-12`, 3, {
          statement: 'Five numbers have mode 7, median 7, and mean 8. The largest number is 15. The numbers in order are: ?, 7, 7, ?, 15. Find the first number.',
          answer: num(4, 'Sum=40. Known: 7+7+15=29. Missing two sum=11. First must be ≤7 for median. If 4th is x: 4+x=11. x must be ≥7. x=7,first=4'),
          hints: [
            hint(1, 'Sum = 5 × 8 = 40. Two 7s and 15 give 29. The other two sum to 11.', 'conceptual'),
            hint(2, 'The 4th number must be ≥ 7 (for sorted order). The 1st must be ≤ 7.', 'directional'),
            hint(3, 'If 4th = 7 (supports mode), then 1st = 11-7 = 4. Check: 4,7,7,7,15. Mode=7, median=7, mean=8. Works!', 'scaffolded'),
          ],
          solution: 'First number = 4. Set: {4, 7, 7, 7, 15}',
          teachingPoint: 'Combining mode, median, and mean constraints narrows down the possibilities. Use each constraint to eliminate options.',
          tags: ['statistics', 'reasoning', 'constraints'], difficulty: 4,
        }),
      ]
    ),

    // 13 — Guardian of Statistics Strait (boss, 5)
    level(`level-5-${ch}-13`, cid, 13, 'Guardian of Statistics Strait', 'boss', 5,
      'The Guardian of Statistics Strait demands proof of your mastery! "Mean, median, mode — and do not be fooled by misleading data!"',
      [
        problem(`problem-5-${ch}-13-1`, `level-5-${ch}-13`, 1, {
          category: 'thinking',
          statement: 'Dataset: 5, 8, 8, 10, 12, 14, 20. Find the mean.',
          answer: num(11, '(5+8+8+10+12+14+20)/7 = 77/7 = 11'),
          hints: [
            hint(1, 'Add all 7 values, then divide by 7.', 'conceptual'),
            hint(2, '5+8+8+10+12+14+20 = 77.', 'directional'),
            hint(3, '77 ÷ 7 = 11.', 'scaffolded'),
          ],
          solution: 'Mean = 77/7 = 11',
          teachingPoint: 'The mean of 5,8,8,10,12,14,20 is 11. Add all values and divide by the count.',
          tags: ['statistics', 'mean', 'boss'], difficulty: 5,
        }),
        problem(`problem-5-${ch}-13-2`, `level-5-${ch}-13`, 2, {
          category: 'thinking',
          statement: 'Same dataset: 5, 8, 8, 10, 12, 14, 20. What is the median?',
          answer: num(10, 'Already sorted, 7 values, middle = 4th = 10'),
          hints: [
            hint(1, 'Data is sorted. Find the middle value of 7 numbers.', 'conceptual'),
            hint(2, 'The 4th value (middle of 7) is the median.', 'directional'),
            hint(3, '4th value = 10. Median = 10.', 'scaffolded'),
          ],
          solution: 'Median = 10 (4th of 7 sorted values)',
          teachingPoint: 'The median (10) and mean (11) differ slightly because the data is slightly right-skewed (20 pulls the mean up).',
          tags: ['statistics', 'median', 'boss'], difficulty: 5,
        }),
        problem(`problem-5-${ch}-13-3`, `level-5-${ch}-13`, 3, {
          category: 'working_backwards',
          statement: 'A student needs a mean of 90 across 5 tests. She scored 88, 92, 85, and 91 on the first four. What must she score on test 5?',
          answer: num(94, 'Need 450 total. Have 356. Need 450-356=94'),
          hints: [
            hint(1, 'What total score across 5 tests gives a mean of 90?', 'conceptual'),
            hint(2, 'Total needed = 90 × 5 = 450. Current sum = 88+92+85+91 = 356.', 'directional'),
            hint(3, 'Score needed = 450 - 356 = 94.', 'scaffolded'),
          ],
          solution: 'Needed = 450 - 356 = 94',
          teachingPoint: 'To reach a target mean: total required = mean × count. Then subtract what you have. This is one of the most useful statistics skills!',
          tags: ['statistics', 'mean', 'working-backwards', 'boss'], difficulty: 5,
        }),
      ]
    ),
  ];

  return {
    id: cid, worldId: 'world-5', number: ch, name: 'Statistics Strait',
    topic: 'statistics', weekStart: 10, weekEnd: 12, levels,
    learningObjectives: [
      'Calculate mean, median, mode, and range',
      'Choose between mean and median based on data distribution',
      'Read and interpret bar graphs, histograms, and line plots',
      'Identify misleading statistics and biased samples',
      'Solve problems requiring working backwards from statistics',
    ],
    signatureContent: ['mean calculation', 'median vs mean', 'misleading statistics detection', 'data interpretation'],
    isBoss: true,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHAPTER 5 — Factor Fjords
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function createChapter5() {
  const ch = 5, cid = `chapter-5-${ch}`;
  const levels = [
    // 1 — Divisibility Dock (teaching, 1)
    level(`level-5-${ch}-1`, cid, 1, 'Divisibility Dock', 'teaching', 1,
      'Prof. Owlbert greets you at Factor Fjords. "Divisibility rules are shortcuts that tell you if one number divides evenly into another."',
      [
        problem(`problem-5-${ch}-1-1`, `level-5-${ch}-1`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'Is 248 divisible by 2? A) Yes B) No',
          answer: mc('A) Yes', 'A — 248 ends in 8, which is even, so it is divisible by 2'),
          hints: [
            hint(1, 'A number is divisible by 2 if it is even (ends in 0, 2, 4, 6, or 8).', 'conceptual'),
            hint(2, '248 ends in 8. Is 8 even?', 'directional'),
            hint(3, '8 is even, so 248 is divisible by 2.', 'scaffolded'),
          ],
          solution: 'Yes — 248 ends in 8 (even).',
          teachingPoint: 'Divisibility by 2: check if the last digit is even (0, 2, 4, 6, or 8). This is the simplest divisibility rule.',
          tags: ['factors', 'divisibility', 'rule-of-2'], difficulty: 1,
        }),
        problem(`problem-5-${ch}-1-2`, `level-5-${ch}-1`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'Is 735 divisible by 5? A) Yes B) No',
          answer: mc('A) Yes', 'A — 735 ends in 5, so it is divisible by 5'),
          hints: [
            hint(1, 'Divisibility by 5: the last digit must be 0 or 5.', 'conceptual'),
            hint(2, '735 ends in 5.', 'directional'),
            hint(3, 'Since 735 ends in 5, it is divisible by 5. 735 ÷ 5 = 147.', 'scaffolded'),
          ],
          solution: 'Yes — ends in 5.',
          teachingPoint: 'Divisibility by 5: the number must end in 0 or 5. Divisibility by 10: must end in 0.',
          tags: ['factors', 'divisibility', 'rule-of-5'], difficulty: 1,
        }),
        problem(`problem-5-${ch}-1-3`, `level-5-${ch}-1`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'Is 4,530 divisible by 10? A) Yes B) No',
          answer: mc('A) Yes', 'A — 4,530 ends in 0, so it is divisible by 10'),
          hints: [
            hint(1, 'Divisibility by 10: the number must end in 0.', 'conceptual'),
            hint(2, '4,530 ends in 0.', 'directional'),
            hint(3, 'Yes, 4,530 ÷ 10 = 453.', 'scaffolded'),
          ],
          solution: 'Yes — ends in 0.',
          teachingPoint: 'If a number ends in 0, it is divisible by both 5 and 10. The last digit tells you a lot about divisibility!',
          tags: ['factors', 'divisibility', 'rule-of-10'], difficulty: 1,
        }),
      ]
    ),

    // 2 — More Divisibility Rules (teaching, 2)
    level(`level-5-${ch}-2`, cid, 2, 'More Divisibility Rules', 'teaching', 2,
      'Lizzie teaches the trickier rules. "For 3 and 9, add up the digits. For 4, check the last two digits."',
      [
        problem(`problem-5-${ch}-2-1`, `level-5-${ch}-2`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'Is 357 divisible by 3? (Add the digits: 3+5+7=15. Is 15 divisible by 3?) A) Yes B) No',
          answer: mc('A) Yes', 'A — Digit sum = 15, and 15 ÷ 3 = 5, so 357 is divisible by 3'),
          hints: [
            hint(1, 'Divisibility by 3: add all digits. If the sum is divisible by 3, so is the number.', 'conceptual'),
            hint(2, '3 + 5 + 7 = 15. Is 15 ÷ 3 a whole number?', 'directional'),
            hint(3, '15 ÷ 3 = 5. Yes! So 357 is divisible by 3.', 'scaffolded'),
          ],
          solution: 'Yes — digit sum 15 is divisible by 3.',
          teachingPoint: 'Divisibility by 3: sum the digits. If the sum is divisible by 3, so is the original number. This works because of place value properties!',
          tags: ['factors', 'divisibility', 'rule-of-3', 'digit-sum'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-2-2`, `level-5-${ch}-2`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'Is 516 divisible by 4? (Check: are the last two digits "16" divisible by 4?) A) Yes B) No',
          answer: mc('A) Yes', 'A — The last two digits are 16, and 16 ÷ 4 = 4, so 516 is divisible by 4'),
          hints: [
            hint(1, 'Divisibility by 4: check if the last two digits form a number divisible by 4.', 'conceptual'),
            hint(2, 'Last two digits: 16. Is 16 ÷ 4 a whole number?', 'directional'),
            hint(3, '16 ÷ 4 = 4. Yes! So 516 is divisible by 4.', 'scaffolded'),
          ],
          solution: 'Yes — last two digits "16" are divisible by 4.',
          teachingPoint: 'Divisibility by 4: check the last two digits only. If they form a number divisible by 4, the whole number is too.',
          tags: ['factors', 'divisibility', 'rule-of-4'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-2-3`, `level-5-${ch}-2`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'Is 738 divisible by 9? (Digit sum: 7+3+8=18. Is 18 divisible by 9?) A) Yes B) No',
          answer: mc('A) Yes', 'A — Digit sum = 18, and 18 ÷ 9 = 2, so 738 is divisible by 9'),
          hints: [
            hint(1, 'Divisibility by 9: add digits. If the sum is divisible by 9, so is the number.', 'conceptual'),
            hint(2, '7 + 3 + 8 = 18. Is 18 ÷ 9 a whole number?', 'directional'),
            hint(3, '18 ÷ 9 = 2. Yes! 738 is divisible by 9.', 'scaffolded'),
          ],
          solution: 'Yes — digit sum 18 is divisible by 9.',
          teachingPoint: 'Divisibility by 9: same trick as 3, but the digit sum must be divisible by 9. If divisible by 9, it is also divisible by 3.',
          tags: ['factors', 'divisibility', 'rule-of-9', 'digit-sum'], difficulty: 2,
        }),
      ]
    ),

    // 3 — Divisibility Mastery (practice, 2)
    level(`level-5-${ch}-3`, cid, 3, 'Divisibility Mastery', 'practice', 2,
      'Grogg tests all the rules. "6 means divisible by BOTH 2 and 3. And there are tricks for 7, 8, and 11 too!"',
      [
        problem(`problem-5-${ch}-3-1`, `level-5-${ch}-3`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'Is 432 divisible by 6? (Must pass BOTH the 2-test AND the 3-test.) A) Yes B) No',
          answer: mc('A) Yes', 'A — 432 is even (divisible by 2) and digit sum=9 (divisible by 3), so divisible by 6'),
          hints: [
            hint(1, 'Divisible by 6 = divisible by BOTH 2 and 3.', 'conceptual'),
            hint(2, '432 ends in 2 (even ✓). 4+3+2=9, divisible by 3 ✓.', 'directional'),
            hint(3, 'Both tests pass, so 432 is divisible by 6. 432÷6=72.', 'scaffolded'),
          ],
          solution: 'Yes — passes both the 2-test and 3-test.',
          teachingPoint: 'Divisibility by 6: the number must be divisible by BOTH 2 and 3. Check both rules!',
          tags: ['factors', 'divisibility', 'rule-of-6'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-3-2`, `level-5-${ch}-3`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'Is 1,024 divisible by 8? (Check: are the last three digits "024" divisible by 8?) A) Yes B) No',
          answer: mc('A) Yes', 'A — 24 ÷ 8 = 3, so 1,024 is divisible by 8'),
          hints: [
            hint(1, 'Divisibility by 8: check if the last three digits form a number divisible by 8.', 'conceptual'),
            hint(2, 'Last three digits: 024 = 24. Is 24 ÷ 8 a whole number?', 'directional'),
            hint(3, '24 ÷ 8 = 3. Yes! 1,024 is divisible by 8.', 'scaffolded'),
          ],
          solution: 'Yes — 24 ÷ 8 = 3.',
          teachingPoint: 'Divisibility by 8: check the last three digits. 8 = 2³, so you need to check divisibility three levels deep.',
          tags: ['factors', 'divisibility', 'rule-of-8'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-3-3`, `level-5-${ch}-3`, 3, {
          statement: 'How many of the numbers 2, 3, 4, 5, 6, 9 evenly divide 360?',
          answer: num(6, '360 is divisible by all six: 2,3,4,5,6,9'),
          hints: [
            hint(1, 'Check each divisibility rule for 360.', 'conceptual'),
            hint(2, '360: even(÷2✓), digit sum 9(÷3✓,÷9✓), last two 60(÷4✓), ends 0(÷5✓), even+÷3(÷6✓).', 'directional'),
            hint(3, 'All 6 numbers divide 360 evenly.', 'scaffolded'),
          ],
          solution: 'All 6 numbers divide 360.',
          teachingPoint: '360 is a highly composite number — it has many factors. This is why ancient civilizations chose 360 degrees in a circle!',
          tags: ['factors', 'divisibility', 'multiple-rules'], difficulty: 2,
        }),
      ]
    ),

    // 4 — Prime or Composite? (teaching, 2)
    level(`level-5-${ch}-4`, cid, 4, 'Prime or Composite?', 'teaching', 2,
      'Prof. Owlbert explains: "A prime number has exactly 2 factors: 1 and itself. A composite number has more than 2 factors."',
      [
        problem(`problem-5-${ch}-4-1`, `level-5-${ch}-4`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'Is 17 prime or composite? A) Prime B) Composite',
          answer: mc('A) Prime', 'A — 17 has only two factors: 1 and 17'),
          hints: [
            hint(1, 'Try dividing 17 by 2, 3, 4... Does any divide evenly?', 'conceptual'),
            hint(2, '17÷2=8.5, 17÷3=5.67, 17÷4=4.25. None work.', 'directional'),
            hint(3, 'No number between 1 and 17 divides evenly. 17 is prime.', 'scaffolded'),
          ],
          solution: 'Prime — factors are only 1 and 17.',
          teachingPoint: 'A prime number has exactly 2 factors: 1 and itself. To test, try dividing by primes up to the square root.',
          tags: ['factors', 'prime', 'classification'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-4-2`, `level-5-${ch}-4`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'Is 1 prime, composite, or neither? A) Prime B) Composite C) Neither',
          answer: mc('C) Neither', 'C — 1 has only one factor (itself), so it is neither prime nor composite'),
          hints: [
            hint(1, 'Primes have exactly 2 factors. Composites have more than 2. How many factors does 1 have?', 'conceptual'),
            hint(2, '1 has only one factor: 1. That is fewer than 2.', 'directional'),
            hint(3, '1 is neither prime (needs 2 factors) nor composite (needs more than 2). It is special!', 'scaffolded'),
          ],
          solution: 'Neither — 1 has exactly one factor.',
          teachingPoint: 'The number 1 is NEITHER prime nor composite. Primes must have exactly 2 factors. 1 has only 1 factor (itself).',
          tags: ['factors', 'prime', 'special-case'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-4-3`, `level-5-${ch}-4`, 3, {
          statement: 'How many prime numbers are there between 1 and 10? (List: 2, 3, 5, 7)',
          answer: num(4, 'Primes 1-10: 2, 3, 5, 7'),
          hints: [
            hint(1, 'Check each number from 2 to 10: does it have only 2 factors?', 'conceptual'),
            hint(2, '2✓, 3✓, 4=2×2✗, 5✓, 6=2×3✗, 7✓, 8=2³✗, 9=3²✗, 10=2×5✗.', 'directional'),
            hint(3, 'Primes: 2, 3, 5, 7. That is 4 primes.', 'scaffolded'),
          ],
          solution: '4 primes: 2, 3, 5, 7',
          teachingPoint: 'The primes under 10 are 2, 3, 5, and 7. Notice that 2 is the only even prime — all other even numbers are divisible by 2.',
          tags: ['factors', 'prime', 'counting'], difficulty: 2,
        }),
      ]
    ),

    // 5 — Factor Trees (teaching, 3)
    level(`level-5-${ch}-5`, cid, 5, 'Factor Trees', 'teaching', 3,
      'Lizzie builds factor trees. "Break a number into factors, then break those factors, until you reach all primes!"',
      [
        problem(`problem-5-${ch}-5-1`, `level-5-${ch}-5`, 1, {
          category: 'multiple_paths', type: 'text_input', inputType: 'text_field',
          statement: 'Write the prime factorization of 36. Use × to separate factors (e.g., 2 × 2 × 3 × 3).',
          answer: txt('2 × 2 × 3 × 3', '36 = 2 × 2 × 3 × 3 = 2² × 3²'),
          hints: [
            hint(1, 'Start by splitting 36 into any two factors, then keep splitting until all are prime.', 'conceptual'),
            hint(2, '36 = 6 × 6 = (2×3) × (2×3), or 36 = 4 × 9 = (2×2) × (3×3).', 'directional'),
            hint(3, 'Either way: 36 = 2 × 2 × 3 × 3.', 'scaffolded'),
          ],
          solution: '36 = 2 × 2 × 3 × 3',
          teachingPoint: 'No matter how you split the number, you always get the same prime factorization. This is the Fundamental Theorem of Arithmetic!',
          tags: ['factors', 'prime-factorization', 'factor-tree', 'multiple-paths'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-5-2`, `level-5-${ch}-5`, 2, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Write the prime factorization of 60.',
          answer: txt('2 × 2 × 3 × 5', '60 = 2² × 3 × 5'),
          hints: [
            hint(1, 'Start by dividing 60 by the smallest prime (2).', 'conceptual'),
            hint(2, '60 = 2 × 30 = 2 × 2 × 15 = 2 × 2 × 3 × ?', 'directional'),
            hint(3, '60 = 2 × 2 × 3 × 5.', 'scaffolded'),
          ],
          solution: '60 = 2 × 2 × 3 × 5',
          teachingPoint: 'Divide by the smallest prime possible at each step: 60→30→15→5→done. This systematic approach ensures you find all prime factors.',
          tags: ['factors', 'prime-factorization', 'factor-tree'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-5-3`, `level-5-${ch}-5`, 3, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Write the prime factorization of 100.',
          answer: txt('2 × 2 × 5 × 5', '100 = 2² × 5²'),
          hints: [
            hint(1, '100 = 10 × 10. Now factor each 10.', 'conceptual'),
            hint(2, '10 = 2 × 5. So 100 = (2×5) × (2×5).', 'directional'),
            hint(3, '100 = 2 × 2 × 5 × 5.', 'scaffolded'),
          ],
          solution: '100 = 2 × 2 × 5 × 5',
          teachingPoint: '100 = 2² × 5² = (2×5)² = 10². Notice: the prime factorization reveals why 100 is a perfect square!',
          tags: ['factors', 'prime-factorization', 'perfect-square'], difficulty: 3,
        }),
      ]
    ),

    // 6 — Prime Factorization Practice (practice, 3)
    level(`level-5-${ch}-6`, cid, 6, 'Prime Factorization Practice', 'practice', 3,
      'Grogg practices writing prime factorizations with exponents. "2 × 2 × 2 = 2³ — so much shorter!"',
      [
        problem(`problem-5-${ch}-6-1`, `level-5-${ch}-6`, 1, {
          statement: 'What is 2³ × 3² as a single number?',
          answer: num(72, '8 × 9 = 72'),
          hints: [
            hint(1, 'Calculate each power first: 2³ = ? and 3² = ?', 'conceptual'),
            hint(2, '2³ = 8 and 3² = 9.', 'directional'),
            hint(3, '8 × 9 = 72.', 'scaffolded'),
          ],
          solution: '2³ × 3² = 8 × 9 = 72',
          teachingPoint: 'Prime factorization with exponents: 72 = 2³ × 3². The exponent tells you how many times that prime appears.',
          tags: ['factors', 'prime-factorization', 'exponents'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-6-2`, `level-5-${ch}-6`, 2, {
          statement: 'How many factors does 12 have? (Factors of 12: 1, 2, 3, 4, 6, 12)',
          answer: num(6, '12 has 6 factors: 1, 2, 3, 4, 6, 12'),
          hints: [
            hint(1, 'List all numbers that divide evenly into 12.', 'conceptual'),
            hint(2, '1, 2, 3, 4, 6, 12. Count them.', 'directional'),
            hint(3, '6 factors total.', 'scaffolded'),
          ],
          solution: '6 factors: 1, 2, 3, 4, 6, 12',
          teachingPoint: 'To find all factors, check divisibility by each number from 1 up to the square root. Pair each factor with its partner.',
          tags: ['factors', 'counting-factors'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-6-3`, `level-5-${ch}-6`, 3, {
          statement: 'What is 2² × 5³ as a single number?',
          answer: num(500, '4 × 125 = 500'),
          hints: [
            hint(1, 'Calculate each power: 2² = ? and 5³ = ?', 'conceptual'),
            hint(2, '2² = 4, 5³ = 125.', 'directional'),
            hint(3, '4 × 125 = 500.', 'scaffolded'),
          ],
          solution: '2² × 5³ = 4 × 125 = 500',
          teachingPoint: 'Prime factorization makes it easy to compute products of powers. 2² × 5³ = 4 × 125 = 500.',
          tags: ['factors', 'prime-factorization', 'exponents'], difficulty: 3,
        }),
      ]
    ),

    // 7 — Greatest Common Factor (teaching, 3)
    level(`level-5-${ch}-7`, cid, 7, 'Greatest Common Factor', 'teaching', 3,
      'Prof. Owlbert explains: "The GCF is the largest number that divides evenly into both numbers. Factor trees help find it!"',
      [
        problem(`problem-5-${ch}-7-1`, `level-5-${ch}-7`, 1, {
          statement: 'Find the GCF of 12 and 18.',
          answer: num(6, '12 = 2²×3, 18 = 2×3². GCF = 2×3 = 6'),
          hints: [
            hint(1, 'List the factors of each, or use prime factorizations.', 'conceptual'),
            hint(2, '12 = 2×2×3. 18 = 2×3×3. Common primes: one 2 and one 3.', 'directional'),
            hint(3, 'GCF = 2 × 3 = 6.', 'scaffolded'),
          ],
          solution: 'GCF(12,18) = 6',
          teachingPoint: 'GCF from prime factorizations: take each common prime to the LOWEST power. 12=2²×3, 18=2×3². GCF = 2¹×3¹ = 6.',
          tags: ['factors', 'gcf', 'prime-factorization'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-7-2`, `level-5-${ch}-7`, 2, {
          statement: 'Find the GCF of 24 and 36.',
          answer: num(12, '24=2³×3, 36=2²×3². GCF=2²×3=12'),
          hints: [
            hint(1, 'Prime factorize both, then take common primes with lowest exponent.', 'conceptual'),
            hint(2, '24 = 2³×3. 36 = 2²×3². Common: 2 (min power 2) and 3 (min power 1).', 'directional'),
            hint(3, 'GCF = 2²×3 = 4×3 = 12.', 'scaffolded'),
          ],
          solution: 'GCF(24,36) = 12',
          teachingPoint: 'GCF uses the minimum exponent for each shared prime. 24=2³×3, 36=2²×3². GCF = 2²×3¹ = 12.',
          tags: ['factors', 'gcf', 'prime-factorization'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-7-3`, `level-5-${ch}-7`, 3, {
          statement: 'Find the GCF of 48 and 60.',
          answer: num(12, '48=2⁴×3, 60=2²×3×5. GCF=2²×3=12'),
          hints: [
            hint(1, 'Factor both: 48 = 2⁴×3, 60 = 2²×3×5.', 'conceptual'),
            hint(2, 'Common primes: 2 (min power 2) and 3 (min power 1). The 5 is not shared.', 'directional'),
            hint(3, 'GCF = 2²×3 = 4×3 = 12.', 'scaffolded'),
          ],
          solution: 'GCF(48,60) = 12',
          teachingPoint: 'Only shared primes contribute to the GCF. The 5 in 60 is not in 48, so it is excluded.',
          tags: ['factors', 'gcf'], difficulty: 3,
        }),
      ]
    ),

    // 8 — Least Common Multiple (teaching, 3)
    level(`level-5-${ch}-8`, cid, 8, 'Least Common Multiple', 'teaching', 3,
      'Lizzie explains: "The LCM is the smallest number that BOTH numbers divide into evenly."',
      [
        problem(`problem-5-${ch}-8-1`, `level-5-${ch}-8`, 1, {
          statement: 'Find the LCM of 4 and 6.',
          answer: num(12, '4=2², 6=2×3. LCM=2²×3=12'),
          hints: [
            hint(1, 'LCM uses the MAXIMUM power of each prime from both factorizations.', 'conceptual'),
            hint(2, '4 = 2². 6 = 2×3. Max powers: 2² and 3¹.', 'directional'),
            hint(3, 'LCM = 2²×3 = 4×3 = 12.', 'scaffolded'),
          ],
          solution: 'LCM(4,6) = 12',
          teachingPoint: 'LCM from prime factorizations: take each prime to the HIGHEST power. 4=2², 6=2¹×3¹. LCM = 2²×3¹ = 12.',
          tags: ['factors', 'lcm', 'prime-factorization'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-8-2`, `level-5-${ch}-8`, 2, {
          statement: 'Find the LCM of 8 and 12.',
          answer: num(24, '8=2³, 12=2²×3. LCM=2³×3=24'),
          hints: [
            hint(1, 'Factor both, then take max power of each prime.', 'conceptual'),
            hint(2, '8=2³, 12=2²×3. Max: 2³ and 3¹.', 'directional'),
            hint(3, 'LCM = 2³×3 = 8×3 = 24.', 'scaffolded'),
          ],
          solution: 'LCM(8,12) = 24',
          teachingPoint: 'GCF takes minimum powers, LCM takes maximum powers. For 8 and 12: GCF=4, LCM=24. Notice: GCF×LCM = 4×24 = 96 = 8×12!',
          tags: ['factors', 'lcm', 'prime-factorization'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-8-3`, `level-5-${ch}-8`, 3, {
          statement: 'Find the LCM of 10 and 15.',
          answer: num(30, '10=2×5, 15=3×5. LCM=2×3×5=30'),
          hints: [
            hint(1, '10=2×5, 15=3×5. Take max power of each prime: 2, 3, 5.', 'conceptual'),
            hint(2, 'LCM = 2¹×3¹×5¹.', 'directional'),
            hint(3, 'LCM = 2×3×5 = 30.', 'scaffolded'),
          ],
          solution: 'LCM(10,15) = 30',
          teachingPoint: 'When numbers share some but not all primes, the LCM includes ALL primes from both numbers at their maximum powers.',
          tags: ['factors', 'lcm'], difficulty: 3,
        }),
      ]
    ),

    // 9 — GCF vs LCM (practice, 3)
    level(`level-5-${ch}-9`, cid, 9, 'GCF vs LCM', 'practice', 3,
      'Grogg gets confused. "When do I use GCF and when do I use LCM?" Let\'s figure out the difference.',
      [
        problem(`problem-5-${ch}-9-1`, `level-5-${ch}-9`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'You have 18 apples and 24 oranges. You want to make identical fruit bags with no fruit left over. Each bag should have the same number of each fruit. The MOST bags you can make uses: A) GCF B) LCM',
          answer: mc('A) GCF', 'A — GCF gives the largest number of equal groups'),
          hints: [
            hint(1, '"Most equal groups with none left over" — is this about a common factor or a common multiple?', 'conceptual'),
            hint(2, 'We want to divide evenly into groups. That is about factors, not multiples.', 'directional'),
            hint(3, 'GCF(18,24) = 6 bags. Each bag: 3 apples and 4 oranges.', 'scaffolded'),
          ],
          solution: 'GCF — 6 bags (3 apples, 4 oranges each)',
          teachingPoint: 'Use GCF for "largest equal groups" or "divide evenly" problems. GCF tells you the most groups you can make.',
          tags: ['factors', 'gcf-vs-lcm', 'word-problem'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-9-2`, `level-5-${ch}-9`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice',
          statement: 'Hot dogs come in packs of 8. Buns come in packs of 6. What is the fewest of each you need to have equal numbers? This uses: A) GCF B) LCM',
          answer: mc('B) LCM', 'B — LCM gives the smallest number that both pack sizes divide into'),
          hints: [
            hint(1, 'You need a number that is a multiple of BOTH 8 and 6.', 'conceptual'),
            hint(2, 'The smallest such number is the LCM.', 'directional'),
            hint(3, 'LCM(8,6) = 24. Buy 3 packs of hot dogs and 4 packs of buns.', 'scaffolded'),
          ],
          solution: 'LCM — 24 of each (3 packs × 4 packs)',
          teachingPoint: 'Use LCM for "when do two things sync up" or "fewest to make equal." LCM finds the smallest number both divide into.',
          tags: ['factors', 'gcf-vs-lcm', 'word-problem'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-9-3`, `level-5-${ch}-9`, 3, {
          statement: 'Find the LCM of 6 and 8.',
          answer: num(24, '6=2×3, 8=2³. LCM=2³×3=24'),
          hints: [
            hint(1, '6=2×3 and 8=2³. Take the max power of each prime.', 'conceptual'),
            hint(2, 'Max of 2: 2³. Max of 3: 3¹.', 'directional'),
            hint(3, 'LCM = 8×3 = 24.', 'scaffolded'),
          ],
          solution: 'LCM(6,8) = 24',
          teachingPoint: '6=2×3, 8=2³. LCM = 2³×3 = 24. This is the hot dog/bun answer: 24 of each!',
          tags: ['factors', 'lcm'], difficulty: 3,
        }),
      ]
    ),

    // 10 — GCF/LCM Applications (practice, 3)
    level(`level-5-${ch}-10`, cid, 10, 'GCF/LCM Applications', 'practice', 3,
      'Real-world problems with GCF and LCM. "Tiling floors, scheduling buses, sharing snacks — factors are everywhere!"',
      [
        problem(`problem-5-${ch}-10-1`, `level-5-${ch}-10`, 1, {
          statement: 'A rectangular floor is 12 ft × 8 ft. What is the largest square tile (in whole feet) that fits perfectly with no cutting? (Side length in feet)',
          answer: num(4, 'GCF(12,8) = 4 feet'),
          hints: [
            hint(1, 'The tile side must divide both 12 and 8 evenly.', 'conceptual'),
            hint(2, 'The largest such number is the GCF.', 'directional'),
            hint(3, 'GCF(12,8) = 4. Use 4×4 ft tiles.', 'scaffolded'),
          ],
          solution: 'GCF(12,8) = 4 ft tiles',
          teachingPoint: 'Tiling problems use GCF: the largest square tile that fits perfectly has side length = GCF of the room dimensions.',
          tags: ['factors', 'gcf', 'tiling', 'word-problem'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-10-2`, `level-5-${ch}-10`, 2, {
          statement: 'Bus A leaves every 12 minutes. Bus B leaves every 15 minutes. They both leave at 8:00 AM. How many minutes until they leave together again?',
          answer: num(60, 'LCM(12,15) = 60 minutes'),
          hints: [
            hint(1, 'You need the time that is a multiple of BOTH 12 and 15.', 'conceptual'),
            hint(2, 'LCM(12,15) = ?. 12=2²×3, 15=3×5.', 'directional'),
            hint(3, 'LCM = 2²×3×5 = 60 minutes = 1 hour.', 'scaffolded'),
          ],
          solution: 'LCM(12,15) = 60 minutes',
          teachingPoint: 'Scheduling problems use LCM: the LCM tells you when two repeating events synchronize again.',
          tags: ['factors', 'lcm', 'scheduling', 'word-problem'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-10-3`, `level-5-${ch}-10`, 3, {
          statement: '36 red beads and 48 blue beads are to be divided into identical groups with none left over. What is the maximum number of groups?',
          answer: num(12, 'GCF(36,48) = 12'),
          hints: [
            hint(1, 'Each group must have the same number of red and blue beads. The number of groups must divide both 36 and 48.', 'conceptual'),
            hint(2, 'Maximum groups = GCF(36,48).', 'directional'),
            hint(3, 'GCF = 12 groups (3 red, 4 blue each).', 'scaffolded'),
          ],
          solution: 'GCF(36,48) = 12 groups',
          teachingPoint: '"Maximum equal groups with none left over" = GCF. 12 groups with 3 red and 4 blue beads each.',
          tags: ['factors', 'gcf', 'word-problem'], difficulty: 3,
        }),
      ]
    ),

    // 11 — Factor Challenges (challenge, 4)
    level(`level-5-${ch}-11`, cid, 11, 'Factor Challenges', 'challenge', 4,
      'Admiral Axiom poses factor puzzles. "Can you think about factors in new ways?"',
      [
        problem(`problem-5-${ch}-11-1`, `level-5-${ch}-11`, 1, {
          category: 'pattern_discovery',
          statement: 'Numbers with exactly 2 factors are prime. What kind of number has exactly 3 factors? (Hint: 4 has factors 1, 2, 4. What is special about 4?)',
          answer: txt('perfect square of a prime', 'Numbers like 4=2², 9=3², 25=5² have exactly 3 factors'),
          hints: [
            hint(1, 'What do 4 (1,2,4), 9 (1,3,9), and 25 (1,5,25) have in common?', 'conceptual'),
            hint(2, '4 = 2², 9 = 3², 25 = 5². They are squares of primes.', 'directional'),
            hint(3, 'A prime squared (p²) has exactly 3 factors: 1, p, and p².', 'scaffolded'),
          ],
          solution: 'Squares of primes: p² has factors 1, p, p².',
          teachingPoint: 'Numbers with exactly 3 factors are perfect squares of primes (4, 9, 25, 49...). The factor count formula: if n = p^a, then n has a+1 factors.',
          tags: ['factors', 'pattern-discovery', 'primes'], difficulty: 4,
          type: 'text_input', inputType: 'text_field',
        }),
        problem(`problem-5-${ch}-11-2`, `level-5-${ch}-11`, 2, {
          statement: 'What is the smallest number divisible by 1, 2, 3, 4, 5, and 6?',
          answer: num(60, 'LCM(1,2,3,4,5,6) = 60'),
          hints: [
            hint(1, 'You need the LCM of all numbers from 1 to 6.', 'conceptual'),
            hint(2, '2=2, 3=3, 4=2², 5=5, 6=2×3. Max powers: 2², 3, 5.', 'directional'),
            hint(3, 'LCM = 4×3×5 = 60.', 'scaffolded'),
          ],
          solution: 'LCM(1-6) = 2²×3×5 = 60',
          teachingPoint: 'The LCM of 1 through 6 is 60. Take the highest power of each prime: 2²×3¹×5¹ = 60.',
          tags: ['factors', 'lcm', 'multiple-numbers'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-11-3`, `level-5-${ch}-11`, 3, {
          category: 'pattern_discovery',
          statement: 'How many factors does 24 have? (24 = 2³ × 3¹. Factor count = (3+1)(1+1) = ?)',
          answer: num(8, '(3+1)(1+1) = 4×2 = 8'),
          hints: [
            hint(1, 'For n = p^a × q^b, the number of factors is (a+1)(b+1).', 'conceptual'),
            hint(2, '24 = 2³ × 3¹. So (3+1)(1+1) = ?', 'directional'),
            hint(3, '4 × 2 = 8 factors. They are: 1,2,3,4,6,8,12,24.', 'scaffolded'),
          ],
          solution: '(3+1)(1+1) = 8 factors',
          teachingPoint: 'Factor count formula: for n = p₁^a × p₂^b × ..., the total factors = (a+1)(b+1)×... This is a powerful shortcut!',
          tags: ['factors', 'counting-factors', 'formula', 'pattern-discovery'], difficulty: 4,
        }),
      ]
    ),

    // 12 — Mystery Numbers (challenge, 4)
    level(`level-5-${ch}-12`, cid, 12, 'Mystery Numbers', 'challenge', 4,
      'Lizzie gives clues. "I\'m thinking of two numbers. Their GCF is 6 and their LCM is 60. Can you find them?"',
      [
        problem(`problem-5-${ch}-12-1`, `level-5-${ch}-12`, 1, {
          category: 'working_backwards',
          statement: 'Two numbers have GCF = 6 and LCM = 30. One of the numbers is 6. What is the other? (Hint: GCF × LCM = product of the two numbers)',
          answer: num(30, '6 × other = 6 × 30 = 180. Other = 180/6 = 30'),
          hints: [
            hint(1, 'Use the formula: GCF × LCM = a × b.', 'conceptual'),
            hint(2, '6 × 30 = 6 × b, so b = 30.', 'directional'),
            hint(3, 'The other number is 30. Check: GCF(6,30)=6, LCM(6,30)=30. Correct!', 'scaffolded'),
          ],
          solution: 'Other = (6×30)/6 = 30',
          teachingPoint: 'The product of two numbers equals the product of their GCF and LCM: a × b = GCF(a,b) × LCM(a,b).',
          tags: ['factors', 'gcf', 'lcm', 'working-backwards'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-12-2`, `level-5-${ch}-12`, 2, {
          category: 'working_backwards',
          statement: 'Two numbers have GCF = 4 and LCM = 60. One of the numbers is 12. What is the other?',
          answer: num(20, '12 × other = 4 × 60 = 240. Other = 240/12 = 20'),
          hints: [
            hint(1, 'GCF × LCM = product of the two numbers.', 'conceptual'),
            hint(2, '4 × 60 = 240. 12 × other = 240.', 'directional'),
            hint(3, 'Other = 240 ÷ 12 = 20. Check: GCF(12,20)=4, LCM(12,20)=60. Correct!', 'scaffolded'),
          ],
          solution: 'Other = 240/12 = 20',
          teachingPoint: 'This formula is very useful: a×b = GCF×LCM. If you know three of these four values, you can find the fourth.',
          tags: ['factors', 'gcf', 'lcm', 'working-backwards'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-12-3`, `level-5-${ch}-12`, 3, {
          category: 'working_backwards',
          statement: 'I am a two-digit number. I am divisible by 3 and 5 but not by 2. I am between 30 and 60. What am I?',
          answer: num(45, 'Divisible by 3 and 5: multiples of 15. Between 30-60: 45. Not even: 45 (odd). ✓'),
          hints: [
            hint(1, 'Divisible by both 3 and 5 means divisible by 15.', 'conceptual'),
            hint(2, 'Multiples of 15 between 30 and 60: 30, 45, 60. Which is not divisible by 2?', 'directional'),
            hint(3, '30 is even, 45 is odd, 60 is even. The answer is 45.', 'scaffolded'),
          ],
          solution: '45 — divisible by 3 and 5, odd, between 30 and 60.',
          teachingPoint: 'Combine divisibility constraints to narrow down: divisible by 3 and 5 → divisible by 15. Then apply remaining constraints.',
          tags: ['factors', 'divisibility', 'logic', 'working-backwards'], difficulty: 4,
        }),
      ]
    ),

    // 13 — Guardian of Factor Fjords (boss, 5)
    level(`level-5-${ch}-13`, cid, 13, 'Guardian of Factor Fjords', 'boss', 5,
      'The Guardian of Factor Fjords demands mastery! "Factorization, GCF, LCM — prove you understand them all!"',
      [
        problem(`problem-5-${ch}-13-1`, `level-5-${ch}-13`, 1, {
          statement: 'Find the GCF of 84 and 120.',
          answer: num(12, '84=2²×3×7, 120=2³×3×5. GCF=2²×3=12'),
          hints: [
            hint(1, 'Factor both numbers, then take minimum powers of shared primes.', 'conceptual'),
            hint(2, '84=2²×3×7, 120=2³×3×5. Shared: 2(min 2), 3(min 1).', 'directional'),
            hint(3, 'GCF = 2²×3 = 4×3 = 12.', 'scaffolded'),
          ],
          solution: 'GCF(84,120) = 12',
          teachingPoint: '84=2²×3×7, 120=2³×3×5. Only 2 and 3 are shared. GCF = 2²×3 = 12.',
          tags: ['factors', 'gcf', 'boss'], difficulty: 5,
        }),
        problem(`problem-5-${ch}-13-2`, `level-5-${ch}-13`, 2, {
          statement: 'Find the LCM of 84 and 120.',
          answer: num(840, '84=2²×3×7, 120=2³×3×5. LCM=2³×3×5×7=840'),
          hints: [
            hint(1, 'Take the max power of every prime that appears.', 'conceptual'),
            hint(2, 'Primes: 2(max 3), 3(max 1), 5(max 1), 7(max 1).', 'directional'),
            hint(3, 'LCM = 8×3×5×7 = 840.', 'scaffolded'),
          ],
          solution: 'LCM(84,120) = 840',
          teachingPoint: 'LCM = 2³×3×5×7 = 840. Check: GCF×LCM = 12×840 = 10,080 = 84×120. It works!',
          tags: ['factors', 'lcm', 'boss'], difficulty: 5,
        }),
        problem(`problem-5-${ch}-13-3`, `level-5-${ch}-13`, 3, {
          category: 'working_backwards',
          statement: 'Two lights flash at different intervals. One flashes every 8 seconds, the other every 14 seconds. They flash together at time 0. After how many seconds do they flash together again?',
          answer: num(56, 'LCM(8,14) = 56'),
          hints: [
            hint(1, 'When do two repeating events sync up? That is an LCM problem.', 'conceptual'),
            hint(2, '8=2³, 14=2×7. LCM = 2³×7.', 'directional'),
            hint(3, 'LCM = 8×7 = 56 seconds.', 'scaffolded'),
          ],
          solution: 'LCM(8,14) = 56 seconds',
          teachingPoint: 'Synchronization = LCM. Every 56 seconds, both lights flash at the same moment.',
          tags: ['factors', 'lcm', 'word-problem', 'boss'], difficulty: 5,
        }),
      ]
    ),
  ];

  return {
    id: cid, worldId: 'world-5', number: ch, name: 'Factor Fjords',
    topic: 'factors-multiples', weekStart: 13, weekEnd: 15, levels,
    learningObjectives: [
      'Apply divisibility rules for 2-12',
      'Classify numbers as prime or composite',
      'Build factor trees and write prime factorizations',
      'Find GCF using prime factorization',
      'Find LCM using prime factorization',
      'Solve word problems using GCF and LCM',
    ],
    signatureContent: ['divisibility rules', 'prime classification', 'factor trees', 'GCF and LCM applications'],
    isBoss: true,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHAPTER 6 — Fraction Falls (14 levels)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function createChapter6() {
  const ch = 6, cid = `chapter-5-${ch}`;
  const levels = [
    // 1 — Finding Common Ground (teaching, 2)
    level(`level-5-${ch}-1`, cid, 1, 'Finding Common Ground', 'teaching', 2,
      'Prof. Owlbert stands before Fraction Falls. "To add fractions with different denominators, we first find a common denominator — using LCM!"',
      [
        problem(`problem-5-${ch}-1-1`, `level-5-${ch}-1`, 1, {
          statement: 'What is the LCD (Least Common Denominator) of 1/3 and 1/4?',
          answer: num(12, 'LCM(3,4) = 12'),
          hints: [
            hint(1, 'The LCD is the LCM of the two denominators.', 'conceptual'),
            hint(2, 'LCM(3, 4) = ? Multiples of 3: 3,6,9,12. Multiples of 4: 4,8,12.', 'directional'),
            hint(3, 'The first common multiple is 12. LCD = 12.', 'scaffolded'),
          ],
          solution: 'LCD = LCM(3,4) = 12',
          teachingPoint: 'The LCD (Least Common Denominator) is the LCM of the denominators. It is the smallest denominator both fractions can share.',
          tags: ['fractions', 'lcd', 'lcm'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-1-2`, `level-5-${ch}-1`, 2, {
          statement: 'What is the LCD of 2/5 and 3/10?',
          answer: num(10, 'LCM(5,10) = 10'),
          hints: [
            hint(1, 'Find LCM(5, 10).', 'conceptual'),
            hint(2, '10 is already a multiple of 5.', 'directional'),
            hint(3, 'LCD = 10. Rewrite 2/5 as 4/10.', 'scaffolded'),
          ],
          solution: 'LCD = 10',
          teachingPoint: 'When one denominator is a multiple of the other, the larger one IS the LCD. No extra work needed!',
          tags: ['fractions', 'lcd'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-1-3`, `level-5-${ch}-1`, 3, {
          statement: 'What is the LCD of 1/6 and 1/8?',
          answer: num(24, 'LCM(6,8) = 24'),
          hints: [
            hint(1, 'Find LCM(6, 8).', 'conceptual'),
            hint(2, '6=2×3, 8=2³. LCM = 2³×3 = 24.', 'directional'),
            hint(3, 'LCD = 24.', 'scaffolded'),
          ],
          solution: 'LCD = LCM(6,8) = 24',
          teachingPoint: 'LCM(6,8) = 24. To add 1/6 + 1/8: rewrite as 4/24 + 3/24 = 7/24.',
          tags: ['fractions', 'lcd', 'lcm'], difficulty: 2,
        }),
      ]
    ),

    // 2 — Unlike Denominator Addition (teaching, 2)
    level(`level-5-${ch}-2`, cid, 2, 'Unlike Denominator Addition', 'teaching', 2,
      'Lizzie demonstrates: "Convert to the LCD, then add the numerators. Keep the denominator!"',
      [
        problem(`problem-5-${ch}-2-1`, `level-5-${ch}-2`, 1, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Add: 1/3 + 1/4. Write your answer as a fraction (e.g., 7/12).',
          answer: txt('7/12', '4/12 + 3/12 = 7/12'),
          hints: [
            hint(1, 'Find the LCD first, then convert both fractions.', 'conceptual'),
            hint(2, 'LCD = 12. 1/3 = 4/12, 1/4 = 3/12.', 'directional'),
            hint(3, '4/12 + 3/12 = 7/12.', 'scaffolded'),
          ],
          solution: '1/3 + 1/4 = 4/12 + 3/12 = 7/12',
          teachingPoint: 'To add unlike-denominator fractions: (1) Find LCD, (2) Convert each fraction, (3) Add numerators, (4) Simplify if possible.',
          tags: ['fractions', 'addition', 'unlike-denominators'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-2-2`, `level-5-${ch}-2`, 2, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Add: 2/5 + 1/3. Write as a fraction.',
          answer: txt('11/15', '6/15 + 5/15 = 11/15'),
          hints: [
            hint(1, 'LCD of 5 and 3 is 15.', 'conceptual'),
            hint(2, '2/5 = 6/15, 1/3 = 5/15.', 'directional'),
            hint(3, '6/15 + 5/15 = 11/15.', 'scaffolded'),
          ],
          solution: '2/5 + 1/3 = 6/15 + 5/15 = 11/15',
          teachingPoint: 'Always find the LCD first. 2/5 + 1/3 = 6/15 + 5/15 = 11/15.',
          tags: ['fractions', 'addition', 'unlike-denominators'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-2-3`, `level-5-${ch}-2`, 3, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Add: 3/8 + 1/6. Write as a fraction and simplify.',
          answer: txt('13/24', '9/24 + 4/24 = 13/24'),
          hints: [
            hint(1, 'LCD of 8 and 6 = LCM(8,6) = 24.', 'conceptual'),
            hint(2, '3/8 = 9/24, 1/6 = 4/24.', 'directional'),
            hint(3, '9/24 + 4/24 = 13/24. Already simplified.', 'scaffolded'),
          ],
          solution: '3/8 + 1/6 = 9/24 + 4/24 = 13/24',
          teachingPoint: 'LCD(8,6) = 24. Convert, add, simplify. 13/24 cannot be simplified further (13 is prime).',
          tags: ['fractions', 'addition', 'unlike-denominators'], difficulty: 2,
        }),
      ]
    ),

    // 3 — Unlike Denominator Subtraction (practice, 2)
    level(`level-5-${ch}-3`, cid, 3, 'Unlike Denominator Subtraction', 'practice', 2,
      'Grogg subtracts fractions. "Same process as addition — just subtract the numerators instead!"',
      [
        problem(`problem-5-${ch}-3-1`, `level-5-${ch}-3`, 1, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Subtract: 3/4 - 1/3. Write as a fraction.',
          answer: txt('5/12', '9/12 - 4/12 = 5/12'),
          hints: [
            hint(1, 'Find the LCD of 4 and 3.', 'conceptual'),
            hint(2, 'LCD = 12. 3/4 = 9/12, 1/3 = 4/12.', 'directional'),
            hint(3, '9/12 - 4/12 = 5/12.', 'scaffolded'),
          ],
          solution: '3/4 - 1/3 = 9/12 - 4/12 = 5/12',
          teachingPoint: 'Subtraction works the same as addition: find LCD, convert, subtract numerators.',
          tags: ['fractions', 'subtraction', 'unlike-denominators'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-3-2`, `level-5-${ch}-3`, 2, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Subtract: 5/6 - 1/4. Simplify your answer.',
          answer: txt('7/12', '10/12 - 3/12 = 7/12'),
          hints: [
            hint(1, 'LCD of 6 and 4 = 12.', 'conceptual'),
            hint(2, '5/6 = 10/12, 1/4 = 3/12.', 'directional'),
            hint(3, '10/12 - 3/12 = 7/12.', 'scaffolded'),
          ],
          solution: '5/6 - 1/4 = 10/12 - 3/12 = 7/12',
          teachingPoint: '5/6 - 1/4 = 10/12 - 3/12 = 7/12. Always simplify your final answer.',
          tags: ['fractions', 'subtraction', 'unlike-denominators'], difficulty: 2,
        }),
        problem(`problem-5-${ch}-3-3`, `level-5-${ch}-3`, 3, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Subtract: 7/10 - 2/5. Simplify.',
          answer: txt('3/10', '7/10 - 4/10 = 3/10'),
          hints: [
            hint(1, 'LCD of 10 and 5 = 10.', 'conceptual'),
            hint(2, '2/5 = 4/10. Now subtract from 7/10.', 'directional'),
            hint(3, '7/10 - 4/10 = 3/10.', 'scaffolded'),
          ],
          solution: '7/10 - 2/5 = 7/10 - 4/10 = 3/10',
          teachingPoint: 'When one denominator divides the other, use the larger as LCD. 7/10 - 2/5 = 7/10 - 4/10 = 3/10.',
          tags: ['fractions', 'subtraction'], difficulty: 2,
        }),
      ]
    ),

    // 4 — Mixed Number Addition (teaching, 3)
    level(`level-5-${ch}-4`, cid, 4, 'Mixed Number Addition', 'teaching', 3,
      'Prof. Owlbert works with mixed numbers. "Add the whole parts separately, then the fraction parts. Watch out for regrouping!"',
      [
        problem(`problem-5-${ch}-4-1`, `level-5-${ch}-4`, 1, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Add: 2 1/3 + 1 1/4. Write as a mixed number.',
          answer: txt('3 7/12', '2+1=3, 1/3+1/4=7/12. Answer: 3 7/12'),
          hints: [
            hint(1, 'Add whole numbers separately from fractions.', 'conceptual'),
            hint(2, 'Wholes: 2+1=3. Fractions: 1/3+1/4 = 4/12+3/12 = 7/12.', 'directional'),
            hint(3, '3 + 7/12 = 3 7/12.', 'scaffolded'),
          ],
          solution: '2 1/3 + 1 1/4 = 3 7/12',
          teachingPoint: 'Add mixed numbers: add whole parts and fraction parts separately. If the fraction sum exceeds 1, regroup.',
          tags: ['fractions', 'mixed-numbers', 'addition'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-4-2`, `level-5-${ch}-4`, 2, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Add: 3 2/3 + 2 5/6. Write as a mixed number.',
          answer: txt('6 1/2', '3+2=5, 2/3+5/6=4/6+5/6=9/6=1 3/6=1 1/2. Total: 6 1/2'),
          hints: [
            hint(1, 'The fraction sum may exceed 1 — you will need to regroup.', 'conceptual'),
            hint(2, '2/3+5/6 = 4/6+5/6 = 9/6 = 1 3/6 = 1 1/2.', 'directional'),
            hint(3, '5 + 1 1/2 = 6 1/2.', 'scaffolded'),
          ],
          solution: '3 2/3 + 2 5/6 = 6 1/2',
          teachingPoint: 'When the fraction parts sum to more than 1, regroup: 9/6 = 1 3/6 = 1 1/2. Add the extra 1 to the whole number part.',
          tags: ['fractions', 'mixed-numbers', 'regrouping'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-4-3`, `level-5-${ch}-4`, 3, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Add: 4 3/4 + 1 1/2.',
          answer: txt('6 1/4', '4+1=5, 3/4+1/2=3/4+2/4=5/4=1 1/4. Total: 6 1/4'),
          hints: [
            hint(1, 'LCD of 4 and 2 is 4.', 'conceptual'),
            hint(2, '3/4 + 2/4 = 5/4 = 1 1/4. Add to 5.', 'directional'),
            hint(3, '5 + 1 1/4 = 6 1/4.', 'scaffolded'),
          ],
          solution: '4 3/4 + 1 1/2 = 6 1/4',
          teachingPoint: '3/4 + 1/2 = 3/4 + 2/4 = 5/4 = 1 1/4. Regroup: 5 + 1 1/4 = 6 1/4.',
          tags: ['fractions', 'mixed-numbers', 'regrouping'], difficulty: 3,
        }),
      ]
    ),

    // 5 — Mixed Number Subtraction (practice, 3)
    level(`level-5-${ch}-5`, cid, 5, 'Mixed Number Subtraction', 'practice', 3,
      'Lizzie warns: "Subtracting mixed numbers can require borrowing — just like whole number subtraction!"',
      [
        problem(`problem-5-${ch}-5-1`, `level-5-${ch}-5`, 1, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Subtract: 5 3/4 - 2 1/4.',
          answer: txt('3 1/2', '5-2=3, 3/4-1/4=2/4=1/2. Answer: 3 1/2'),
          hints: [
            hint(1, 'Same denominator — just subtract whole parts and fraction parts.', 'conceptual'),
            hint(2, '5-2=3, 3/4-1/4=2/4=1/2.', 'directional'),
            hint(3, '3 1/2.', 'scaffolded'),
          ],
          solution: '5 3/4 - 2 1/4 = 3 1/2',
          teachingPoint: 'When the first fraction is larger, no borrowing needed. Just subtract both parts.',
          tags: ['fractions', 'mixed-numbers', 'subtraction'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-5-2`, `level-5-${ch}-5`, 2, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Subtract: 4 1/6 - 1 2/3. (You will need to borrow!)',
          answer: txt('2 1/2', '4 1/6 - 1 4/6. Borrow: 3 7/6 - 1 4/6 = 2 3/6 = 2 1/2'),
          hints: [
            hint(1, 'Convert to LCD first: 1/6 and 2/3 → both sixths. Then check if you need to borrow.', 'conceptual'),
            hint(2, '4 1/6 - 1 4/6. Since 1/6 < 4/6, borrow 1 from 4 → 3 7/6.', 'directional'),
            hint(3, '3 7/6 - 1 4/6 = 2 3/6 = 2 1/2.', 'scaffolded'),
          ],
          solution: '4 1/6 - 1 2/3 = 2 1/2',
          teachingPoint: 'When the fraction you are subtracting is larger, borrow 1 from the whole number and add it to the fraction as LCD/LCD.',
          tags: ['fractions', 'mixed-numbers', 'borrowing'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-5-3`, `level-5-${ch}-5`, 3, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Subtract: 6 1/4 - 3 3/4.',
          answer: txt('2 1/2', '6 1/4 - 3 3/4. Borrow: 5 5/4 - 3 3/4 = 2 2/4 = 2 1/2'),
          hints: [
            hint(1, '1/4 < 3/4, so you need to borrow from the 6.', 'conceptual'),
            hint(2, '6 1/4 = 5 5/4. Now subtract: 5 5/4 - 3 3/4.', 'directional'),
            hint(3, '5 5/4 - 3 3/4 = 2 2/4 = 2 1/2.', 'scaffolded'),
          ],
          solution: '6 1/4 - 3 3/4 = 2 1/2',
          teachingPoint: 'Borrowing with fractions: take 1 from the whole number and add 4/4 (or LCD/LCD) to the fraction part.',
          tags: ['fractions', 'mixed-numbers', 'borrowing'], difficulty: 3,
        }),
      ]
    ),

    // 6 — Fraction × Fraction (teaching, 3)
    level(`level-5-${ch}-6`, cid, 6, 'Fraction × Fraction', 'teaching', 3,
      'Prof. Owlbert introduces multiplication. "To multiply fractions: multiply the tops, multiply the bottoms. No LCD needed!"',
      [
        problem(`problem-5-${ch}-6-1`, `level-5-${ch}-6`, 1, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Multiply: 2/3 × 3/4.',
          answer: txt('1/2', '6/12 = 1/2'),
          hints: [
            hint(1, 'Multiply numerators: 2×3. Multiply denominators: 3×4. Then simplify.', 'conceptual'),
            hint(2, '(2×3)/(3×4) = 6/12.', 'directional'),
            hint(3, '6/12 = 1/2.', 'scaffolded'),
          ],
          solution: '2/3 × 3/4 = 6/12 = 1/2',
          teachingPoint: 'Multiply fractions: top × top, bottom × bottom. Then simplify! 2/3 × 3/4 = 6/12 = 1/2.',
          tags: ['fractions', 'multiplication'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-6-2`, `level-5-${ch}-6`, 2, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Multiply: 4/5 × 1/2.',
          answer: txt('2/5', '4/10 = 2/5'),
          hints: [
            hint(1, 'Multiply tops and bottoms.', 'conceptual'),
            hint(2, '(4×1)/(5×2) = 4/10.', 'directional'),
            hint(3, '4/10 = 2/5.', 'scaffolded'),
          ],
          solution: '4/5 × 1/2 = 4/10 = 2/5',
          teachingPoint: 'You can also cross-cancel before multiplying: 4/5 × 1/2 → cancel 4 and 2 → 2/5 directly!',
          tags: ['fractions', 'multiplication', 'simplification'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-6-3`, `level-5-${ch}-6`, 3, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Multiply: 3/8 × 4/9. Simplify your answer.',
          answer: txt('1/6', '12/72 = 1/6'),
          hints: [
            hint(1, 'Multiply tops and bottoms, then simplify.', 'conceptual'),
            hint(2, '(3×4)/(8×9) = 12/72. GCF(12,72) = 12.', 'directional'),
            hint(3, '12/72 = 1/6.', 'scaffolded'),
          ],
          solution: '3/8 × 4/9 = 12/72 = 1/6',
          teachingPoint: 'Cross-cancel first to avoid big numbers: 3/8 × 4/9 → cancel 3&9 (÷3) and 4&8 (÷4) → 1/2 × 1/3 = 1/6.',
          tags: ['fractions', 'multiplication', 'cross-cancel'], difficulty: 3,
        }),
      ]
    ),

    // 7 — Multiplication Practice (practice, 3)
    level(`level-5-${ch}-7`, cid, 7, 'Multiplication Practice', 'practice', 3,
      'Grogg practices multiplying fractions, whole numbers, and mixed numbers.',
      [
        problem(`problem-5-${ch}-7-1`, `level-5-${ch}-7`, 1, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Multiply: 5 × 2/3. Write as a mixed number.',
          answer: txt('3 1/3', '10/3 = 3 1/3'),
          hints: [
            hint(1, 'Write 5 as 5/1, then multiply.', 'conceptual'),
            hint(2, '(5×2)/(1×3) = 10/3.', 'directional'),
            hint(3, '10/3 = 3 1/3.', 'scaffolded'),
          ],
          solution: '5 × 2/3 = 10/3 = 3 1/3',
          teachingPoint: 'To multiply a whole number by a fraction, write the whole number as a fraction over 1.',
          tags: ['fractions', 'multiplication', 'whole-number'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-7-2`, `level-5-${ch}-7`, 2, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Multiply: 1 1/2 × 2/3. (Convert to improper first.)',
          answer: txt('1', '3/2 × 2/3 = 6/6 = 1'),
          hints: [
            hint(1, 'Convert 1 1/2 to an improper fraction first.', 'conceptual'),
            hint(2, '1 1/2 = 3/2. Now multiply: 3/2 × 2/3.', 'directional'),
            hint(3, '(3×2)/(2×3) = 6/6 = 1.', 'scaffolded'),
          ],
          solution: '1 1/2 × 2/3 = 3/2 × 2/3 = 1',
          teachingPoint: 'Reciprocals multiply to 1! 3/2 × 2/3 = 1. Two fractions are reciprocals if one is the other "flipped."',
          tags: ['fractions', 'multiplication', 'reciprocals'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-7-3`, `level-5-${ch}-7`, 3, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Multiply: 2 1/4 × 1 1/3.',
          answer: txt('3', '9/4 × 4/3 = 36/12 = 3'),
          hints: [
            hint(1, 'Convert both to improper fractions.', 'conceptual'),
            hint(2, '2 1/4 = 9/4, 1 1/3 = 4/3. Now multiply.', 'directional'),
            hint(3, '(9×4)/(4×3) = 36/12 = 3.', 'scaffolded'),
          ],
          solution: '2 1/4 × 1 1/3 = 9/4 × 4/3 = 3',
          teachingPoint: 'Always convert mixed numbers to improper fractions before multiplying. Then simplify (or cross-cancel first).',
          tags: ['fractions', 'multiplication', 'mixed-numbers'], difficulty: 3,
        }),
      ]
    ),

    // 8 — Multiplication Reasoning (challenge, 3)
    level(`level-5-${ch}-8`, cid, 8, 'Multiplication Reasoning', 'challenge', 3,
      'Lizzie thinks about what fraction multiplication MEANS. "Does multiplying always make things bigger?"',
      [
        problem(`problem-5-${ch}-8-1`, `level-5-${ch}-8`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'compare_without_calc',
          statement: 'Without calculating: Is 2/3 × 5 greater than, less than, or equal to 5? A) Greater B) Less C) Equal',
          answer: mc('B) Less', 'B — Multiplying by 2/3 (less than 1) makes the result smaller than 5'),
          hints: [
            hint(1, 'What happens when you multiply by a number less than 1?', 'conceptual'),
            hint(2, '2/3 < 1, so 2/3 of 5 is less than all of 5.', 'directional'),
            hint(3, 'Multiplying by a fraction less than 1 always gives a result less than the original number.', 'scaffolded'),
          ],
          solution: '2/3 × 5 < 5 because 2/3 < 1.',
          teachingPoint: 'Multiplying by a fraction less than 1 gives a smaller result. Multiplying by a fraction greater than 1 gives a larger result.',
          tags: ['fractions', 'multiplication', 'reasoning', 'compare-without-calc'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-8-2`, `level-5-${ch}-8`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'compare_without_calc',
          statement: 'Without calculating: Is 5/4 × 8 greater than, less than, or equal to 8? A) Greater B) Less C) Equal',
          answer: mc('A) Greater', 'A — 5/4 > 1, so multiplying by it gives a result greater than 8'),
          hints: [
            hint(1, 'Is 5/4 greater or less than 1?', 'conceptual'),
            hint(2, '5/4 = 1.25 > 1. Multiplying by more than 1 increases the number.', 'directional'),
            hint(3, '5/4 × 8 = 10 > 8. Confirmed: multiplying by > 1 increases.', 'scaffolded'),
          ],
          solution: '5/4 > 1, so 5/4 × 8 > 8.',
          teachingPoint: 'Fraction > 1 means the product is bigger than the original. Fraction < 1 means smaller. Fraction = 1 means the same.',
          tags: ['fractions', 'multiplication', 'reasoning', 'compare-without-calc'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-8-3`, `level-5-${ch}-8`, 3, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'compare_without_calc',
          statement: 'Without calculating: Which is larger, 3/4 × 3/4 or 3/4? A) 3/4 × 3/4 B) 3/4 C) They are equal',
          answer: mc('B) 3/4', 'B — Multiplying 3/4 by itself (a number less than 1) gives a smaller result'),
          hints: [
            hint(1, 'If you take 3/4 of 3/4, is that more or less than 3/4?', 'conceptual'),
            hint(2, '3/4 < 1, so 3/4 × 3/4 < 3/4.', 'directional'),
            hint(3, '3/4 × 3/4 = 9/16 ≈ 0.5625 < 3/4 = 0.75.', 'scaffolded'),
          ],
          solution: '3/4 × 3/4 = 9/16 < 3/4 = 12/16.',
          teachingPoint: 'Squaring a fraction less than 1 makes it even smaller. 3/4 × 3/4 = 9/16, which is less than 3/4 = 12/16.',
          tags: ['fractions', 'multiplication', 'reasoning', 'compare-without-calc'], difficulty: 3,
        }),
      ]
    ),

    // 9 — Dividing by Fractions (teaching, 3)
    level(`level-5-${ch}-9`, cid, 9, 'Dividing by Fractions', 'teaching', 3,
      'Prof. Owlbert reveals the secret: "Dividing by a fraction is the same as multiplying by its reciprocal — the flipped version!"',
      [
        problem(`problem-5-${ch}-9-1`, `level-5-${ch}-9`, 1, {
          statement: 'How many 1/3s are in 2? (Calculate 2 ÷ 1/3)',
          answer: num(6, '2 ÷ 1/3 = 2 × 3 = 6'),
          hints: [
            hint(1, 'Dividing by 1/3 asks "how many thirds fit in 2?"', 'conceptual'),
            hint(2, 'Invert and multiply: 2 ÷ 1/3 = 2 × 3/1 = 2 × 3.', 'directional'),
            hint(3, '2 × 3 = 6. There are 6 thirds in 2.', 'scaffolded'),
          ],
          solution: '2 ÷ 1/3 = 2 × 3 = 6',
          teachingPoint: 'To divide by a fraction, multiply by its reciprocal (flip the fraction). 2 ÷ 1/3 = 2 × 3/1 = 6.',
          tags: ['fractions', 'division', 'reciprocal'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-9-2`, `level-5-${ch}-9`, 2, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Divide: 3/4 ÷ 1/2. Write as a fraction or whole number.',
          answer: txt('3/2', '3/4 × 2/1 = 6/4 = 3/2'),
          hints: [
            hint(1, 'Invert and multiply: 3/4 × 2/1.', 'conceptual'),
            hint(2, '(3×2)/(4×1) = 6/4.', 'directional'),
            hint(3, '6/4 = 3/2 = 1 1/2.', 'scaffolded'),
          ],
          solution: '3/4 ÷ 1/2 = 3/4 × 2 = 3/2',
          teachingPoint: 'Invert and multiply: flip the divisor (1/2 → 2/1) and multiply. 3/4 × 2 = 6/4 = 3/2.',
          tags: ['fractions', 'division', 'reciprocal'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-9-3`, `level-5-${ch}-9`, 3, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Divide: 2/3 ÷ 4/5.',
          answer: txt('5/6', '2/3 × 5/4 = 10/12 = 5/6'),
          hints: [
            hint(1, 'Flip 4/5 to get 5/4, then multiply.', 'conceptual'),
            hint(2, '2/3 × 5/4 = 10/12.', 'directional'),
            hint(3, '10/12 = 5/6.', 'scaffolded'),
          ],
          solution: '2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6',
          teachingPoint: 'Steps: (1) Keep the first fraction, (2) Change ÷ to ×, (3) Flip the second fraction. 2/3 ÷ 4/5 = 2/3 × 5/4 = 5/6.',
          tags: ['fractions', 'division'], difficulty: 3,
        }),
      ]
    ),

    // 10 — Fraction Division Practice (practice, 3)
    level(`level-5-${ch}-10`, cid, 10, 'Fraction Division Practice', 'practice', 3,
      'Grogg practices: "Keep, Change, Flip! I love this method!"',
      [
        problem(`problem-5-${ch}-10-1`, `level-5-${ch}-10`, 1, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Divide: 5/6 ÷ 2/3.',
          answer: txt('5/4', '5/6 × 3/2 = 15/12 = 5/4'),
          hints: [
            hint(1, 'Flip 2/3 → 3/2, then multiply.', 'conceptual'),
            hint(2, '5/6 × 3/2 = 15/12.', 'directional'),
            hint(3, '15/12 = 5/4 = 1 1/4.', 'scaffolded'),
          ],
          solution: '5/6 ÷ 2/3 = 5/6 × 3/2 = 5/4',
          teachingPoint: '5/6 ÷ 2/3 = 5/6 × 3/2. Cross-cancel 6 and 3 (÷3): 5/2 × 1/2... actually 5/6 × 3/2 = 15/12 = 5/4.',
          tags: ['fractions', 'division', 'practice'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-10-2`, `level-5-${ch}-10`, 2, {
          type: 'text_input', inputType: 'text_field',
          statement: 'Divide: 1 1/2 ÷ 3/4. Convert to improper first.',
          answer: txt('2', '3/2 ÷ 3/4 = 3/2 × 4/3 = 12/6 = 2'),
          hints: [
            hint(1, '1 1/2 = 3/2. Now divide: 3/2 ÷ 3/4.', 'conceptual'),
            hint(2, '3/2 × 4/3 = 12/6.', 'directional'),
            hint(3, '12/6 = 2.', 'scaffolded'),
          ],
          solution: '1 1/2 ÷ 3/4 = 3/2 × 4/3 = 2',
          teachingPoint: 'Always convert mixed numbers to improper fractions before dividing. Then keep-change-flip.',
          tags: ['fractions', 'division', 'mixed-numbers'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-10-3`, `level-5-${ch}-10`, 3, {
          statement: 'A recipe uses 3/4 cup of flour per batch. How many batches can you make with 6 cups of flour?',
          answer: num(8, '6 ÷ 3/4 = 6 × 4/3 = 24/3 = 8'),
          hints: [
            hint(1, 'Divide total flour by flour per batch.', 'conceptual'),
            hint(2, '6 ÷ 3/4 = 6 × 4/3.', 'directional'),
            hint(3, '6 × 4/3 = 24/3 = 8 batches.', 'scaffolded'),
          ],
          solution: '6 ÷ 3/4 = 8 batches',
          teachingPoint: 'Fraction division in context: "How many 3/4s fit in 6?" = 6 ÷ 3/4 = 8. Dividing by a fraction less than 1 gives a BIGGER number!',
          tags: ['fractions', 'division', 'word-problem'], difficulty: 3,
        }),
      ]
    ),

    // 11 — Grogg's Fraction Mistakes (challenge, 3)
    level(`level-5-${ch}-11`, cid, 11, "Grogg's Fraction Mistakes", 'challenge', 3,
      'Grogg shows his fraction work. "I think these are right!" Spot his classic mistakes.',
      [
        problem(`problem-5-${ch}-11-1`, `level-5-${ch}-11`, 1, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'find_the_error',
          statement: 'Grogg says: 1/3 + 1/4 = 2/7 (he added numerators AND denominators). What is the correct answer? A) 2/7 B) 7/12 C) 1/7 D) 4/7',
          answer: mc('B) 7/12', 'B — You cannot add numerators and denominators separately; you need a common denominator'),
          hints: [
            hint(1, 'You cannot add fractions by adding tops and bottoms separately.', 'conceptual'),
            hint(2, 'Find LCD(3,4) = 12. Convert: 4/12 + 3/12 = 7/12.', 'directional'),
            hint(3, '1/3 + 1/4 = 7/12, not 2/7.', 'scaffolded'),
          ],
          solution: '1/3 + 1/4 = 7/12',
          teachingPoint: 'The most common fraction error! You CANNOT add numerators and denominators separately. You MUST find a common denominator first.',
          tags: ['fractions', 'find-the-error', 'addition'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-11-2`, `level-5-${ch}-11`, 2, {
          type: 'multiple_choice', inputType: 'multiple_choice', category: 'find_the_error',
          statement: 'Grogg divides 3/5 ÷ 2/7 by flipping the FIRST fraction: 5/3 × 2/7 = 10/21. What is the correct answer? A) 10/21 B) 21/10 C) 6/35 D) 35/6',
          answer: mc('B) 21/10', 'B — Flip the SECOND fraction (divisor), not the first. 3/5 × 7/2 = 21/10'),
          hints: [
            hint(1, 'In "Keep, Change, Flip" — which fraction do you flip?', 'conceptual'),
            hint(2, 'Flip the SECOND fraction (the divisor): 2/7 → 7/2.', 'directional'),
            hint(3, '3/5 × 7/2 = 21/10. Grogg flipped the wrong one.', 'scaffolded'),
          ],
          solution: '3/5 ÷ 2/7 = 3/5 × 7/2 = 21/10',
          teachingPoint: 'Flip the DIVISOR (second fraction), not the dividend (first). 3/5 ÷ 2/7 = 3/5 × 7/2 = 21/10.',
          tags: ['fractions', 'find-the-error', 'division'], difficulty: 3,
        }),
        problem(`problem-5-${ch}-11-3`, `level-5-${ch}-11`, 3, {
          type: 'text_input', inputType: 'text_field', category: 'find_the_error',
          statement: 'Grogg multiplies: 2/3 × 4/5 = 8/15. Is this correct? Write "correct" or the right answer.',
          answer: txt('correct', 'Grogg is right: 2/3 × 4/5 = (2×4)/(3×5) = 8/15'),
          hints: [
            hint(1, 'For multiplication, you DO multiply tops and bottoms.', 'conceptual'),
            hint(2, '(2×4)/(3×5) = 8/15. Is this what Grogg got?', 'directional'),
            hint(3, 'Yes, 8/15 is correct! Grogg can multiply fractions.', 'scaffolded'),
          ],
          solution: 'Correct! 2/3 × 4/5 = 8/15.',
          teachingPoint: 'Not every problem has an error! Fraction multiplication IS "multiply tops and bottoms." The error occurs only in addition/subtraction.',
          tags: ['fractions', 'find-the-error', 'multiplication'], difficulty: 3,
        }),
      ]
    ),

    // 12 — Fraction Word Problems (practice, 4)
    level(`level-5-${ch}-12`, cid, 12, 'Fraction Word Problems', 'practice', 4,
      'Real-world fraction problems. "Recipes, distances, sharing — fractions are everywhere!"',
      [
        problem(`problem-5-${ch}-12-1`, `level-5-${ch}-12`, 1, {
          type: 'text_input', inputType: 'text_field', category: 'strategic_practice',
          statement: 'A recipe calls for 2/3 cup of sugar. You want to make 1 1/2 times the recipe. How much sugar do you need? Write as a fraction.',
          answer: txt('1', '2/3 × 3/2 = 1 cup'),
          hints: [
            hint(1, 'Multiply the amount by 1 1/2 (or 3/2).', 'conceptual'),
            hint(2, '2/3 × 3/2 = ?', 'directional'),
            hint(3, '2/3 × 3/2 = 6/6 = 1 cup.', 'scaffolded'),
          ],
          solution: '2/3 × 3/2 = 1 cup',
          teachingPoint: 'Scaling recipes: multiply each ingredient by the scaling factor. 2/3 cup × 1.5 = 1 cup.',
          tags: ['fractions', 'word-problem', 'recipes'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-12-2`, `level-5-${ch}-12`, 2, {
          type: 'text_input', inputType: 'text_field', category: 'strategic_practice',
          statement: 'Sam walked 3/4 mile. Tia walked 2/3 mile. How much farther did Sam walk? Write as a fraction.',
          answer: txt('1/12', '3/4 - 2/3 = 9/12 - 8/12 = 1/12'),
          hints: [
            hint(1, 'Subtract the distances: 3/4 - 2/3.', 'conceptual'),
            hint(2, 'LCD = 12. 3/4 = 9/12, 2/3 = 8/12.', 'directional'),
            hint(3, '9/12 - 8/12 = 1/12 mile farther.', 'scaffolded'),
          ],
          solution: '3/4 - 2/3 = 1/12 mile',
          teachingPoint: 'Comparing amounts with fractions requires subtraction with common denominators.',
          tags: ['fractions', 'word-problem', 'subtraction'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-12-3`, `level-5-${ch}-12`, 3, {
          type: 'text_input', inputType: 'text_field', category: 'strategic_practice',
          statement: 'A board is 5 1/4 feet long. You cut off 2 2/3 feet. How long is the remaining piece?',
          answer: txt('2 7/12', '5 3/12 - 2 8/12. Borrow: 4 15/12 - 2 8/12 = 2 7/12'),
          hints: [
            hint(1, 'Subtract the mixed numbers: 5 1/4 - 2 2/3.', 'conceptual'),
            hint(2, 'LCD=12. 5 3/12 - 2 8/12. Need to borrow since 3/12 < 8/12.', 'directional'),
            hint(3, '4 15/12 - 2 8/12 = 2 7/12 feet.', 'scaffolded'),
          ],
          solution: '5 1/4 - 2 2/3 = 2 7/12 feet',
          teachingPoint: 'Multi-step fraction word problems often require borrowing. Convert to LCD, borrow if needed, then subtract.',
          tags: ['fractions', 'word-problem', 'mixed-numbers', 'borrowing'], difficulty: 4,
        }),
      ]
    ),

    // 13 — Fraction Puzzles (challenge, 4)
    level(`level-5-${ch}-13`, cid, 13, 'Fraction Puzzles', 'challenge', 4,
      'Admiral Axiom poses fraction riddles. "Two fractions multiply to give one number and add to give another. Can you find them?"',
      [
        problem(`problem-5-${ch}-13-1`, `level-5-${ch}-13`, 1, {
          category: 'working_backwards', type: 'text_input', inputType: 'text_field',
          statement: 'Two fractions multiply to 1/6 and one of them is 1/2. What is the other fraction?',
          answer: txt('1/3', '1/2 × ? = 1/6. ? = 1/6 ÷ 1/2 = 1/6 × 2 = 2/6 = 1/3'),
          hints: [
            hint(1, 'If 1/2 × ? = 1/6, divide both sides by 1/2.', 'conceptual'),
            hint(2, '? = 1/6 ÷ 1/2 = 1/6 × 2/1.', 'directional'),
            hint(3, '1/6 × 2 = 2/6 = 1/3.', 'scaffolded'),
          ],
          solution: 'Other = 1/6 ÷ 1/2 = 1/3',
          teachingPoint: 'To find a missing factor: divide the product by the known factor. This uses fraction division (invert and multiply).',
          tags: ['fractions', 'working-backwards', 'division'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-13-2`, `level-5-${ch}-13`, 2, {
          category: 'working_backwards', type: 'text_input', inputType: 'text_field',
          statement: 'Find a fraction between 1/3 and 1/2. (Hint: find equivalent fractions with the same denominator.)',
          answer: txt('5/12', 'LCD(3,2)=6. 1/3=2/6, 1/2=3/6. Between: use LCD=12: 4/12 and 6/12, so 5/12.'),
          hints: [
            hint(1, 'Convert both to fractions with a larger common denominator.', 'conceptual'),
            hint(2, '1/3 = 4/12, 1/2 = 6/12. Pick a numerator between 4 and 6.', 'directional'),
            hint(3, '5/12 is between 4/12 and 6/12, so between 1/3 and 1/2.', 'scaffolded'),
          ],
          solution: '5/12 (between 4/12 and 6/12)',
          teachingPoint: 'To find a fraction between two fractions: convert to the same denominator and pick a numerator in between. You can always find more by using a larger denominator!',
          tags: ['fractions', 'between', 'reasoning'], difficulty: 4,
        }),
        problem(`problem-5-${ch}-13-3`, `level-5-${ch}-13`, 3, {
          category: 'working_backwards', type: 'text_input', inputType: 'text_field',
          statement: 'I divide a number by 2/5 and get 10. What was the original number?',
          answer: txt('4', 'n ÷ 2/5 = 10, so n = 10 × 2/5 = 20/5 = 4'),
          hints: [
            hint(1, 'If n ÷ 2/5 = 10, then n = 10 × 2/5.', 'conceptual'),
            hint(2, '10 × 2/5 = 20/5.', 'directional'),
            hint(3, '20/5 = 4.', 'scaffolded'),
          ],
          solution: 'n = 10 × 2/5 = 4',
          teachingPoint: 'To undo division by a fraction, multiply by that fraction. n ÷ 2/5 = 10 → n = 10 × 2/5 = 4.',
          tags: ['fractions', 'working-backwards', 'division'], difficulty: 4,
        }),
      ]
    ),

    // 14 — Guardian of Fraction Falls (boss, 5)
    level(`level-5-${ch}-14`, cid, 14, 'Guardian of Fraction Falls', 'boss', 5,
      'The Guardian of Fraction Falls towers over you! "All fraction operations — add, subtract, multiply, divide. Show me everything!"',
      [
        problem(`problem-5-${ch}-14-1`, `level-5-${ch}-14`, 1, {
          type: 'text_input', inputType: 'text_field', category: 'thinking',
          statement: 'Calculate: 2 1/3 + 1 3/4 - 1 1/6. Write as a mixed number.',
          answer: txt('2 11/12', 'LCD=12. 2 4/12 + 1 9/12 - 1 2/12 = 3 13/12 - 1 2/12 = 2 11/12'),
          hints: [
            hint(1, 'Convert all fractions to LCD = 12, then compute left to right.', 'conceptual'),
            hint(2, '2 4/12 + 1 9/12 = 3 13/12 = 4 1/12. Then subtract 1 2/12.', 'directional'),
            hint(3, '4 1/12 - 1 2/12. Borrow: 3 13/12 - 1 2/12 = 2 11/12.', 'scaffolded'),
          ],
          solution: '2 1/3 + 1 3/4 - 1 1/6 = 2 11/12',
          teachingPoint: 'Multi-step fraction problems: convert to LCD, work left to right, borrow when needed.',
          tags: ['fractions', 'multi-step', 'boss'], difficulty: 5,
        }),
        problem(`problem-5-${ch}-14-2`, `level-5-${ch}-14`, 2, {
          type: 'text_input', inputType: 'text_field', category: 'thinking',
          statement: 'Calculate: 3/4 × 2/3 ÷ 1/2.',
          answer: txt('1', '3/4 × 2/3 = 1/2. Then 1/2 ÷ 1/2 = 1'),
          hints: [
            hint(1, 'Work left to right: multiply first, then divide.', 'conceptual'),
            hint(2, '3/4 × 2/3 = 6/12 = 1/2. Then 1/2 ÷ 1/2.', 'directional'),
            hint(3, '1/2 ÷ 1/2 = 1/2 × 2/1 = 1.', 'scaffolded'),
          ],
          solution: '3/4 × 2/3 ÷ 1/2 = 1/2 ÷ 1/2 = 1',
          teachingPoint: 'With multiplication and division of fractions, work left to right. 3/4 × 2/3 = 1/2, then ÷ 1/2 = 1.',
          tags: ['fractions', 'multi-step', 'boss'], difficulty: 5,
        }),
        problem(`problem-5-${ch}-14-3`, `level-5-${ch}-14`, 3, {
          category: 'working_backwards',
          statement: 'A tank is 3/4 full. After using 1/3 of the water in the tank, what fraction of the tank is still full?',
          answer: txt('1/2', 'Used 1/3 of 3/4 = 1/4. Remaining = 3/4 - 1/4 = 2/4 = 1/2'),
          hints: [
            hint(1, '"1/3 of the water" means 1/3 × 3/4.', 'conceptual'),
            hint(2, '1/3 × 3/4 = 1/4 used. Remaining = 3/4 - 1/4.', 'directional'),
            hint(3, '3/4 - 1/4 = 2/4 = 1/2. The tank is half full.', 'scaffolded'),
          ],
          solution: 'Used = 1/3 × 3/4 = 1/4. Remaining = 3/4 - 1/4 = 1/2.',
          teachingPoint: '"1/3 of the water" means multiply: 1/3 × 3/4 = 1/4. Then subtract from the original: 3/4 - 1/4 = 1/2.',
          tags: ['fractions', 'word-problem', 'multi-step', 'boss'], difficulty: 5,
          type: 'text_input', inputType: 'text_field',
        }),
      ]
    ),
  ];

  return {
    id: cid, worldId: 'world-5', number: ch, name: 'Fraction Falls',
    topic: 'fractions', weekStart: 16, weekEnd: 18, levels,
    learningObjectives: [
      'Add and subtract fractions with unlike denominators using LCD',
      'Add and subtract mixed numbers with regrouping/borrowing',
      'Multiply fractions and mixed numbers',
      'Divide fractions using the reciprocal method',
      'Solve multi-step fraction word problems',
    ],
    signatureContent: ['LCD', 'mixed number arithmetic', 'fraction multiplication', 'invert-and-multiply'],
    isBoss: true,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function createChapters4to6() {
  return [createChapter4(), createChapter5(), createChapter6()];
}
