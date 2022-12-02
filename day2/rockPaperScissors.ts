//ts-ignore
import * as fs from 'fs';

const fileValues = fs.readFileSync('input.txt', 'utf8');

let rockPaperScissorRounds = fileValues.split('\n');

let totalScorePart1 = 0;
let totalScorePart2 = 0;

// Elf Strategy: A for Rock, B for Paper, and C for Scissors
// Part1, My Strategy: X for Rock, Y for Paper, and Z for Scissors
/**
 * The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors)
 * plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
 */
const playRound = new Map<string, number>([
  // Wins
  ['A Y', 6 + 2],
  ['B Z', 6 + 3],
  ['C X', 6 + 1],
  // Draws
  ['A X', 3 + 1],
  ['B Y', 3 + 2],
  ['C Z', 3 + 3],
  // Lose
  ['A Z', 0 + 3],
  ['B X', 0 + 1],
  ['C Y', 0 + 2],
]);

/**
 * Part 2: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win.
 */
const mapNewStrategyToShape = new Map<string, string>([
  // Wins
  ['A Z', 'A Y'],
  ['B Z', 'B Z'],
  ['C Z', 'C X'],
  // Draws
  ['A Y', 'A X'],
  ['B Y', 'B Y'],
  ['C Y', 'C Z'],
  // Lose
  ['A X', 'A Z'],
  ['C X', 'C Y'],
  ['B X', 'B X'],
]);

// Round 1
rockPaperScissorRounds.forEach((round) => {
  const points = playRound.get(round);

  totalScorePart1 += points!;
});

//Round 2
rockPaperScissorRounds.forEach((round) => {
  const getShape = mapNewStrategyToShape.get(round);
  const points = playRound.get(getShape!);

  totalScorePart2 += points!;
});

console.log('Answer for question 1: ', totalScorePart1);
console.log('Answer for question 2: ', totalScorePart2);
