import * as fs from 'fs';

const fileValues = fs.readFileSync('input.txt', 'utf8');

const solve = (input: string, markerOrMessage: number) => {
  const lines = input.split('');
  let markerArray: string[] = [];
  let result = 0;

  lines.some((marker, index) => {
    markerArray.push(marker);

    if (index > markerOrMessage) {
      markerArray.shift();
      if (new Set(markerArray).size === markerArray.length) {
        // array is unique
        result = index + 1;
        return true;
      }
    }
  });
  return result;
};

console.log('Answer for question 1: ', solve(fileValues, 3));
console.log('Answer for question 2: ', solve(fileValues, 13));
