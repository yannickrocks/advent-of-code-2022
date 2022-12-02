import * as fs from 'fs';

const fileValues = fs.readFileSync('input.txt', 'utf8');

let elvesWithArrayCalories = fileValues.split(/\r?\n\r?\n/);

let currentTotal = 0;

let allCaloriesSum: number[] = [];

for (let i = 0; i < elvesWithArrayCalories.length; i++) {
  const caloriesThatElfHas = elvesWithArrayCalories[i].split('\n');

  const sumOfCalories = caloriesThatElfHas.reduce(
    (partialSum, a) => partialSum + parseFloat(a),
    0
  );

  if (currentTotal < sumOfCalories) {
    currentTotal = sumOfCalories;
  }
  allCaloriesSum.push(sumOfCalories);
}
allCaloriesSum.sort((a, b) => b - a);

console.log('Answer to question 1: ', currentTotal);

console.log(
  'Answer to question 2: ',
  allCaloriesSum[0] + allCaloriesSum[1] + allCaloriesSum[2]
);
