import * as fs from 'fs';

const fileValues = fs.readFileSync('day7/input.txt', 'utf8');

type FileTree = { [key: string]: string[] };
type FileSize = { [key: string]: number };

const getTreeStructure = (lines: string[]): FileTree => {
  const currentPath: string[] = [];
  const fileTree: FileTree = {};

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].includes('$ cd') && lines[i] !== '$ cd ..') {
      currentPath.push(lines[i].split(' ')[2]);
    } else if (lines[i] === '$ cd ..') {
      currentPath.pop();
    } else if (lines[i] === '$ ls') {
      i++;
      if (!fileTree[currentPath.join(' ')]) {
        fileTree[currentPath.join(' ')] = [];
      }
      while (i < lines.length && !lines[i].includes('$ cd')) {
        if (lines[i].includes('dir')) {
          var dir = currentPath.join(' ') + ' ' + lines[i].split(' ')[1];
          fileTree[currentPath.join(' ')].push(dir);
        } else {
          fileTree[currentPath.join(' ')].push(lines[i]);
        }
        i++;
      }
      i--;
      continue;
    }
  }

  return fileTree;
};

const calculateSize = (key: string, fileTree: FileTree) => {
  var size = 0;
  for (var i = 0; i < fileTree[key].length; i++) {
    var curr = fileTree[key][i];
    if (curr.includes('/')) {
      size += calculateSize(curr, fileTree);
    } else {
      size += parseInt(curr.split(' ')[0]);
    }
  }
  return size;
};

const calculateDirectorySize = (fileTree: FileTree) => {
  let sizeObject: FileSize = {};
  const keys = Object.keys(fileTree);
  keys.forEach((key) => {
    sizeObject[key] = calculateSize(key, fileTree);
  });
  return sizeObject;
};

const part1 = (directorySize: FileSize) => {
  let part1: number = 0;
  Object.values(directorySize).forEach((size) => {
    if (size <= 100000) {
      part1 += size;
    }
  });
  return part1;
};

const part2 = (directorySize: FileSize) => {
  const updateSize = 30000000;
  const currentFree = 70000000 - directorySize['/'];
  const required = updateSize - currentFree;
  let smallest = Infinity;

  Object.values(directorySize).forEach((size) => {
    if (size < smallest && size > required) {
      smallest = size;
    }
  });
  return smallest;
};

const solve = (input: string, part: string) => {
  const lines = input.split('\r\n');

  const fileTree = getTreeStructure(lines);
  const directorySize = calculateDirectorySize(fileTree);

  switch (part) {
    case 'part1':
      return part1(directorySize);
    case 'part2':
      return part2(directorySize);
  }
};

console.log('Answer for question 1: ', solve(fileValues, 'part1'));
console.log('Answer for question 2: ', solve(fileValues, 'part2'));
