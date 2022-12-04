import * as fs from 'fs';

const fileValues = fs.readFileSync('input.txt', 'utf8');

let initialCampCleanUpPairs = fileValues.split('\r\n');

let totalScorePart1 = 0;
let totalScorePart2 = 0;

let cleanedCampCleanUpPairs = initialCampCleanUpPairs.map((pair) => {
  return pair.replace(/-/g, ',').split(',');
});

cleanedCampCleanUpPairs.forEach((pair) => {
  const [min1, max1, min2, max2] = [
    parseInt(pair[0]),
    parseInt(pair[1]),
    parseInt(pair[2]),
    parseInt(pair[3]),
  ];

  //part1
  if ((min1 <= min2 && max2 <= max1) || (min2 <= min1 && max1 <= max2)) {
    totalScorePart1++;
  }
  //part2
  if (!(max1 < min2 || max2 < min1)) {
    totalScorePart2++;
  }
});

console.log('Answer for question 1: ', totalScorePart1);
console.log('Answer for question 2: ', totalScorePart2);
