/**
 * World 5 Chapters 10-12: Percent Peninsula, Square Root Summit, Exponent Expanse
 * 39 levels, 117 problems
 */
function mc(v, d) { return { value: v, displayValue: d || v }; }
function num(v, d) { return { value: Number(v), displayValue: d || String(v) }; }
function txt(v, d) { return { value: v, displayValue: d || v }; }
function hint(t, text, type) { return { tier: t, cost: [0,0,1,2][t], text, type }; }
function prob(id, lid, seq, o) {
  return { id, levelId: lid, sequence: seq, type: o.type||'numeric_input', category: o.cat||'thinking',
    statement: o.s, inputType: o.inp||'number_pad', correctAnswer: o.a, hints: o.h,
    solutionExplanation: o.sol, teachingPoint: o.tp, tags: o.tags||[], difficulty: o.d||2 };
}
function lev(id, cid, n, name, type, diff, story, problems) {
  return { id, chapterId: cid, worldId: 'world-5', number: n, name, type, storyContext: story,
    problems, difficulty: diff,
    estimatedMinutes: type==='boss'?10:type==='challenge'?7:type==='practice'?5:4,
    isChallenge: type==='challenge'||type==='boss', isBoss: type==='boss' };
}

// ━━━ CHAPTER 10 — Percent Peninsula ━━━━━━━━━━━━━━━━━━━━━━━
function createChapter10() {
  const ch=10, cid=`chapter-5-${ch}`;
  const levels = [
    // 1 Per Hundred (teaching, 1)
    lev(`level-5-${ch}-1`,cid,1,'Per Hundred','teaching',1,
      'Prof. Owlbert draws a 10×10 grid. "Percent means per hundred. If 25 squares are shaded, that\'s 25%."',
      [
        prob(`problem-5-${ch}-1-1`,`level-5-${ch}-1`,1,{s:'A 10×10 grid has 40 squares shaded. What percent is shaded?',a:num(40,'40 out of 100 = 40%'),h:[hint(1,'Percent means "per hundred." How many squares out of 100?','conceptual'),hint(2,'40 squares out of 100 total squares.','directional'),hint(3,'40 out of 100 = 40%.','scaffolded')],sol:'40/100 = 40%',tp:'Percent literally means "per hundred." A shaded grid makes this visible: 40 out of 100 squares = 40%.',tags:['percents','basics','grid'],d:1}),
        prob(`problem-5-${ch}-1-2`,`level-5-${ch}-1`,2,{s:'What percent of a 10×10 grid is shaded if 75 squares are colored?',a:num(75,'75 out of 100 = 75%'),h:[hint(1,'Count shaded squares out of the total 100.','conceptual'),hint(2,'75 squares shaded out of 100 total.','directional'),hint(3,'75/100 = 75%.','scaffolded')],sol:'75/100 = 75%',tp:'On a 100-square grid, the number of shaded squares IS the percentage directly.',tags:['percents','basics','grid'],d:1}),
        prob(`problem-5-${ch}-1-3`,`level-5-${ch}-1`,3,{s:'If 100% of a grid is 100 squares, how many squares represent 50%?',a:num(50,'50% of 100 = 50'),h:[hint(1,'50% means 50 per hundred.','conceptual'),hint(2,'50% of 100 squares = ?','directional'),hint(3,'50% of 100 = 50 squares.','scaffolded')],sol:'50% of 100 = 50',tp:'50% means half. On a 100-square grid, 50% is exactly 50 squares.',tags:['percents','basics','half'],d:1}),
      ]),
    // 2 Percent to Fraction/Decimal (teaching, 2)
    lev(`level-5-${ch}-2`,cid,2,'Percent to Fraction/Decimal','teaching',2,
      'Lizzie builds a conversion chart. "75% = 75/100 = 3/4 = 0.75. Three different ways to say the same thing!"',
      [
        prob(`problem-5-${ch}-2-1`,`level-5-${ch}-2`,1,{s:'Convert 25% to a simplified fraction.',a:txt('1/4','25% = 25/100 = 1/4'),type:'text_input',inp:'text_field',h:[hint(1,'Write 25% as a fraction over 100, then simplify.','conceptual'),hint(2,'25/100. Divide top and bottom by 25.','directional'),hint(3,'25/100 = 1/4.','scaffolded')],sol:'25% = 25/100 = 1/4',tp:'To convert percent to fraction: write over 100, then simplify. 25% = 25/100 = 1/4.',tags:['percents','conversion','fraction'],d:2}),
        prob(`problem-5-${ch}-2-2`,`level-5-${ch}-2`,2,{s:'Convert 60% to a decimal.',a:txt('0.6','60% = 60/100 = 0.6'),type:'text_input',inp:'text_field',h:[hint(1,'Divide by 100 to convert percent to decimal.','conceptual'),hint(2,'60 ÷ 100 = ?','directional'),hint(3,'60 ÷ 100 = 0.6. Move the decimal two places left.','scaffolded')],sol:'60% = 0.6',tp:'To convert percent to decimal: divide by 100 (move decimal point two places left). 60% = 0.60 = 0.6.',tags:['percents','conversion','decimal'],d:2}),
        prob(`problem-5-${ch}-2-3`,`level-5-${ch}-2`,3,{s:'Convert 125% to a decimal.',a:txt('1.25','125% = 125/100 = 1.25'),type:'text_input',inp:'text_field',h:[hint(1,'Percents over 100% are greater than 1 as decimals.','conceptual'),hint(2,'125 ÷ 100 = ?','directional'),hint(3,'125 ÷ 100 = 1.25.','scaffolded')],sol:'125% = 1.25',tp:'Percents can be greater than 100%. 125% = 1.25 as a decimal, meaning "one and a quarter."',tags:['percents','conversion','greater-than-100'],d:2}),
      ]),
    // 3 Reverse Conversions (practice, 2)
    lev(`level-5-${ch}-3`,cid,3,'Reverse Conversions','practice',2,
      'Grogg converts in the other direction. "So 3/5 becomes... 60%? Let me check!"',
      [
        prob(`problem-5-${ch}-3-1`,`level-5-${ch}-3`,1,{s:'Convert 3/5 to a percent.',a:num(60,'3/5 = 0.6 = 60%'),h:[hint(1,'Divide numerator by denominator, then multiply by 100.','conceptual'),hint(2,'3 ÷ 5 = 0.6. Then 0.6 × 100 = ?','directional'),hint(3,'0.6 × 100 = 60%.','scaffolded')],sol:'3/5 = 0.6 = 60%',tp:'Fraction → percent: divide, then multiply by 100. Or: make the denominator 100. 3/5 = 60/100 = 60%.',tags:['percents','conversion','fraction-to-percent'],d:2}),
        prob(`problem-5-${ch}-3-2`,`level-5-${ch}-3`,2,{s:'Convert 0.35 to a percent.',a:num(35,'0.35 × 100 = 35%'),h:[hint(1,'Multiply by 100 to convert decimal to percent.','conceptual'),hint(2,'0.35 × 100 = ?','directional'),hint(3,'0.35 × 100 = 35%.','scaffolded')],sol:'0.35 = 35%',tp:'Decimal → percent: multiply by 100 (move decimal two places right). 0.35 = 35%.',tags:['percents','conversion','decimal-to-percent'],d:2}),
        prob(`problem-5-${ch}-3-3`,`level-5-${ch}-3`,3,{cat:'strategic_practice',s:'Convert 7/8 to a percent.',a:txt('87.5','7÷8=0.875 → 87.5%'),type:'text_input',inp:'text_field',h:[hint(1,'Divide 7 by 8 to get a decimal, then convert.','conceptual'),hint(2,'7 ÷ 8 = 0.875. Multiply by 100.','directional'),hint(3,'0.875 × 100 = 87.5%.','scaffolded')],sol:'7/8 = 87.5%',tp:'Some fractions give decimal percents. 7/8 = 0.875 = 87.5%. Not every percent is a whole number!',tags:['percents','conversion','decimal-percent'],d:2}),
      ]),
    // 4 Percent of a Number (teaching, 2)
    lev(`level-5-${ch}-4`,cid,4,'Percent of a Number','teaching',2,
      'Prof. Owlbert shows how to find parts. "To find 30% of 80: convert to decimal (0.30) and multiply."',
      [
        prob(`problem-5-${ch}-4-1`,`level-5-${ch}-4`,1,{s:'What is 25% of 80?',a:num(20,'0.25 × 80 = 20'),h:[hint(1,'Convert percent to decimal, then multiply.','conceptual'),hint(2,'25% = 0.25. Multiply: 0.25 × 80.','directional'),hint(3,'0.25 × 80 = 20.','scaffolded')],sol:'25% of 80 = 0.25 × 80 = 20',tp:'To find a percent of a number: convert to decimal and multiply. 25% of 80 = 0.25 × 80 = 20.',tags:['percents','percent-of','multiplication'],d:2}),
        prob(`problem-5-${ch}-4-2`,`level-5-${ch}-4`,2,{s:'What is 10% of 350?',a:num(35,'0.10 × 350 = 35'),h:[hint(1,'10% is one of the easiest percents — just divide by 10.','conceptual'),hint(2,'350 ÷ 10 = ?','directional'),hint(3,'350 ÷ 10 = 35.','scaffolded')],sol:'10% of 350 = 35',tp:'10% shortcut: divide by 10 (move decimal one place left). 10% of 350 = 35.',tags:['percents','percent-of','ten-percent'],d:2}),
        prob(`problem-5-${ch}-4-3`,`level-5-${ch}-4`,3,{s:'What is 75% of 120?',a:num(90,'0.75 × 120 = 90'),h:[hint(1,'75% = 3/4. Find 3/4 of 120.','conceptual'),hint(2,'120 ÷ 4 = 30. Then 30 × 3 = ?','directional'),hint(3,'30 × 3 = 90.','scaffolded')],sol:'75% of 120 = 90',tp:'Use fraction equivalents as shortcuts: 75% = 3/4. So 75% of 120 = (3/4)(120) = 90.',tags:['percents','percent-of','fraction-shortcut'],d:2}),
      ]),
    // 5 Percent Practice (practice, 3)
    lev(`level-5-${ch}-5`,cid,5,'Percent Practice','practice',3,
      'Grogg uses mental math. "50% is half, 25% is a quarter, 10% just moves the decimal!"',
      [
        prob(`problem-5-${ch}-5-1`,`level-5-${ch}-5`,1,{cat:'strategic_practice',s:'Use mental math: What is 15% of 200?',a:num(30,'10% of 200=20, 5%=10, so 15%=30'),h:[hint(1,'Break 15% into friendlier pieces: 10% + 5%.','conceptual'),hint(2,'10% of 200=20. 5% of 200=10.','directional'),hint(3,'20+10=30.','scaffolded')],sol:'15% = 10%+5%. 20+10=30.',tp:'Mental math strategy: break percents into 10% and 5% chunks. 15% = 10% + 5%. Much easier!',tags:['percents','mental-math','strategic-practice'],d:3}),
        prob(`problem-5-${ch}-5-2`,`level-5-${ch}-5`,2,{s:'What is 40% of 250?',a:num(100,'0.40 × 250 = 100'),h:[hint(1,'40% = 4 × 10%. Find 10% first.','conceptual'),hint(2,'10% of 250 = 25. Then 4 × 25 = ?','directional'),hint(3,'4 × 25 = 100.','scaffolded')],sol:'40% of 250 = 100',tp:'Another shortcut: 40% = 4 × 10%. Find 10% (divide by 10), then multiply by 4.',tags:['percents','mental-math','multiplication'],d:3}),
        prob(`problem-5-${ch}-5-3`,`level-5-${ch}-5`,3,{s:'A class has 32 students. 75% passed the test. How many passed?',a:num(24,'0.75 × 32 = 24'),h:[hint(1,'Find 75% of 32 students.','conceptual'),hint(2,'75% = 3/4. Divide 32 by 4, then multiply by 3.','directional'),hint(3,'32 ÷ 4 = 8. Then 8 × 3 = 24.','scaffolded')],sol:'75% of 32 = 24',tp:'Word problems: identify the percent and the whole, then calculate. 75% of 32 = 3/4 × 32 = 24 students.',tags:['percents','word-problem','application'],d:3}),
      ]),
    // 6 Discounts (teaching, 3)
    lev(`level-5-${ch}-6`,cid,6,'Discounts','teaching',3,
      'Lizzie spots a sale sign. "20% off $50? First find 20% of $50, then subtract it from the original!"',
      [
        prob(`problem-5-${ch}-6-1`,`level-5-${ch}-6`,1,{s:'A $60 shirt is 25% off. What is the sale price?',a:num(45,'25% of 60=15, 60-15=45'),h:[hint(1,'Find 25% of $60 (the discount), then subtract from original.','conceptual'),hint(2,'25% of 60 = 0.25 × 60 = 15. Sale price = 60 - 15.','directional'),hint(3,'60 - 15 = $45.','scaffolded')],sol:'Discount = $15. Sale price = $60 - $15 = $45.',tp:'Discount problems: find the discount amount (percent × original), then subtract from the original price.',tags:['percents','discount','application'],d:3}),
        prob(`problem-5-${ch}-6-2`,`level-5-${ch}-6`,2,{s:'A video game originally costs $80 and is on sale for 30% off. What is the sale price?',a:num(56,'30% of 80=24, 80-24=56'),h:[hint(1,'Find 30% of $80, then subtract.','conceptual'),hint(2,'0.30 × 80 = 24. Then 80 - 24 = ?','directional'),hint(3,'80 - 24 = $56.','scaffolded')],sol:'Discount = $24. Price = $80 - $24 = $56.',tp:'Shortcut: "30% off" means you pay 70% of the original. 0.70 × $80 = $56.',tags:['percents','discount','shortcut'],d:3}),
        prob(`problem-5-${ch}-6-3`,`level-5-${ch}-6`,3,{s:'A $120 jacket is 40% off. What do you pay?',a:num(72,'40% of 120=48, 120-48=72'),h:[hint(1,'40% off means you pay 60% of the price.','conceptual'),hint(2,'0.60 × 120 = ?','directional'),hint(3,'0.60 × 120 = 72. You pay $72.','scaffolded')],sol:'Pay 60%: 0.60 × $120 = $72.',tp:'Shortcut: if it\'s X% off, you pay (100-X)%. 40% off → pay 60%. 0.60 × $120 = $72.',tags:['percents','discount','complement'],d:3}),
      ]),
    // 7 Tax and Tips (practice, 3)
    lev(`level-5-${ch}-7`,cid,7,'Tax and Tips','practice',3,
      'Grogg goes to a restaurant. "The food is $40, but then there\'s 8% tax AND a 15% tip. How much total?"',
      [
        prob(`problem-5-${ch}-7-1`,`level-5-${ch}-7`,1,{s:'A meal costs $50. Sales tax is 8%. What is the total including tax?',a:num(54,'8% of 50=4, 50+4=54'),h:[hint(1,'Tax is added TO the price. Find 8% of $50 and add it.','conceptual'),hint(2,'0.08 × 50 = 4. Total = 50 + 4.','directional'),hint(3,'50 + 4 = $54.','scaffolded')],sol:'Tax=$4. Total=$50+$4=$54.',tp:'Sales tax is added to the price. Find the tax (percent × price), then add. Or multiply by 1.08 directly.',tags:['percents','tax','application'],d:3}),
        prob(`problem-5-${ch}-7-2`,`level-5-${ch}-7`,2,{s:'You want to leave a 20% tip on a $35 meal. How much is the tip?',a:num(7,'20% of 35=7'),h:[hint(1,'Find 20% of the meal cost.','conceptual'),hint(2,'20% = 1/5. Divide 35 by 5.','directional'),hint(3,'35 ÷ 5 = $7.','scaffolded')],sol:'Tip = 20% of $35 = $7.',tp:'Tip shortcut: 20% = divide by 5. For $35: $35 ÷ 5 = $7. Easy mental math!',tags:['percents','tip','mental-math'],d:3}),
        prob(`problem-5-${ch}-7-3`,`level-5-${ch}-7`,3,{s:'A restaurant bill is $40. Tax is 10% and tip is 15% (on the pre-tax amount). What is the total?',a:num(50,'Tax=4, tip=6, 40+4+6=50'),h:[hint(1,'Calculate tax and tip separately, then add both to the bill.','conceptual'),hint(2,'Tax: 10% of 40=$4. Tip: 15% of 40=$6.','directional'),hint(3,'Total: $40 + $4 + $6 = $50.','scaffolded')],sol:'Tax=$4, Tip=$6. Total=$40+$4+$6=$50.',tp:'For bills with tax AND tip: calculate each separately (both based on original amount), then add together.',tags:['percents','tax','tip','two-step'],d:3}),
      ]),
    // 8 Percent Increase/Decrease (teaching, 3)
    lev(`level-5-${ch}-8`,cid,8,'Percent Increase/Decrease','teaching',3,
      'Prof. Owlbert teaches percent change. "If a price goes from $40 to $50, the change is $10. The percent increase is 10/40 = 25%."',
      [
        prob(`problem-5-${ch}-8-1`,`level-5-${ch}-8`,1,{s:'A plant was 20 cm tall and grew to 25 cm. What is the percent increase?',a:num(25,'Change=5, 5/20=0.25=25%'),h:[hint(1,'Percent change = (change ÷ original) × 100.','conceptual'),hint(2,'Change = 25-20 = 5. Then 5/20 = ?','directional'),hint(3,'5/20 = 0.25 = 25%.','scaffolded')],sol:'Change=5cm. 5/20 = 25% increase.',tp:'Percent increase = (new - original) ÷ original × 100. Always divide by the ORIGINAL value.',tags:['percents','percent-change','increase'],d:3}),
        prob(`problem-5-${ch}-8-2`,`level-5-${ch}-8`,2,{s:'A price dropped from $80 to $60. What is the percent decrease?',a:num(25,'Change=20, 20/80=0.25=25%'),h:[hint(1,'Percent decrease = (decrease ÷ original) × 100.','conceptual'),hint(2,'Decrease = 80-60 = 20. Then 20/80 = ?','directional'),hint(3,'20/80 = 0.25 = 25%.','scaffolded')],sol:'Decrease=20. 20/80 = 25% decrease.',tp:'Percent decrease uses the same formula but with the decrease: (80-60)/80 = 20/80 = 25%.',tags:['percents','percent-change','decrease'],d:3}),
        prob(`problem-5-${ch}-8-3`,`level-5-${ch}-8`,3,{s:'A town population went from 5000 to 6000. What is the percent increase?',a:num(20,'1000/5000=0.20=20%'),h:[hint(1,'Find the change, then divide by the original population.','conceptual'),hint(2,'Change = 6000-5000 = 1000. Then 1000/5000 = ?','directional'),hint(3,'1000/5000 = 0.20 = 20%.','scaffolded')],sol:'1000/5000 = 20% increase.',tp:'Key rule: always divide by the ORIGINAL, not the new value. 1000/5000 = 20%, not 1000/6000.',tags:['percents','percent-change','word-problem'],d:3}),
      ]),
    // 9 Circle Graphs (teaching, 3)
    lev(`level-5-${ch}-9`,cid,9,'Circle Graphs','teaching',3,
      'Lizzie reads a pie chart. "The whole circle is 100%. Each slice shows what fraction of the total belongs to that category."',
      [
        prob(`problem-5-${ch}-9-1`,`level-5-${ch}-9`,1,{s:'A circle graph shows: Red 40%, Blue 35%, Green ?%. What percent is Green?',a:num(25,'100-40-35=25'),h:[hint(1,'All slices of a circle graph must add to 100%.','conceptual'),hint(2,'40 + 35 + Green = 100.','directional'),hint(3,'Green = 100 - 40 - 35 = 25%.','scaffolded')],sol:'Green = 100-40-35 = 25%.',tp:'All sections of a circle graph total 100%. To find a missing section: subtract the known percents from 100.',tags:['percents','circle-graph','missing-value'],d:3}),
        prob(`problem-5-${ch}-9-2`,`level-5-${ch}-9`,2,{s:'A survey of 200 students: 45% prefer pizza, 30% prefer tacos, 25% prefer pasta. How many prefer pizza?',a:num(90,'45% of 200=90'),h:[hint(1,'Find 45% of the total (200 students).','conceptual'),hint(2,'0.45 × 200 = ?','directional'),hint(3,'0.45 × 200 = 90 students.','scaffolded')],sol:'45% of 200 = 90 students.',tp:'Circle graphs show percents, but you can convert to actual numbers by multiplying: percent × total.',tags:['percents','circle-graph','application'],d:3}),
        prob(`problem-5-${ch}-9-3`,`level-5-${ch}-9`,3,{s:'A family budget: Housing 30%, Food 25%, Transport 15%, Savings 20%, Other 10%. Monthly income is $4000. How much goes to savings?',a:num(800,'20% of 4000=800'),h:[hint(1,'Find 20% of $4000.','conceptual'),hint(2,'0.20 × 4000 = ?','directional'),hint(3,'0.20 × 4000 = $800.','scaffolded')],sol:'Savings = 20% of $4000 = $800.',tp:'Circle graphs help visualize budgets. Once you know the percent AND the total, you can find each amount.',tags:['percents','circle-graph','budget'],d:3}),
      ]),
    // 10 Percent Comparison (challenge, 3)
    lev(`level-5-${ch}-10`,cid,10,'Percent Comparison','challenge',3,
      'Admiral Axiom poses a tricky question. "Is 40% of 60 the same as 60% of 40?"',
      [
        prob(`problem-5-${ch}-10-1`,`level-5-${ch}-10`,1,{cat:'compare_without_calc',s:'Which is greater: 30% of 50 or 50% of 30?',a:mc('C','C) They are equal'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Calculate each one, OR think about the math behind it.','conceptual'),hint(2,'30% of 50 = 0.30 × 50 = 15. 50% of 30 = 0.50 × 30 = 15.','directional'),hint(3,'They are both 15! A% of B always equals B% of A.','scaffolded')],sol:'Both equal 15. A% of B = B% of A.',tp:'Amazing fact: A% of B = B% of A. This is because (A/100)×B = (B/100)×A = AB/100.',tags:['percents','comparison','commutative','compare-without-calc'],d:3}),
        prob(`problem-5-${ch}-10-2`,`level-5-${ch}-10`,2,{cat:'compare_without_calc',s:'Which is greater: 25% of 80 or 20% of 90?',a:mc('A','A) 25% of 80'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Calculate each and compare.','conceptual'),hint(2,'25% of 80 = 20. 20% of 90 = 18.','directional'),hint(3,'20 > 18, so 25% of 80 is greater.','scaffolded')],sol:'25% of 80 = 20 > 18 = 20% of 90.',tp:'When A% of B ≠ B% of A, you need to calculate both. 25% of 80 = 20, while 20% of 90 = 18.',tags:['percents','comparison','compare-without-calc'],d:3}),
        prob(`problem-5-${ch}-10-3`,`level-5-${ch}-10`,3,{cat:'compare_without_calc',s:'Which store has the better deal: Store A sells a $60 item at 20% off, or Store B sells a $50 item at 10% off?',a:mc('B','B) Store B ($45 vs $48)'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Calculate the final price at each store.','conceptual'),hint(2,'Store A: $60 - 20% = $60 - $12 = $48. Store B: $50 - 10% = $50 - $5 = $45.','directional'),hint(3,'$45 < $48, so Store B is cheaper.','scaffolded')],sol:'A: $48, B: $45. Store B wins.',tp:'A bigger discount percentage doesn\'t always mean a better deal. Compare final prices, not just percentages!',tags:['percents','discount','comparison','real-world'],d:3}),
      ]),
    // 11 Percent Errors (challenge, 4)
    lev(`level-5-${ch}-11`,cid,11,'Percent Errors','challenge',4,
      'Admiral Axiom spots mistakes. "Careful! \'20% of\' and \'20% off\' mean very different things!"',
      [
        prob(`problem-5-${ch}-11-1`,`level-5-${ch}-11`,1,{cat:'find_the_error',s:'Sam says: "A shirt costs $40. It\'s 25% off, so the discount is $25." What\'s Sam\'s error?',a:mc('A','A) Sam calculated 25% incorrectly: 25% of $40 is $10, not $25'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Check Sam\'s calculation of 25% of $40.','conceptual'),hint(2,'25% of $40 = 0.25 × 40 = $10, not $25.','directional'),hint(3,'Sam confused 25% with $25. The discount is $10.','scaffolded')],sol:'25% of $40 = $10, not $25.',tp:'A common mistake: confusing the percent with the dollar amount. 25% off $40 means $10 off, not $25 off.',tags:['percents','find-the-error','common-mistakes'],d:4}),
        prob(`problem-5-${ch}-11-2`,`level-5-${ch}-11`,2,{cat:'find_the_error',s:'A price increased from $50 to $60. Jake says the percent increase is 20%. Lisa says it\'s 17%. Who is correct?',a:mc('A','A) Jake: (60-50)/50 = 10/50 = 20%'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Percent increase = change ÷ ORIGINAL value.','conceptual'),hint(2,'Change = $10. Original = $50. So 10/50 = ?','directional'),hint(3,'10/50 = 0.20 = 20%. Jake is correct. Lisa may have divided by 60 instead.','scaffolded')],sol:'Jake: 10/50=20% ✓. Lisa divided by new value: 10/60≈17% ✗.',tp:'Always divide by the ORIGINAL value for percent change. Lisa divided by the NEW value — a common error!',tags:['percents','find-the-error','percent-change'],d:4}),
        prob(`problem-5-${ch}-11-3`,`level-5-${ch}-11`,3,{cat:'find_the_error',s:'A store raises prices 10%, then puts items "10% off." Are prices back to normal?',a:mc('B','B) No — the final price is lower than original'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Try with a $100 item and track the price through both changes.','conceptual'),hint(2,'$100 + 10% = $110. Then 10% off $110 = $110 - $11 = $99.','directional'),hint(3,'$99 ≠ $100. The price is $1 less! Percent up then same percent down doesn\'t cancel.','scaffolded')],sol:'$100→$110→$99. Not back to normal!',tp:'Percent increase then same percent decrease do NOT cancel! The decrease is applied to the LARGER value.',tags:['percents','find-the-error','percent-change','tricky'],d:4}),
      ]),
    // 12 Percent Puzzles (challenge, 4)
    lev(`level-5-${ch}-12`,cid,12,'Percent Puzzles','challenge',4,
      'Admiral Axiom\'s toughest puzzles. "Work backwards from the final answer to find the original!"',
      [
        prob(`problem-5-${ch}-12-1`,`level-5-${ch}-12`,1,{cat:'working_backwards',s:'After a 20% discount, a jacket costs $48. What was the original price?',a:num(60,'Pay 80%: 48/0.80=60'),h:[hint(1,'If 20% is off, you paid 80% of the original.','conceptual'),hint(2,'80% × original = $48. So original = 48 ÷ 0.80.','directional'),hint(3,'48 ÷ 0.80 = $60.','scaffolded')],sol:'80% × original = $48. Original = $48 ÷ 0.80 = $60.',tp:'Working backwards from a discount: if X% off, you paid (100-X)%. Divide the sale price by that percent.',tags:['percents','working-backwards','reverse'],d:4}),
        prob(`problem-5-${ch}-12-2`,`level-5-${ch}-12`,2,{cat:'working_backwards',s:'After an 8% sales tax, the total bill is $54. What was the pre-tax price?',a:num(50,'108%=54, so 54/1.08=50'),h:[hint(1,'The total includes 100% of price + 8% tax = 108%.','conceptual'),hint(2,'1.08 × original = $54. Divide both sides by 1.08.','directional'),hint(3,'$54 ÷ 1.08 = $50.','scaffolded')],sol:'1.08 × original = $54. Original = $54 ÷ 1.08 = $50.',tp:'To reverse a tax: the total is (100+tax)% of original. Divide total by that multiplier.',tags:['percents','working-backwards','tax'],d:4}),
        prob(`problem-5-${ch}-12-3`,`level-5-${ch}-12`,3,{cat:'working_backwards',s:'A population increased by 25% to reach 1500. What was the original population?',a:num(1200,'125%=1500, 1500/1.25=1200'),h:[hint(1,'The new population is 125% of the original.','conceptual'),hint(2,'1.25 × original = 1500. Divide by 1.25.','directional'),hint(3,'1500 ÷ 1.25 = 1200.','scaffolded')],sol:'1.25 × original = 1500. Original = 1200.',tp:'Reversing percent increase: new = (1 + rate) × original, so original = new ÷ (1 + rate).',tags:['percents','working-backwards','population'],d:4}),
      ]),
    // 13 Guardian of Percent Peninsula (boss, 5)
    lev(`level-5-${ch}-13`,cid,13,'Guardian of Percent Peninsula','boss',5,
      'Admiral Axiom guards the peninsula. "Convert, calculate, and reason — prove your mastery of percents!"',
      [
        prob(`problem-5-${ch}-13-1`,`level-5-${ch}-13`,1,{s:'A store has a "Buy one at full price, get the second at 50% off" sale. You buy two items, each originally $80. What is the total cost?',a:num(120,'80 + 40 = 120'),h:[hint(1,'First item: full price. Second item: half off.','conceptual'),hint(2,'First = $80. Second = 50% of $80 = $40.','directional'),hint(3,'$80 + $40 = $120.','scaffolded')],sol:'$80 + $40 = $120.',tp:'Read sale conditions carefully: "50% off second item" means only the second item is discounted, not both.',tags:['percents','discount','boss','application'],d:5}),
        prob(`problem-5-${ch}-13-2`,`level-5-${ch}-13`,2,{cat:'working_backwards',s:'A shirt is 30% off, and then an extra 10% off the sale price. The final price is $378. What was the original price? (Hint: it\'s under $1000)',a:num(600,'Pay 70% then 90%: x×0.7×0.9=0.63x=378, x=600'),h:[hint(1,'Two discounts in sequence: first 30% off, then 10% off what remains.','conceptual'),hint(2,'After 30% off: pay 70%. After additional 10% off: pay 90% of that. So you pay 0.7 × 0.9 = 0.63 of original.','directional'),hint(3,'0.63 × original = $378. Original = 378 ÷ 0.63 = $600.','scaffolded')],sol:'0.7 × 0.9 = 0.63. $378 ÷ 0.63 = $600.',tp:'Stacked discounts multiply: 30% off then 10% off = pay 70% × 90% = 63% of original. NOT 40% off!',tags:['percents','stacked-discounts','boss','working-backwards'],d:5}),
        prob(`problem-5-${ch}-13-3`,`level-5-${ch}-13`,3,{s:'In a school of 500, 60% are girls. Of the girls, 40% play a sport. Of the boys, 50% play a sport. How many students total play a sport?',a:num(220,'Girls=300, play=120. Boys=200, play=100. Total=220'),h:[hint(1,'Find the number of girls and boys first, then find who plays sports in each group.','conceptual'),hint(2,'Girls: 60% of 500=300. Boys: 200. Sports: 40% of 300=120, 50% of 200=100.','directional'),hint(3,'120 + 100 = 220 students play a sport.','scaffolded')],sol:'120 girls + 100 boys = 220.',tp:'Multi-step percent problems: break into groups, apply percents to each group, then combine results.',tags:['percents','multi-step','boss','word-problem'],d:5}),
      ]),
  ];
  return {
    id: cid, worldId: 'world-5', number: ch, name: 'Percent Peninsula', topic: 'Percents',
    weekStart: 28, weekEnd: 30, levels,
    learningObjectives: [
      'Understand percent as per hundred',
      'Convert between fractions, decimals, and percents',
      'Calculate percent of a number',
      'Apply percents to discounts, tax, and tips',
      'Calculate percent increase and decrease',
      'Read and interpret circle graphs',
      'Work backwards from a percent result'
    ],
    signatureContent: ['conversions','percent-of-number','percent-change','discount-tax-tip','circle-graphs'],
    isBoss: true
  };
}

// ━━━ CHAPTER 11 — Square Root Summit ━━━━━━━━━━━━━━━━━━━━━━━
function createChapter11() {
  const ch=11, cid=`chapter-5-${ch}`;
  const levels = [
    // 1 Perfect Squares (teaching, 1)
    lev(`level-5-${ch}-1`,cid,1,'Perfect Squares','teaching',1,
      'Prof. Owlbert builds squares with tiles. "1×1=1, 2×2=4, 3×3=9, 4×4=16... These are the perfect squares!"',
      [
        prob(`problem-5-${ch}-1-1`,`level-5-${ch}-1`,1,{s:'What is 7²? (7 squared)',a:num(49,'7×7=49'),h:[hint(1,'7² means 7 multiplied by itself.','conceptual'),hint(2,'7 × 7 = ?','directional'),hint(3,'7 × 7 = 49.','scaffolded')],sol:'7² = 7 × 7 = 49',tp:'A perfect square is a number times itself. 7² = 7 × 7 = 49. Visualize: a 7-by-7 grid has 49 tiles.',tags:['square-roots','perfect-squares','basics'],d:1}),
        prob(`problem-5-${ch}-1-2`,`level-5-${ch}-1`,2,{s:'What is 12²?',a:num(144,'12×12=144'),h:[hint(1,'12² means 12 × 12.','conceptual'),hint(2,'Break it up: 12 × 12 = 12 × 10 + 12 × 2.','directional'),hint(3,'120 + 24 = 144.','scaffolded')],sol:'12² = 144',tp:'Memorize common squares: 1,4,9,16,25,36,49,64,81,100,121,144. They come up everywhere in math!',tags:['square-roots','perfect-squares'],d:1}),
        prob(`problem-5-${ch}-1-3`,`level-5-${ch}-1`,3,{s:'Is 50 a perfect square?',a:mc('B','B) No — 7²=49 and 8²=64, so 50 is between two perfect squares'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Check if any whole number times itself gives 50.','conceptual'),hint(2,'7²=49 and 8²=64. Is there an integer between 7 and 8?','directional'),hint(3,'No integer squares to 50. 50 is NOT a perfect square.','scaffolded')],sol:'7²=49, 8²=64. No integer gives 50.',tp:'To check if a number is a perfect square, find the nearest squares above and below. 49<50<64, so no.',tags:['square-roots','perfect-squares','identification'],d:1}),
      ]),
    // 2 Square Root Basics (teaching, 2)
    lev(`level-5-${ch}-2`,cid,2,'Square Root Basics','teaching',2,
      'Lizzie discovers the reverse operation. "If 5²=25, then √25=5. Square root UNDOES squaring!"',
      [
        prob(`problem-5-${ch}-2-1`,`level-5-${ch}-2`,1,{s:'What is √81?',a:num(9,'9×9=81, so √81=9'),h:[hint(1,'Find the number that, multiplied by itself, gives 81.','conceptual'),hint(2,'Try 9: 9 × 9 = ?','directional'),hint(3,'9 × 9 = 81. So √81 = 9.','scaffolded')],sol:'√81 = 9 because 9² = 81',tp:'Square root is the inverse of squaring. If n² = x, then √x = n. Since 9² = 81, √81 = 9.',tags:['square-roots','basics','inverse'],d:2}),
        prob(`problem-5-${ch}-2-2`,`level-5-${ch}-2`,2,{s:'What is √144?',a:num(12,'12×12=144'),h:[hint(1,'Which number times itself gives 144?','conceptual'),hint(2,'Think of 12 × 12.','directional'),hint(3,'12 × 12 = 144. So √144 = 12.','scaffolded')],sol:'√144 = 12',tp:'Knowing your perfect squares makes finding square roots instant: √144 = 12 because 12² = 144.',tags:['square-roots','basics','memorization'],d:2}),
        prob(`problem-5-${ch}-2-3`,`level-5-${ch}-2`,3,{s:'What is √225?',a:num(15,'15×15=225'),h:[hint(1,'This is a larger perfect square. Think of a number in the teens.','conceptual'),hint(2,'Try 15: 15 × 15 = ?','directional'),hint(3,'15 × 15 = 225. So √225 = 15.','scaffolded')],sol:'√225 = 15',tp:'Perfect squares to memorize: 13²=169, 14²=196, 15²=225. These come up in geometry problems.',tags:['square-roots','basics','larger-squares'],d:2}),
      ]),
    // 3 Memorizing Perfect Squares (practice, 2)
    lev(`level-5-${ch}-3`,cid,3,'Memorizing Perfect Squares','practice',2,
      'Grogg drills his squares. "I need to know 1² through 15² by heart!"',
      [
        prob(`problem-5-${ch}-3-1`,`level-5-${ch}-3`,1,{cat:'fluency',s:'What is √196?',a:num(14,'14²=196'),h:[hint(1,'This is between 13²=169 and 15²=225.','conceptual'),hint(2,'Try 14: 14 × 14 = ?','directional'),hint(3,'14 × 14 = 196. So √196 = 14.','scaffolded')],sol:'√196 = 14',tp:'Quick recall: 14² = 196. Building speed with perfect squares helps in all branches of math.',tags:['square-roots','fluency','recall'],d:2}),
        prob(`problem-5-${ch}-3-2`,`level-5-${ch}-3`,2,{cat:'fluency',s:'What is 13²?',a:num(169,'13×13=169'),h:[hint(1,'13 × 13 = ?','conceptual'),hint(2,'13 × 13 = 13 × 10 + 13 × 3 = 130 + 39.','directional'),hint(3,'130 + 39 = 169.','scaffolded')],sol:'13² = 169',tp:'Trick for squaring teens: 13² = (10+3)² = 100 + 60 + 9 = 169. Break it into parts!',tags:['square-roots','fluency','computation'],d:2}),
        prob(`problem-5-${ch}-3-3`,`level-5-${ch}-3`,3,{cat:'fluency',s:'What is √169 + √64?',a:num(21,'13+8=21'),h:[hint(1,'Find each square root separately, then add.','conceptual'),hint(2,'√169 = 13, √64 = 8.','directional'),hint(3,'13 + 8 = 21.','scaffolded')],sol:'√169 + √64 = 13 + 8 = 21',tp:'You can add/subtract square roots of perfect squares by evaluating each one first.',tags:['square-roots','fluency','combined'],d:2}),
      ]),
    // 4 Estimating Square Roots (teaching, 2)
    lev(`level-5-${ch}-4`,cid,4,'Estimating Square Roots','teaching',2,
      'Prof. Owlbert tackles non-perfect squares. "√50 is between √49=7 and √64=8. It\'s closer to 7."',
      [
        prob(`problem-5-${ch}-4-1`,`level-5-${ch}-4`,1,{s:'Between which two consecutive integers does √30 lie?',a:num(5,'5²=25, 6²=36, so √30 is between 5 and 6. Answer: 5 (the lower integer)'),h:[hint(1,'Find perfect squares on either side of 30.','conceptual'),hint(2,'5² = 25, 6² = 36. Since 25 < 30 < 36...','directional'),hint(3,'√30 is between 5 and 6. Enter 5 (the lower bound).','scaffolded')],sol:'5² = 25 < 30 < 36 = 6². √30 is between 5 and 6.',tp:'To estimate a square root: find the perfect squares above and below. 25<30<36, so 5<√30<6.',tags:['square-roots','estimation','benchmarks'],d:2}),
        prob(`problem-5-${ch}-4-2`,`level-5-${ch}-4`,2,{s:'Between which two consecutive integers does √75 lie?',a:num(8,'8²=64, 9²=81, so √75 is between 8 and 9'),h:[hint(1,'Find the nearest perfect squares around 75.','conceptual'),hint(2,'8² = 64, 9² = 81. 64 < 75 < 81.','directional'),hint(3,'√75 is between 8 and 9. Enter 8.','scaffolded')],sol:'64 < 75 < 81. 8 < √75 < 9.',tp:'√75 is between 8 and 9. Since 75 is closer to 81 than 64, √75 ≈ 8.7.',tags:['square-roots','estimation'],d:2}),
        prob(`problem-5-${ch}-4-3`,`level-5-${ch}-4`,3,{s:'Between which two consecutive integers does √110 lie?',a:num(10,'10²=100, 11²=121, so √110 is between 10 and 11'),h:[hint(1,'Find perfect squares near 110.','conceptual'),hint(2,'10² = 100, 11² = 121.','directional'),hint(3,'100 < 110 < 121, so √110 is between 10 and 11.','scaffolded')],sol:'100 < 110 < 121. √110 between 10 and 11.',tp:'Estimation gets easier with practice: 100<110<121, so 10<√110<11. Since 110 is closer to 100, ≈ 10.5.',tags:['square-roots','estimation','larger-numbers'],d:2}),
      ]),
    // 5 Estimation Practice (practice, 3)
    lev(`level-5-${ch}-5`,cid,5,'Estimation Practice','practice',3,
      'Grogg places square roots on a number line. "I can narrow it down by checking where the number falls between squares!"',
      [
        prob(`problem-5-${ch}-5-1`,`level-5-${ch}-5`,1,{s:'Is √40 closer to 6 or to 7?',a:mc('A','A) Closer to 6 — since 40 is closer to 36 (6²) than to 49 (7²)'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Compare 40\'s distance from 36 and 49.','conceptual'),hint(2,'40-36=4, 49-40=9. Which gap is smaller?','directional'),hint(3,'4 < 9, so 40 is closer to 36. √40 ≈ 6.3, closer to 6.','scaffolded')],sol:'40 is 4 away from 36 but 9 from 49. Closer to 6.',tp:'To determine which integer a square root is closer to, compare distances to the nearest perfect squares.',tags:['square-roots','estimation','number-line'],d:3}),
        prob(`problem-5-${ch}-5-2`,`level-5-${ch}-5`,2,{s:'Estimate √52 to the nearest whole number.',a:num(7,'49<52<64, 52 is closer to 49, so ≈7'),h:[hint(1,'Find surrounding squares: 7²=49, 8²=64.','conceptual'),hint(2,'52-49=3, 64-52=12. Much closer to 49.','directional'),hint(3,'√52 ≈ 7 (actually about 7.2).','scaffolded')],sol:'49<52<64. 52 is much closer to 49. √52≈7.',tp:'Round to the nearest integer by checking which perfect square is closer. 52 is only 3 from 49 but 12 from 64.',tags:['square-roots','estimation','rounding'],d:3}),
        prob(`problem-5-${ch}-5-3`,`level-5-${ch}-5`,3,{s:'Estimate √90 to the nearest whole number.',a:num(9,'81<90<100, 90 closer to 81, ≈9'),h:[hint(1,'9²=81, 10²=100. Where is 90?','conceptual'),hint(2,'90-81=9, 100-90=10. Closer to 81.','directional'),hint(3,'√90 ≈ 9 (actually about 9.5, but closer to 9).','scaffolded')],sol:'81<90<100. 90 is 9 from 81, 10 from 100. ≈9.',tp:'90 is almost exactly between 81 and 100, but slightly closer to 81, so √90 ≈ 9.5, rounds to 9 or 10.',tags:['square-roots','estimation','close-call'],d:3}),
      ]),
    // 6 Simplifying Square Roots (teaching, 3)
    lev(`level-5-${ch}-6`,cid,6,'Simplifying Square Roots','teaching',3,
      'Prof. Owlbert simplifies. "√72 = √(36×2) = √36 × √2 = 6√2. Pull out the perfect square!"',
      [
        prob(`problem-5-${ch}-6-1`,`level-5-${ch}-6`,1,{s:'Simplify √18.',a:txt('3√2','√18 = √(9×2) = 3√2'),type:'text_input',inp:'text_field',h:[hint(1,'Find the largest perfect square factor of 18.','conceptual'),hint(2,'18 = 9 × 2. √9 = 3.','directional'),hint(3,'√18 = √(9×2) = √9 × √2 = 3√2.','scaffolded')],sol:'√18 = √(9×2) = 3√2',tp:'To simplify: find the largest perfect square factor. √18 = √(9×2) = 3√2. Always look for 4,9,16,25,36...',tags:['square-roots','simplification','factoring'],d:3}),
        prob(`problem-5-${ch}-6-2`,`level-5-${ch}-6`,2,{s:'Simplify √50.',a:txt('5√2','√50 = √(25×2) = 5√2'),type:'text_input',inp:'text_field',h:[hint(1,'What perfect square divides evenly into 50?','conceptual'),hint(2,'50 = 25 × 2. √25 = 5.','directional'),hint(3,'√50 = √(25×2) = 5√2.','scaffolded')],sol:'√50 = √(25×2) = 5√2',tp:'50 = 25×2, and 25 is a perfect square. So √50 = 5√2. Always seek the largest perfect square factor.',tags:['square-roots','simplification'],d:3}),
        prob(`problem-5-${ch}-6-3`,`level-5-${ch}-6`,3,{s:'Simplify √72.',a:txt('6√2','√72 = √(36×2) = 6√2'),type:'text_input',inp:'text_field',h:[hint(1,'Find the largest perfect square factor of 72.','conceptual'),hint(2,'72 = 36 × 2. √36 = 6.','directional'),hint(3,'√72 = √(36×2) = 6√2.','scaffolded')],sol:'√72 = √(36×2) = 6√2',tp:'72 = 4×18 = 4×9×2 = 36×2. Using the largest square factor (36) gives 6√2 in one step.',tags:['square-roots','simplification','multiple-factors'],d:3}),
      ]),
    // 7 Simplification Practice (practice, 3)
    lev(`level-5-${ch}-7`,cid,7,'Simplification Practice','practice',3,
      'Lizzie finds multiple paths. "√200 = √(100×2) = 10√2. But also √200 = √(4×50) = 2√50 = 2×5√2 = 10√2!"',
      [
        prob(`problem-5-${ch}-7-1`,`level-5-${ch}-7`,1,{cat:'multiple_paths',s:'Simplify √200.',a:txt('10√2','√200 = √(100×2) = 10√2'),type:'text_input',inp:'text_field',h:[hint(1,'Find the largest perfect square factor of 200.','conceptual'),hint(2,'200 = 100 × 2. √100 = 10.','directional'),hint(3,'√200 = 10√2. (You could also go: √4×√50 = 2×5√2 = 10√2)','scaffolded')],sol:'√200 = √(100×2) = 10√2',tp:'Multiple paths work! √200 = √(100×2) = 10√2, or √(4×50) → 2√50 → 2(5√2) = 10√2. Same answer!',tags:['square-roots','simplification','multiple-paths'],d:3}),
        prob(`problem-5-${ch}-7-2`,`level-5-${ch}-7`,2,{s:'Simplify √48.',a:txt('4√3','√48 = √(16×3) = 4√3'),type:'text_input',inp:'text_field',h:[hint(1,'Find the largest perfect square factor of 48.','conceptual'),hint(2,'48 = 16 × 3. √16 = 4.','directional'),hint(3,'√48 = √(16×3) = 4√3.','scaffolded')],sol:'√48 = √(16×3) = 4√3',tp:'48 = 16×3. Since 16 is the largest perfect square factor, √48 = 4√3.',tags:['square-roots','simplification'],d:3}),
        prob(`problem-5-${ch}-7-3`,`level-5-${ch}-7`,3,{s:'Simplify √98.',a:txt('7√2','√98 = √(49×2) = 7√2'),type:'text_input',inp:'text_field',h:[hint(1,'What perfect square divides into 98?','conceptual'),hint(2,'98 = 49 × 2. √49 = 7.','directional'),hint(3,'√98 = 7√2.','scaffolded')],sol:'√98 = √(49×2) = 7√2',tp:'98 = 49×2. Since 49 is a perfect square: √98 = 7√2. Look for factors like 4,9,16,25,36,49.',tags:['square-roots','simplification','factor-49'],d:3}),
      ]),
    // 8 Right Triangles (teaching, 3)
    lev(`level-5-${ch}-8`,cid,8,'Right Triangles','teaching',3,
      'Prof. Owlbert reveals the Pythagorean theorem. "In any right triangle: a² + b² = c², where c is the longest side."',
      [
        prob(`problem-5-${ch}-8-1`,`level-5-${ch}-8`,1,{s:'A right triangle has legs 3 and 4. What is the hypotenuse?',a:num(5,'3²+4²=9+16=25, √25=5'),h:[hint(1,'Use a² + b² = c². Here a=3, b=4.','conceptual'),hint(2,'3² + 4² = 9 + 16 = 25. c = √25.','directional'),hint(3,'c = √25 = 5.','scaffolded')],sol:'3²+4²=25. c=√25=5.',tp:'The 3-4-5 triangle is the most famous Pythagorean triple! 9+16=25, and √25=5.',tags:['square-roots','pythagorean','3-4-5'],d:3}),
        prob(`problem-5-${ch}-8-2`,`level-5-${ch}-8`,2,{s:'A right triangle has legs 5 and 12. What is the hypotenuse?',a:num(13,'5²+12²=25+144=169, √169=13'),h:[hint(1,'Apply a² + b² = c² with a=5, b=12.','conceptual'),hint(2,'25 + 144 = 169. c = √169.','directional'),hint(3,'√169 = 13.','scaffolded')],sol:'5²+12²=169. c=13.',tp:'5-12-13 is another Pythagorean triple. These special right triangles appear frequently in math.',tags:['square-roots','pythagorean','5-12-13'],d:3}),
        prob(`problem-5-${ch}-8-3`,`level-5-${ch}-8`,3,{s:'A right triangle has legs 6 and 8. What is the hypotenuse?',a:num(10,'36+64=100, √100=10'),h:[hint(1,'6² + 8² = c².','conceptual'),hint(2,'36 + 64 = 100.','directional'),hint(3,'c = √100 = 10. This is a 3-4-5 triple scaled by 2!','scaffolded')],sol:'6²+8²=100. c=10.',tp:'6-8-10 is just 3-4-5 doubled! If (a,b,c) is a triple, then (2a,2b,2c) is also a triple.',tags:['square-roots','pythagorean','scaling'],d:3}),
      ]),
    // 9 Finding Missing Sides (practice, 3)
    lev(`level-5-${ch}-9`,cid,9,'Finding Missing Sides','practice',3,
      'Grogg finds missing legs. "If I know the hypotenuse and one leg, I can rearrange: a² = c² - b²."',
      [
        prob(`problem-5-${ch}-9-1`,`level-5-${ch}-9`,1,{s:'A right triangle has hypotenuse 10 and one leg 6. What is the other leg?',a:num(8,'10²-6²=100-36=64, √64=8'),h:[hint(1,'Rearrange: a² = c² - b².','conceptual'),hint(2,'a² = 10² - 6² = 100 - 36 = 64.','directional'),hint(3,'a = √64 = 8.','scaffolded')],sol:'a²=100-36=64. a=8.',tp:'To find a missing leg: a² = c² - b². Here: 100 - 36 = 64, so a = 8.',tags:['square-roots','pythagorean','missing-leg'],d:3}),
        prob(`problem-5-${ch}-9-2`,`level-5-${ch}-9`,2,{s:'A right triangle has hypotenuse 13 and one leg 5. What is the other leg?',a:num(12,'169-25=144, √144=12'),h:[hint(1,'a² = c² - b² = 13² - 5².','conceptual'),hint(2,'169 - 25 = 144.','directional'),hint(3,'√144 = 12.','scaffolded')],sol:'a²=169-25=144. a=12.',tp:'Pythagorean theorem works both ways: find hypotenuse OR a missing leg. 169-25=144, a=12.',tags:['square-roots','pythagorean','missing-leg'],d:3}),
        prob(`problem-5-${ch}-9-3`,`level-5-${ch}-9`,3,{s:'A ladder 15 feet long leans against a wall with its base 9 feet away. How high up the wall does it reach?',a:num(12,'15²-9²=225-81=144, √144=12'),h:[hint(1,'The ladder, wall, and ground form a right triangle. The ladder is the hypotenuse.','conceptual'),hint(2,'h² = 15² - 9² = 225 - 81 = 144.','directional'),hint(3,'h = √144 = 12 feet.','scaffolded')],sol:'h²=225-81=144. h=12 feet.',tp:'Real-world Pythagorean problems: a ladder against a wall makes a right triangle (ground=base, wall=height, ladder=hypotenuse).',tags:['square-roots','pythagorean','word-problem'],d:3}),
      ]),
    // 10 Is It a Right Triangle? (challenge, 3)
    lev(`level-5-${ch}-10`,cid,10,'Is It a Right Triangle?','challenge',3,
      'Admiral Axiom tests triangles. "Does a² + b² = c²? If yes, it\'s a right triangle!"',
      [
        prob(`problem-5-${ch}-10-1`,`level-5-${ch}-10`,1,{s:'A triangle has sides 7, 24, and 25. Is it a right triangle?',a:mc('A','A) Yes — 7²+24²=49+576=625=25²'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Check: does the sum of the two smaller sides squared equal the largest side squared?','conceptual'),hint(2,'7²+24² = 49+576 = 625. Is 25² = 625?','directional'),hint(3,'Yes! 625=625. It IS a right triangle.','scaffolded')],sol:'7²+24²=625=25². Right triangle!',tp:'To verify a right triangle: square all three sides. If the two smaller squares add to the largest, it\'s right.',tags:['square-roots','pythagorean','verification'],d:3}),
        prob(`problem-5-${ch}-10-2`,`level-5-${ch}-10`,2,{s:'A triangle has sides 8, 15, and 17. Is it a right triangle?',a:mc('A','A) Yes — 8²+15²=64+225=289=17²'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Check a²+b²=c² with a=8, b=15, c=17.','conceptual'),hint(2,'64+225=289. Is 17²=289?','directional'),hint(3,'Yes! 289=289. Right triangle confirmed.','scaffolded')],sol:'8²+15²=289=17². Yes!',tp:'8-15-17 is a Pythagorean triple. There are infinitely many: 3-4-5, 5-12-13, 8-15-17, 7-24-25...',tags:['square-roots','pythagorean','triples'],d:3}),
        prob(`problem-5-${ch}-10-3`,`level-5-${ch}-10`,3,{s:'A triangle has sides 6, 7, and 10. Is it a right triangle?',a:mc('B','B) No — 6²+7²=36+49=85≠100=10²'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Check: does 6²+7² equal 10²?','conceptual'),hint(2,'36+49=85. But 10²=100.','directional'),hint(3,'85≠100. NOT a right triangle.','scaffolded')],sol:'6²+7²=85≠100=10². Not a right triangle.',tp:'If a²+b²≠c², the triangle is NOT right. Here 85≠100. (85<100 means the triangle is obtuse.)',tags:['square-roots','pythagorean','non-right'],d:3}),
      ]),
    // 11 Distance on a Grid (teaching, 3)
    lev(`level-5-${ch}-11`,cid,11,'Distance on a Grid','teaching',3,
      'Lizzie measures distances on a coordinate plane. "The horizontal and vertical distances form a right triangle!"',
      [
        prob(`problem-5-${ch}-11-1`,`level-5-${ch}-11`,1,{s:'Find the distance between points (1,2) and (4,6).',a:num(5,'Δx=3, Δy=4, d=√(9+16)=√25=5'),h:[hint(1,'Use the Pythagorean theorem: d = √(Δx² + Δy²).','conceptual'),hint(2,'Δx=4-1=3, Δy=6-2=4. d = √(9+16).','directional'),hint(3,'d = √25 = 5.','scaffolded')],sol:'d = √(3²+4²) = √25 = 5.',tp:'Distance on a grid uses the Pythagorean theorem! The horizontal and vertical distances are the legs.',tags:['square-roots','distance','coordinate-plane'],d:3}),
        prob(`problem-5-${ch}-11-2`,`level-5-${ch}-11`,2,{s:'Find the distance between (0,0) and (5,12).',a:num(13,'d=√(25+144)=√169=13'),h:[hint(1,'Δx=5, Δy=12. Apply Pythagoras.','conceptual'),hint(2,'d = √(5² + 12²) = √(25+144).','directional'),hint(3,'d = √169 = 13.','scaffolded')],sol:'d = √(25+144) = √169 = 13.',tp:'From the origin: d = √(x²+y²). Here: √(25+144) = √169 = 13. It\'s the 5-12-13 triple!',tags:['square-roots','distance','origin'],d:3}),
        prob(`problem-5-${ch}-11-3`,`level-5-${ch}-11`,3,{s:'Find the distance between (2,1) and (10,7).',a:num(10,'Δx=8, Δy=6, d=√(64+36)=√100=10'),h:[hint(1,'Find horizontal and vertical distances first.','conceptual'),hint(2,'Δx=10-2=8, Δy=7-1=6. d=√(64+36).','directional'),hint(3,'d = √100 = 10.','scaffolded')],sol:'d = √(8²+6²) = √100 = 10.',tp:'The distance formula is just the Pythagorean theorem in disguise: d = √((x₂-x₁)² + (y₂-y₁)²).',tags:['square-roots','distance','formula'],d:3}),
      ]),
    // 12 Square Root Puzzles (challenge, 4)
    lev(`level-5-${ch}-12`,cid,12,'Square Root Puzzles','challenge',4,
      'Admiral Axiom\'s toughest puzzles. "A square has area 200. What is the EXACT side length?"',
      [
        prob(`problem-5-${ch}-12-1`,`level-5-${ch}-12`,1,{cat:'pattern_discovery',s:'A square has area 200 square units. What is the exact side length in simplified form?',a:txt('10√2','√200 = √(100×2) = 10√2'),type:'text_input',inp:'text_field',h:[hint(1,'Side = √(area). Simplify √200.','conceptual'),hint(2,'200 = 100 × 2. √100 = 10.','directional'),hint(3,'√200 = 10√2. That is the exact side length.','scaffolded')],sol:'Side = √200 = 10√2.',tp:'When areas aren\'t perfect squares, use simplified radicals for exact answers. √200 = 10√2 ≈ 14.14.',tags:['square-roots','area','simplification','pattern-discovery'],d:4}),
        prob(`problem-5-${ch}-12-2`,`level-5-${ch}-12`,2,{cat:'working_backwards',s:'If √n = 6√3, what is n?',a:num(108,'(6√3)² = 36×3 = 108'),h:[hint(1,'If √n = 6√3, then n = (6√3)².','conceptual'),hint(2,'(6√3)² = 6² × (√3)² = 36 × 3.','directional'),hint(3,'36 × 3 = 108.','scaffolded')],sol:'n = (6√3)² = 36×3 = 108.',tp:'To reverse a simplified root: square both parts. (6√3)² = 6² × 3 = 36 × 3 = 108.',tags:['square-roots','working-backwards','reverse'],d:4}),
        prob(`problem-5-${ch}-12-3`,`level-5-${ch}-12`,3,{s:'The diagonal of a square is 10 units. What is the area of the square?',a:num(50,'If diagonal=10, side=10/√2, area=side²=50'),h:[hint(1,'The diagonal of a square creates two 45-45-90 right triangles.','conceptual'),hint(2,'If diagonal=d, then side=d/√2. Area=side².','directional'),hint(3,'Side=10/√2. Area=(10/√2)²=100/2=50.','scaffolded')],sol:'Side²=diagonal²/2=100/2=50.',tp:'Diagonal-to-area shortcut: Area = diagonal²/2. Here: 10²/2 = 50. This comes from the 45-45-90 triangle.',tags:['square-roots','diagonal','area','geometry'],d:4}),
      ]),
    // 13 Guardian of Square Root Summit (boss, 5)
    lev(`level-5-${ch}-13`,cid,13,'Guardian of Square Root Summit','boss',5,
      'Admiral Axiom guards the summit. "From perfect squares to Pythagoras — show me everything you\'ve learned!"',
      [
        prob(`problem-5-${ch}-13-1`,`level-5-${ch}-13`,1,{s:'A right triangle has one leg 9 and hypotenuse 15. What is the other leg?',a:num(12,'225-81=144, √144=12'),h:[hint(1,'Use a² = c² - b².','conceptual'),hint(2,'a² = 15² - 9² = 225 - 81 = 144.','directional'),hint(3,'a = √144 = 12.','scaffolded')],sol:'a²=144. a=12.',tp:'The 9-12-15 triple is 3-4-5 scaled by 3. Recognizing multiples of common triples saves time!',tags:['square-roots','pythagorean','boss','missing-leg'],d:5}),
        prob(`problem-5-${ch}-13-2`,`level-5-${ch}-13`,2,{s:'Simplify √288.',a:txt('12√2','288=144×2, √144=12, so 12√2'),type:'text_input',inp:'text_field',h:[hint(1,'Find the largest perfect square factor of 288.','conceptual'),hint(2,'288 = 144 × 2. √144 = 12.','directional'),hint(3,'√288 = 12√2.','scaffolded')],sol:'√288 = √(144×2) = 12√2.',tp:'288 = 2×144 = 2×12². So √288 = 12√2. For larger numbers, try dividing by large perfect squares first.',tags:['square-roots','simplification','boss'],d:5}),
        prob(`problem-5-${ch}-13-3`,`level-5-${ch}-13`,3,{s:'Find the distance between points (3, 4) and (15, 9).',a:num(13,'Δx=12, Δy=5, d=√(144+25)=√169=13'),h:[hint(1,'Use the distance formula with Δx and Δy.','conceptual'),hint(2,'Δx=15-3=12, Δy=9-4=5. d=√(144+25).','directional'),hint(3,'d=√169=13. A 5-12-13 triangle!','scaffolded')],sol:'d=√(12²+5²)=√169=13.',tp:'The distance formula connects coordinate geometry to the Pythagorean theorem. Always simplify the result!',tags:['square-roots','distance','boss','pythagorean'],d:5}),
      ]),
  ];
  return {
    id: cid, worldId: 'world-5', number: ch, name: 'Square Root Summit', topic: 'Square Roots',
    weekStart: 31, weekEnd: 33, levels,
    learningObjectives: [
      'Identify and memorize perfect squares 1²-15²',
      'Find square roots of perfect squares',
      'Estimate square roots of non-perfect squares',
      'Simplify square roots using perfect square factors',
      'Apply the Pythagorean theorem to find missing sides',
      'Verify right triangles using a²+b²=c²',
      'Calculate distances on a coordinate grid'
    ],
    signatureContent: ['perfect-squares','estimation','simplifying-radicals','pythagorean-theorem','distance-formula'],
    isBoss: true
  };
}

// ━━━ CHAPTER 12 — Exponent Expanse ━━━━━━━━━━━━━━━━━━━━━━━
function createChapter12() {
  const ch=12, cid=`chapter-5-${ch}`;
  const levels = [
    // 1 Repeated Multiplication (teaching, 1)
    lev(`level-5-${ch}-1`,cid,1,'Repeated Multiplication','teaching',1,
      'Prof. Owlbert introduces powers. "2⁴ means 2×2×2×2. The small number tells you how many times to multiply."',
      [
        prob(`problem-5-${ch}-1-1`,`level-5-${ch}-1`,1,{s:'Evaluate 2⁴ (2 to the 4th power).',a:num(16,'2×2×2×2=16'),h:[hint(1,'2⁴ means multiply 2 by itself 4 times.','conceptual'),hint(2,'2 × 2 × 2 × 2 = ?','directional'),hint(3,'2×2=4, 4×2=8, 8×2=16.','scaffolded')],sol:'2⁴ = 2×2×2×2 = 16',tp:'An exponent tells you how many times to multiply the base by itself. 2⁴ = 2×2×2×2 = 16.',tags:['exponents','basics','powers-of-2'],d:1}),
        prob(`problem-5-${ch}-1-2`,`level-5-${ch}-1`,2,{s:'Evaluate 3³ (3 cubed).',a:num(27,'3×3×3=27'),h:[hint(1,'3³ means three 3s multiplied together.','conceptual'),hint(2,'3 × 3 × 3 = ?','directional'),hint(3,'3×3=9, 9×3=27.','scaffolded')],sol:'3³ = 3×3×3 = 27',tp:'3³ is called "3 cubed" because a cube with side 3 has volume 3×3×3 = 27 cubic units.',tags:['exponents','basics','cubes'],d:1}),
        prob(`problem-5-${ch}-1-3`,`level-5-${ch}-1`,3,{s:'Evaluate 5³.',a:num(125,'5×5×5=125'),h:[hint(1,'5³ = 5 × 5 × 5.','conceptual'),hint(2,'5×5=25. Then 25×5=?','directional'),hint(3,'25×5=125.','scaffolded')],sol:'5³ = 125',tp:'Powers of 5: 5¹=5, 5²=25, 5³=125, 5⁴=625. Notice the pattern in the last digits: 5,5,5,5...',tags:['exponents','basics','powers-of-5'],d:1}),
      ]),
    // 2 Powers of 2 (teaching, 2)
    lev(`level-5-${ch}-2`,cid,2,'Powers of 2','teaching',2,
      'Lizzie explores the doubling pattern. "2¹=2, 2²=4, 2³=8, 2⁴=16... each one doubles the last!"',
      [
        prob(`problem-5-${ch}-2-1`,`level-5-${ch}-2`,1,{cat:'pattern_discovery',s:'What is 2⁸?',a:num(256,'2,4,8,16,32,64,128,256'),h:[hint(1,'Keep doubling from 2¹=2.','conceptual'),hint(2,'2⁴=16, 2⁵=32, 2⁶=64, 2⁷=128, 2⁸=?','directional'),hint(3,'128×2=256.','scaffolded')],sol:'2⁸ = 256',tp:'Powers of 2: 1,2,4,8,16,32,64,128,256,512,1024. Each doubles. These appear everywhere in computing!',tags:['exponents','powers-of-2','pattern-discovery','doubling'],d:2}),
        prob(`problem-5-${ch}-2-2`,`level-5-${ch}-2`,2,{cat:'pattern_discovery',s:'What is 2¹⁰?',a:num(1024,'2⁸=256, 2⁹=512, 2¹⁰=1024'),h:[hint(1,'Continue from 2⁸=256.','conceptual'),hint(2,'256→512→1024.','directional'),hint(3,'2¹⁰ = 1024. This is why a kilobyte is 1024 bytes!','scaffolded')],sol:'2¹⁰ = 1024',tp:'2¹⁰ = 1024. Computers use powers of 2 because they work in binary (0s and 1s).',tags:['exponents','powers-of-2','computing'],d:2}),
        prob(`problem-5-${ch}-2-3`,`level-5-${ch}-2`,3,{s:'If you fold a piece of paper in half 6 times, how many layers thick is it?',a:num(64,'2⁶=64 layers'),h:[hint(1,'Each fold doubles the layers. Start with 1 layer.','conceptual'),hint(2,'1→2→4→8→16→32→64.','directional'),hint(3,'2⁶ = 64 layers.','scaffolded')],sol:'2⁶ = 64 layers.',tp:'Exponential growth is powerful! 6 folds = 64 layers. 10 folds = 1024 layers. 42 folds would reach the moon!',tags:['exponents','powers-of-2','real-world'],d:2}),
      ]),
    // 3 Powers of 3 and 10 (practice, 2)
    lev(`level-5-${ch}-3`,cid,3,'Powers of 3 and 10','practice',2,
      'Grogg explores other bases. "Powers of 10 are easy — just count the zeros! 10³ = 1000."',
      [
        prob(`problem-5-${ch}-3-1`,`level-5-${ch}-3`,1,{s:'What is 10⁵?',a:num(100000,'10⁵ = 1 followed by 5 zeros'),h:[hint(1,'For powers of 10, the exponent tells you how many zeros.','conceptual'),hint(2,'10⁵ = 1 followed by 5 zeros.','directional'),hint(3,'10⁵ = 100,000.','scaffolded')],sol:'10⁵ = 100,000',tp:'Powers of 10 rule: 10ⁿ = 1 followed by n zeros. 10⁵ = 100,000. This makes scientific notation work!',tags:['exponents','powers-of-10','zeros'],d:2}),
        prob(`problem-5-${ch}-3-2`,`level-5-${ch}-3`,2,{s:'What is 3⁴?',a:num(81,'3×3×3×3=81'),h:[hint(1,'3⁴ = 3×3×3×3.','conceptual'),hint(2,'3²=9, then 9×3=27, then 27×3=?','directional'),hint(3,'27×3=81. So 3⁴=81.','scaffolded')],sol:'3⁴ = 81',tp:'Powers of 3: 3¹=3, 3²=9, 3³=27, 3⁴=81, 3⁵=243. The last digits cycle: 3,9,7,1,3,9,7,1...',tags:['exponents','powers-of-3'],d:2}),
        prob(`problem-5-${ch}-3-3`,`level-5-${ch}-3`,3,{s:'Which is larger: 3⁴ or 4³?',a:mc('A','A) 3⁴ = 81 is larger than 4³ = 64'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Calculate both values.','conceptual'),hint(2,'3⁴=81 and 4³=64.','directional'),hint(3,'81 > 64, so 3⁴ is larger.','scaffolded')],sol:'3⁴=81 > 64=4³.',tp:'Swapping base and exponent doesn\'t give the same result! 3⁴=81 vs 4³=64. The larger exponent often wins.',tags:['exponents','comparison','swap'],d:2}),
      ]),
    // 4 Multiplying Powers (teaching, 2)
    lev(`level-5-${ch}-4`,cid,4,'Multiplying Powers','teaching',2,
      'Prof. Owlbert discovers a shortcut. "2³ × 2⁴ = (2×2×2) × (2×2×2×2) = 2⁷. Just ADD the exponents!"',
      [
        prob(`problem-5-${ch}-4-1`,`level-5-${ch}-4`,1,{s:'Simplify: 5² × 5³. Write as 5 to what power?',a:num(5,'5²×5³=5⁵, so exponent is 5'),h:[hint(1,'When multiplying same bases, add the exponents.','conceptual'),hint(2,'5² × 5³ = 5^(2+3).','directional'),hint(3,'5^(2+3) = 5⁵. The exponent is 5.','scaffolded')],sol:'5² × 5³ = 5⁵',tp:'Product rule: aᵐ × aⁿ = aᵐ⁺ⁿ. When bases match, ADD exponents. 5²×5³ = 5⁵.',tags:['exponents','product-rule','same-base'],d:2}),
        prob(`problem-5-${ch}-4-2`,`level-5-${ch}-4`,2,{s:'Simplify: 10⁴ × 10³. What is the exponent?',a:num(7,'4+3=7'),h:[hint(1,'Same base (10): add exponents.','conceptual'),hint(2,'10^(4+3) = 10^?','directional'),hint(3,'4+3=7. Answer: 10⁷.','scaffolded')],sol:'10⁴ × 10³ = 10⁷',tp:'This is why powers of 10 are so useful: 10⁴×10³ = 10⁷. It\'s just 10,000 × 1,000 = 10,000,000.',tags:['exponents','product-rule','powers-of-10'],d:2}),
        prob(`problem-5-${ch}-4-3`,`level-5-${ch}-4`,3,{s:'Simplify: 2⁵ × 2⁵. What is the result?',a:num(1024,'2⁵×2⁵=2¹⁰=1024'),h:[hint(1,'Add exponents: 2^(5+5) = 2^10.','conceptual'),hint(2,'2¹⁰ = 1024.','directional'),hint(3,'2⁵×2⁵ = 32×32 = 1024. Same as 2¹⁰.','scaffolded')],sol:'2⁵×2⁵ = 2¹⁰ = 1024',tp:'2⁵×2⁵ = 2¹⁰ = 1024. You could also verify: 32×32 = 1024. The rule always works!',tags:['exponents','product-rule','verification'],d:2}),
      ]),
    // 5 Dividing Powers (teaching, 3)
    lev(`level-5-${ch}-5`,cid,5,'Dividing Powers','teaching',3,
      'Lizzie divides. "2⁷ ÷ 2³ = 2⁴. When dividing same bases, SUBTRACT exponents!"',
      [
        prob(`problem-5-${ch}-5-1`,`level-5-${ch}-5`,1,{s:'Simplify: 3⁶ ÷ 3². What is the exponent?',a:num(4,'6-2=4'),h:[hint(1,'When dividing same bases, subtract exponents.','conceptual'),hint(2,'3^(6-2) = 3^?','directional'),hint(3,'6-2=4. Answer: 3⁴=81.','scaffolded')],sol:'3⁶ ÷ 3² = 3⁴ = 81',tp:'Quotient rule: aᵐ ÷ aⁿ = aᵐ⁻ⁿ. When bases match, SUBTRACT exponents. 3⁶÷3²=3⁴.',tags:['exponents','quotient-rule','same-base'],d:3}),
        prob(`problem-5-${ch}-5-2`,`level-5-${ch}-5`,2,{s:'Simplify: 10⁸ ÷ 10⁵. What is the result?',a:num(1000,'10^(8-5)=10³=1000'),h:[hint(1,'Subtract exponents: 10^(8-5).','conceptual'),hint(2,'10³ = ?','directional'),hint(3,'10³ = 1000.','scaffolded')],sol:'10⁸ ÷ 10⁵ = 10³ = 1000',tp:'10⁸÷10⁵=10³=1000. That\'s 100,000,000 ÷ 100,000 = 1,000. The rule matches the calculation!',tags:['exponents','quotient-rule','powers-of-10'],d:3}),
        prob(`problem-5-${ch}-5-3`,`level-5-${ch}-5`,3,{s:'Simplify: 2⁹ ÷ 2⁶.',a:num(8,'2^(9-6)=2³=8'),h:[hint(1,'Subtract exponents: 9-6.','conceptual'),hint(2,'2³ = ?','directional'),hint(3,'2³ = 8.','scaffolded')],sol:'2⁹ ÷ 2⁶ = 2³ = 8',tp:'512÷64=8. Using the rule: 2⁹÷2⁶=2³=8. Much faster than computing large powers first!',tags:['exponents','quotient-rule','efficiency'],d:3}),
      ]),
    // 6 Power Rules Practice (practice, 3)
    lev(`level-5-${ch}-6`,cid,6,'Power Rules Practice','practice',3,
      'Grogg mixes multiply and divide. "Same base? Add when multiplying, subtract when dividing!"',
      [
        prob(`problem-5-${ch}-6-1`,`level-5-${ch}-6`,1,{cat:'strategic_practice',s:'Simplify: 4³ × 4² ÷ 4⁴. What is the exponent?',a:num(1,'3+2-4=1'),h:[hint(1,'Apply product and quotient rules in order.','conceptual'),hint(2,'Exponents: 3+2-4 = ?','directional'),hint(3,'3+2-4=1. So 4¹=4.','scaffolded')],sol:'4^(3+2-4) = 4¹ = 4',tp:'Chain operations: add exponents for multiply, subtract for divide. 3+2-4=1, so the answer is 4¹=4.',tags:['exponents','mixed-rules','strategic-practice'],d:3}),
        prob(`problem-5-${ch}-6-2`,`level-5-${ch}-6`,2,{s:'Simplify: (7⁵ × 7³) ÷ 7⁶. What is the exponent?',a:num(2,'5+3-6=2'),h:[hint(1,'First multiply (add), then divide (subtract).','conceptual'),hint(2,'7^(5+3) ÷ 7⁶ = 7⁸ ÷ 7⁶ = 7^(8-6).','directional'),hint(3,'8-6=2. So 7²=49.','scaffolded')],sol:'7^(5+3-6) = 7² = 49',tp:'Combine all exponent operations: 5+3-6=2. The final answer is 7²=49.',tags:['exponents','mixed-rules','order-of-operations'],d:3}),
        prob(`problem-5-${ch}-6-3`,`level-5-${ch}-6`,3,{s:'If 2ⁿ × 2³ = 2⁷, what is n?',a:num(4,'n+3=7, n=4'),h:[hint(1,'Use the product rule: 2^(n+3) = 2⁷.','conceptual'),hint(2,'n+3=7. Solve for n.','directional'),hint(3,'n=7-3=4.','scaffolded')],sol:'n+3=7, so n=4.',tp:'When exponent expressions are equal with the same base, set exponents equal: n+3=7, so n=4.',tags:['exponents','algebra','solving'],d:3}),
      ]),
    // 7 Power of a Power (teaching, 3)
    lev(`level-5-${ch}-7`,cid,7,'Power of a Power','teaching',3,
      'Prof. Owlbert raises a power to a power. "(2³)⁴ = 2³×2³×2³×2³ = 2¹². Multiply the exponents!"',
      [
        prob(`problem-5-${ch}-7-1`,`level-5-${ch}-7`,1,{s:'Simplify: (3²)⁴. What is the exponent?',a:num(8,'2×4=8'),h:[hint(1,'Power of a power: multiply the exponents.','conceptual'),hint(2,'(3²)⁴ = 3^(2×4).','directional'),hint(3,'2×4=8. So (3²)⁴ = 3⁸.','scaffolded')],sol:'(3²)⁴ = 3⁸',tp:'Power of a power rule: (aᵐ)ⁿ = aᵐˣⁿ. Multiply the exponents. (3²)⁴ = 3⁸.',tags:['exponents','power-of-power','multiply'],d:3}),
        prob(`problem-5-${ch}-7-2`,`level-5-${ch}-7`,2,{s:'Simplify: (10²)³. What is the result?',a:num(1000000,'10^(2×3)=10⁶=1,000,000'),h:[hint(1,'Multiply exponents: (10²)³ = 10^(2×3).','conceptual'),hint(2,'10⁶ = ?','directional'),hint(3,'10⁶ = 1,000,000 (one million).','scaffolded')],sol:'(10²)³ = 10⁶ = 1,000,000',tp:'(10²)³ = 10⁶ = one million. That\'s (100)³ = 100×100×100 = 1,000,000. The rule checks out!',tags:['exponents','power-of-power','powers-of-10'],d:3}),
        prob(`problem-5-${ch}-7-3`,`level-5-${ch}-7`,3,{s:'Simplify: (2³)⁴. What is the result?',a:num(4096,'2^12=4096'),h:[hint(1,'Multiply exponents: 3×4=12.','conceptual'),hint(2,'2¹² = 2¹⁰ × 2² = 1024 × 4.','directional'),hint(3,'1024 × 4 = 4096.','scaffolded')],sol:'(2³)⁴ = 2¹² = 4096',tp:'(2³)⁴ = 2¹² = 4096. You can verify: 8⁴ = 8×8×8×8 = 4096. Both methods give the same answer.',tags:['exponents','power-of-power','large-numbers'],d:3}),
      ]),
    // 8 The Zero Exponent (teaching, 3)
    lev(`level-5-${ch}-8`,cid,8,'The Zero Exponent','teaching',3,
      'Lizzie discovers something surprising. "2³=8, 2²=4, 2¹=2, 2⁰=...1? Each time we divide by 2, so yes — ANY number to the 0th power is 1!"',
      [
        prob(`problem-5-${ch}-8-1`,`level-5-${ch}-8`,1,{cat:'pattern_discovery',s:'Following the pattern 2³=8, 2²=4, 2¹=2, what is 2⁰?',a:num(1,'Each step divides by 2: 8,4,2,1'),h:[hint(1,'Look at the pattern: each time the exponent decreases by 1, the value is divided by 2.','conceptual'),hint(2,'8÷2=4, 4÷2=2, 2÷2=?','directional'),hint(3,'2÷2=1. So 2⁰=1.','scaffolded')],sol:'2⁰ = 1 (pattern: divide by 2 each step)',tp:'The zero exponent pattern: dividing by the base each step leads to a⁰=1. This works for ANY non-zero base!',tags:['exponents','zero-exponent','pattern-discovery'],d:3}),
        prob(`problem-5-${ch}-8-2`,`level-5-${ch}-8`,2,{s:'What is 7⁰?',a:num(1,'Any non-zero number to the 0th power = 1'),h:[hint(1,'a⁰ = 1 for any non-zero base a.','conceptual'),hint(2,'7⁰ follows the same rule as 2⁰.','directional'),hint(3,'7⁰ = 1.','scaffolded')],sol:'7⁰ = 1',tp:'The zero exponent rule: a⁰ = 1 for any a ≠ 0. This also follows from aⁿ÷aⁿ = aⁿ⁻ⁿ = a⁰ = 1.',tags:['exponents','zero-exponent','rule'],d:3}),
        prob(`problem-5-${ch}-8-3`,`level-5-${ch}-8`,3,{s:'What is 100⁰ + 5⁰ + 1⁰?',a:num(3,'1+1+1=3'),h:[hint(1,'Each term is a number to the 0th power.','conceptual'),hint(2,'100⁰=1, 5⁰=1, 1⁰=1.','directional'),hint(3,'1+1+1=3.','scaffolded')],sol:'1+1+1=3.',tp:'No matter the base (as long as it\'s not 0), the result is 1. So 100⁰+5⁰+1⁰ = 1+1+1 = 3.',tags:['exponents','zero-exponent','combined'],d:3}),
      ]),
    // 9 Exponent Mistakes (challenge, 3)
    lev(`level-5-${ch}-9`,cid,9,'Exponent Mistakes','challenge',3,
      'Admiral Axiom spots errors. "2³ × 3² does NOT equal 6⁵. You can\'t combine different bases!"',
      [
        prob(`problem-5-${ch}-9-1`,`level-5-${ch}-9`,1,{cat:'find_the_error',s:'Maya says: 2³ × 3² = 6⁵. What is her error?',a:mc('A','A) You cannot add exponents when the bases are different'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'The product rule only works when the bases are the SAME.','conceptual'),hint(2,'2³=8, 3²=9. 8×9=72. But 6⁵=7776!','directional'),hint(3,'Maya incorrectly combined different bases. 2³×3² = 8×9 = 72, not 6⁵.','scaffolded')],sol:'Bases must match! 2³×3²=72, not 6⁵=7776.',tp:'Critical rule: exponent laws (add/subtract) only apply when BASES ARE THE SAME. 2³×3² must be computed directly.',tags:['exponents','find-the-error','different-bases'],d:3}),
        prob(`problem-5-${ch}-9-2`,`level-5-${ch}-9`,2,{cat:'find_the_error',s:'Tom says: (2+3)² = 2² + 3² = 4 + 9 = 13. What is wrong?',a:mc('A','A) You cannot distribute an exponent over addition: (2+3)²=5²=25'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Does squaring distribute over addition?','conceptual'),hint(2,'(2+3)² = 5² = 25. But 2²+3² = 4+9 = 13.','directional'),hint(3,'25 ≠ 13. Exponents do NOT distribute over addition!','scaffolded')],sol:'(2+3)²=25≠13. Exponents don\'t distribute over +.',tp:'HUGE mistake to avoid: (a+b)² ≠ a²+b². You must add FIRST, then square: (2+3)²=5²=25.',tags:['exponents','find-the-error','distribution'],d:3}),
        prob(`problem-5-${ch}-9-3`,`level-5-${ch}-9`,3,{cat:'find_the_error',s:'Kai says: 2⁴ × 2³ = 4⁷. Explain the error.',a:mc('A','A) The base stays the same (2), not doubled: 2⁴×2³=2⁷, not 4⁷'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'When multiplying powers with the same base, what changes?','conceptual'),hint(2,'2⁴×2³ = 2^(4+3) = 2⁷. The base stays 2.','directional'),hint(3,'Kai multiplied the bases too: 2×2=4. Wrong! Only add the exponents.','scaffolded')],sol:'2⁴×2³=2⁷=128, not 4⁷=16384.',tp:'When multiplying powers: the BASE STAYS THE SAME, only exponents add. 2⁴×2³=2⁷, never 4⁷!',tags:['exponents','find-the-error','base-confusion'],d:3}),
      ]),
    // 10 Scientific Notation Intro (teaching, 3)
    lev(`level-5-${ch}-10`,cid,10,'Scientific Notation Intro','teaching',3,
      'Prof. Owlbert writes enormous numbers. "3,400,000 = 3.4 × 10⁶. Scientific notation makes big numbers manageable!"',
      [
        prob(`problem-5-${ch}-10-1`,`level-5-${ch}-10`,1,{s:'Write 5,000,000 in scientific notation. What power of 10?',a:num(6,'5,000,000 = 5 × 10⁶'),h:[hint(1,'Move the decimal until you have a number between 1 and 10.','conceptual'),hint(2,'5,000,000 → 5.0. How many places did the decimal move?','directional'),hint(3,'6 places. So 5 × 10⁶.','scaffolded')],sol:'5,000,000 = 5 × 10⁶',tp:'Scientific notation: write as a × 10ⁿ where 1 ≤ a < 10. Count decimal places moved to find n.',tags:['exponents','scientific-notation','large-numbers'],d:3}),
        prob(`problem-5-${ch}-10-2`,`level-5-${ch}-10`,2,{s:'Write 2.7 × 10⁴ as a regular number.',a:num(27000,'Move decimal 4 places right: 27000'),h:[hint(1,'10⁴ means move the decimal 4 places to the right.','conceptual'),hint(2,'2.7 → 27 → 270 → 2700 → 27000.','directional'),hint(3,'2.7 × 10⁴ = 27,000.','scaffolded')],sol:'2.7 × 10⁴ = 27,000',tp:'To convert FROM scientific notation: move the decimal RIGHT by the exponent. 2.7 × 10⁴ = 27,000.',tags:['exponents','scientific-notation','conversion'],d:3}),
        prob(`problem-5-${ch}-10-3`,`level-5-${ch}-10`,3,{s:'The Earth is about 150,000,000 km from the Sun. Write this in scientific notation. What is the power of 10?',a:num(8,'1.5 × 10⁸'),h:[hint(1,'Move the decimal to get a number between 1 and 10.','conceptual'),hint(2,'150,000,000 → 1.5. Count the places.','directional'),hint(3,'8 places. So 1.5 × 10⁸.','scaffolded')],sol:'150,000,000 = 1.5 × 10⁸',tp:'Real-world science uses scientific notation constantly. The Sun is 1.5×10⁸ km away — much cleaner than 150,000,000!',tags:['exponents','scientific-notation','astronomy'],d:3}),
      ]),
    // 11 Scientific Notation Practice (practice, 3)
    lev(`level-5-${ch}-11`,cid,11,'Scientific Notation Practice','practice',3,
      'Grogg converts both directions. "Big number → scientific notation → big number. I\'m getting the hang of this!"',
      [
        prob(`problem-5-${ch}-11-1`,`level-5-${ch}-11`,1,{s:'Write 8,250,000 in scientific notation. What is the power of 10?',a:num(6,'8.25 × 10⁶'),h:[hint(1,'Move decimal to get a number between 1 and 10.','conceptual'),hint(2,'8,250,000 → 8.25. Count places moved.','directional'),hint(3,'6 places. 8.25 × 10⁶.','scaffolded')],sol:'8,250,000 = 8.25 × 10⁶',tp:'8,250,000 = 8.25 × 10⁶. The coefficient (8.25) must be between 1 and 10.',tags:['exponents','scientific-notation','practice'],d:3}),
        prob(`problem-5-${ch}-11-2`,`level-5-${ch}-11`,2,{s:'Convert 6.02 × 10⁵ to a regular number.',a:num(602000,'Move decimal 5 places right'),h:[hint(1,'Move decimal 5 places right.','conceptual'),hint(2,'6.02 → 60.2 → 602 → 6020 → 60200 → 602000.','directional'),hint(3,'6.02 × 10⁵ = 602,000.','scaffolded')],sol:'6.02 × 10⁵ = 602,000',tp:'Move the decimal to the RIGHT for positive exponents. 6.02 × 10⁵ = 602,000.',tags:['exponents','scientific-notation','reverse'],d:3}),
        prob(`problem-5-${ch}-11-3`,`level-5-${ch}-11`,3,{s:'Which is larger: 3.5 × 10⁷ or 9.1 × 10⁶?',a:mc('A','A) 3.5 × 10⁷ (35,000,000 > 9,100,000)'),type:'multiple_choice',inp:'multiple_choice',h:[hint(1,'Compare the powers of 10 first.','conceptual'),hint(2,'10⁷ = 10,000,000 vs 10⁶ = 1,000,000. The first has a bigger exponent.','directional'),hint(3,'3.5×10⁷ = 35,000,000 > 9,100,000 = 9.1×10⁶.','scaffolded')],sol:'3.5×10⁷ = 35M > 9.1M = 9.1×10⁶.',tp:'When comparing scientific notation: check the exponent first! Higher exponent = bigger number (usually).',tags:['exponents','scientific-notation','comparison'],d:3}),
      ]),
    // 12 Exponent Puzzles (challenge, 4)
    lev(`level-5-${ch}-12`,cid,12,'Exponent Puzzles','challenge',4,
      'Admiral Axiom\'s puzzles test deep understanding. "2ⁿ = 64. What is n? Work backwards!"',
      [
        prob(`problem-5-${ch}-12-1`,`level-5-${ch}-12`,1,{cat:'working_backwards',s:'If 2ⁿ = 64, what is n?',a:num(6,'2⁶=64'),h:[hint(1,'List powers of 2 until you reach 64.','conceptual'),hint(2,'2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=?','directional'),hint(3,'2⁶=64, so n=6.','scaffolded')],sol:'2⁶=64, so n=6.',tp:'To solve 2ⁿ=64: list powers of 2 until you find 64. 2,4,8,16,32,64 → that\'s 2⁶, so n=6.',tags:['exponents','working-backwards','solving'],d:4}),
        prob(`problem-5-${ch}-12-2`,`level-5-${ch}-12`,2,{cat:'working_backwards',s:'If 3ⁿ = 243, what is n?',a:num(5,'3⁵=243'),h:[hint(1,'List powers of 3.','conceptual'),hint(2,'3,9,27,81,243 — count the steps.','directional'),hint(3,'3⁵=243, so n=5.','scaffolded')],sol:'3⁵=243, so n=5.',tp:'3¹=3, 3²=9, 3³=27, 3⁴=81, 3⁵=243. Knowing common powers helps solve these quickly.',tags:['exponents','working-backwards','powers-of-3'],d:4}),
        prob(`problem-5-${ch}-12-3`,`level-5-${ch}-12`,3,{cat:'working_backwards',s:'If 5ⁿ = 3125, what is n?',a:num(5,'5⁵=3125'),h:[hint(1,'List powers of 5.','conceptual'),hint(2,'5, 25, 125, 625, 3125 — which power?','directional'),hint(3,'5⁵=3125, so n=5.','scaffolded')],sol:'5⁵=3125, so n=5.',tp:'5¹=5, 5²=25, 5³=125, 5⁴=625, 5⁵=3125. Working backwards from a power is finding the exponent.',tags:['exponents','working-backwards','powers-of-5'],d:4}),
      ]),
    // 13 Admiral Axiom's Final Challenge (boss, 5)
    lev(`level-5-${ch}-13`,cid,13,"Admiral Axiom's Final Challenge",'boss',5,
      'Admiral Axiom stands at the heart of the Archipelago. "You\'ve mastered everything. Now face my ultimate challenge — all of World 5 leads to this moment!"',
      [
        prob(`problem-5-${ch}-13-1`,`level-5-${ch}-13`,1,{s:'Simplify: (2⁴ × 2³) ÷ 2⁵. What is the result?',a:num(4,'2^(4+3-5)=2²=4'),h:[hint(1,'Apply product and quotient rules: add, then subtract exponents.','conceptual'),hint(2,'2^(4+3) ÷ 2⁵ = 2⁷ ÷ 2⁵ = 2^(7-5).','directional'),hint(3,'2² = 4.','scaffolded')],sol:'2^(4+3-5) = 2² = 4.',tp:'Chain all exponent rules: multiply→add, divide→subtract. (2⁴×2³)÷2⁵ = 2^(4+3-5) = 2² = 4.',tags:['exponents','boss','combined-rules'],d:5}),
        prob(`problem-5-${ch}-13-2`,`level-5-${ch}-13`,2,{s:'The speed of light is about 3 × 10⁸ meters per second. How far does light travel in 500 seconds? (Give the power of 10 in your answer)',a:num(11,'3×10⁸ × 5×10² = 15×10¹⁰ = 1.5×10¹¹, power=11'),h:[hint(1,'Distance = speed × time. Multiply the numbers and use exponent rules for powers of 10.','conceptual'),hint(2,'3×10⁸ × 500 = 3×10⁸ × 5×10². Multiply: 3×5=15, 10⁸×10²=10¹⁰.','directional'),hint(3,'15×10¹⁰ = 1.5×10¹¹. The power is 11.','scaffolded')],sol:'1.5 × 10¹¹ meters. Power = 11.',tp:'Multiplying in scientific notation: multiply coefficients, add exponents. Then adjust if needed: 15×10¹⁰ = 1.5×10¹¹.',tags:['exponents','boss','scientific-notation','physics'],d:5}),
        prob(`problem-5-${ch}-13-3`,`level-5-${ch}-13`,3,{s:'Solve: (3²)³ ÷ 3⁴ × 3⁰. What is the result?',a:num(9,'3^(6-4+0)=3²=9'),h:[hint(1,'Apply power-of-power first, then quotient and product rules.','conceptual'),hint(2,'(3²)³=3⁶. Then 3⁶÷3⁴=3². Then 3²×3⁰=3²×1=3².','directional'),hint(3,'3²=9.','scaffolded')],sol:'3⁶÷3⁴×3⁰ = 3^(6-4+0) = 3² = 9.',tp:'This boss problem uses ALL exponent rules: power-of-power (multiply), quotient (subtract), product (add), and zero exponent. Master of exponents!',tags:['exponents','boss','all-rules','final-challenge'],d:5}),
      ]),
  ];
  return {
    id: cid, worldId: 'world-5', number: ch, name: 'Exponent Expanse', topic: 'Exponents',
    weekStart: 34, weekEnd: 36, levels,
    learningObjectives: [
      'Evaluate powers using repeated multiplication',
      'Identify patterns in powers of 2, 3, and 10',
      'Apply product rule: multiply same base → add exponents',
      'Apply quotient rule: divide same base → subtract exponents',
      'Apply power-of-a-power rule: multiply exponents',
      'Understand and apply the zero exponent rule',
      'Identify common exponent errors',
      'Read and write scientific notation'
    ],
    signatureContent: ['exponent-notation','power-rules','zero-exponent','scientific-notation','find-the-error'],
    isBoss: true
  };
}

// ━━━ EXPORT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function createChapters10to12() {
  return [createChapter10(), createChapter11(), createChapter12()];
}
