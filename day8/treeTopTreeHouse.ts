import * as fs from 'fs';

const fileValues = fs.readFileSync('input.txt', 'utf8');

const trees: number[][] = fileValues
  .split('\r\n')
  .map((row) => row.split('').map((r) => parseInt(r)));

const findVisibleTrees = (trees: number[][], inset: number): number => {
  let x = inset;
  let y = inset;
  let score = 0;
  let state = 0;

  while (state < 4) {
    let slices: number[][] = [[], []];
    for (let i = 0; i < trees.length; i++) {
      if (i == y) continue;
      slices[Number(i < y)].push(trees[i][x]);
    }

    slices.push(trees[y].slice(0, x));
    slices.push(trees[y].slice(x + 1, trees[y].length));

    for (let i = 0; i < slices.length; i++) {
      const slice = slices[i];
      if (Math.max(...slice) < trees[y][x]) {
        score++;
        break;
      }
    }

    if (inset == Math.trunc(trees.length / 2)) return score;

    switch (state) {
      case 0:
        if (++x >= trees[y].length - inset - 1) state++;
        break;
      case 1:
        if (++y >= trees.length - inset - 1) state++;
        break;
      case 2:
        if (--x <= inset) state++;
        break;
      case 3:
        if (--y <= inset) state++;
        break;
    }
  }

  return score + findVisibleTrees(trees, ++inset);
};

const part1 = (trees: number[][]) => {
  return 2 * trees.length + 2 * (trees.length - 2) + findVisibleTrees(trees, 1);
};

const part2 = (trees: number[][]) => {
  let max = 0;

  for (let i = 0; i < trees.length; i++) {
    const row = trees[i];
    for (let j = 0; j < row.length; j++) {
      const tree = row[j];
      let score = 1;

      let slices: number[][] = [[], []];
      for (let k = 0; k < trees.length; k++) {
        if (k == i) continue;
        slices[Number(k < i)].push(trees[k][j]);
      }
      slices[1].reverse();

      slices.push(trees[i].slice(0, j).reverse());
      slices.push(trees[i].slice(j + 1, trees[i].length));

      for (let i = 0; i < slices.length; i++) {
        const slice = slices[i];
        for (let k = 0; k < slice.length; k++) {
          if (slice[k] >= tree) {
            slices[i] = slice.slice(0, k + 1);
            break;
          }
        }
      }

      slices.forEach((s) => {
        score *= s.length;
      });

      if (score > max) max = score;
    }
  }

  return max;
};

console.log('Answer for question 1: ', part1(trees));
console.log('Answer for question 2: ', part2(trees));
