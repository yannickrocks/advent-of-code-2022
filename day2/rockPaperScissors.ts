import * as fs from 'fs';

const fileValues = fs.readFileSync('day2/input.txt', 'utf8');

let rockPaperScissorRounds = fileValues
  .split('\r\n')
  .map((round) => round.replace(' ', ''));

// Elf Strategy: A for Rock, B for Paper, and C for Scissors
// Part1, My Strategy: X for Rock, Y for Paper, and Z for Scissors
/**
 * The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors)
 * plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
 */

const playRound = new Map<string, number>([
  // Wins
  ['AY', 6 + 2],
  ['BZ', 6 + 3],
  ['CX', 6 + 1],
  // Draws
  ['AX', 3 + 1],
  ['BY', 3 + 2],
  ['CZ', 3 + 3],
  // Lose
  ['AZ', 0 + 3],
  ['BX', 0 + 1],
  ['CY', 0 + 2],
]);

/**
 * Part 2: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win.
 */
const mapNewStrategyToShape = new Map<string, string>([
  // Wins
  ['AZ', 'AY'],
  ['BZ', 'BZ'],
  ['CZ', 'CX'],
  // Draws
  ['AY', 'AX'],
  ['BY', 'BY'],
  ['CY', 'CZ'],
  // Lose
  ['AX', 'AZ'],
  ['CX', 'CY'],
  ['BX', 'BX'],
]);

let totalScorePart1 = 0;
let totalScorePart2 = 0;

// Round 1 & 2
rockPaperScissorRounds.forEach((round) => {
  const round1Points = playRound.get(round);
  totalScorePart1 += round1Points!;

  const getShape = mapNewStrategyToShape.get(round);
  const round2points = playRound.get(getShape!);

  totalScorePart2 += round2points!;
});
console.log('Answer for question 1: ', totalScorePart1);
console.log('Answer for question 2: ', totalScorePart2);
