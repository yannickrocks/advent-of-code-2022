import * as fs from 'fs';

const fileValues = fs.readFileSync('input.txt', 'utf8');

let rucksacks = fileValues.split('\r\n');

const itemPrioritizeValues: Map<string, number> = new Map();

/**
 * To help prioritize item rearrangement, every item type can be converted to a priority:
 * Lowercase item types a through z have priorities 1 through 26.
 * Uppercase item types A through Z have priorities 27 through 52.
 */
let lowerPriorityValue = 1;
let higherPriorityValue = 27;

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

alphabet.forEach((letter) => {
  itemPrioritizeValues.set(letter.toLowerCase(), lowerPriorityValue);
  itemPrioritizeValues.set(letter, higherPriorityValue);

  lowerPriorityValue++;
  higherPriorityValue++;
});

let totalScorePart1 = 0;
let totalScorePart2 = 0;

function searching(part1: string, part2: string, part3?: string): string {
  let foundItem: string;
  part1.split('').every((item) => {
    if (part2.includes(item)) {
      foundItem = item;
      if (part3 && part3.includes(item)) {
        foundItem = item;
      } else {
        return true;
      }
      return false;
    }
    return true;
  });
  return foundItem;
}

function findPriorityItem(rucksack: string): void {
  const middle = Math.floor(rucksack.length / 2);
  const firstCompartment = rucksack.substring(0, middle);
  const secondCompartment = rucksack.substring(middle, rucksack.length);

  let foundItem: string = searching(firstCompartment, secondCompartment);
  const priorityValue = itemPrioritizeValues.get(foundItem);

  totalScorePart1 += priorityValue;
}

for (let i = 0; i < rucksacks.length; i += 3) {
  const groupRucksack1 = rucksacks[i];
  const groupRucksack2 = rucksacks[i + 1];
  const groupRucksack3 = rucksacks[i + 2];

  //Part 1
  findPriorityItem(groupRucksack1);
  findPriorityItem(groupRucksack2);
  findPriorityItem(groupRucksack3);

  //Part 2
  let foundItem: string = searching(
    groupRucksack1,
    groupRucksack2,
    groupRucksack3
  );

  totalScorePart2 += itemPrioritizeValues.get(foundItem);
}

console.log('Answer for question 1: ', totalScorePart1);
console.log('Answer for question 2: ', totalScorePart2);
