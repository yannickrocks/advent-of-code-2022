import * as fs from 'fs';

const fileValues = fs.readFileSync('day9/input.txt', 'utf8');

type Position = { row: number; column: number };
type Direction = 'L' | 'R' | 'U' | 'D';
type Action = { direction: Direction; amount: number };

const position1 = [
  { row: 0, column: 0 },
  { row: 0, column: 0 },
];
const position2 = [];
for (let i = 0; i < 10; i += 1) {
  position2.push({ row: 0, column: 0 });
}

const translation: Action[] = fileValues.split(/\r?\n/g).map((action) => {
  const [direction, steps] = action.split(/\s/g);
  return { direction, amount: parseInt(steps) } as Action;
});

const uniqueTailPositions = (rope: Position[], actions: Action[]) => {
  const positions: Set<string> = new Set();
  positions.add(`0-0`);
  let head = rope[0];
  let tail = rope[1];
  for (const { direction, amount } of actions) {
    for (let i = 0; i < amount; i += 1) {
      head = rope[0];
      switch (direction) {
        case 'L':
          head.column -= 1;
          break;
        case 'R':
          head.column += 1;
          break;
        case 'U':
          head.row += 1;
          break;
        case 'D':
          head.row -= 1;
      }
      for (let j = 1; j < rope.length; j += 1) {
        head = rope[j - 1];
        tail = rope[j];
        const distance = {
          row: head.row - tail.row,
          column: head.column - tail.column,
        };
        tailMove(distance, head, tail);
      }
      positions.add(`${tail.row}-${tail.column}`);
    }
  }
  return positions;
};

const tailMove = (distance: Position, head: Position, tail: Position) => {
  const sameRow = head.row === tail.row;
  const sameCol = head.column === tail.column;
  const isAligned = sameRow || sameCol;
  const hasRowDistance = Math.abs(distance.row) > 1;
  const hasColumnDistance = Math.abs(distance.column) > 1;
  const hasDistance = hasRowDistance || hasColumnDistance;

  if (hasDistance && isAligned) {
    if (sameRow) {
      tail.column += distance.column > 0 ? 1 : -1;
    } else if (sameCol) {
      tail.row += distance.row > 0 ? 1 : -1;
    }
  } else if (hasRowDistance || hasColumnDistance) {
    tail.row += head.row > tail.row ? 1 : -1;
    tail.column += head.column > tail.column ? 1 : -1;
  }
};

const hits1 = uniqueTailPositions(position1, translation);
const hits2 = uniqueTailPositions(position2, translation);
console.log('Answer for question 1: ', hits1.size);
console.log('Answer for question 2: ', hits2.size);
