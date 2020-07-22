import { SumState, SettingsModel, AnswerMethodsObj, DefineSumResult } from '../types/types';

// fn retuns a random integer with a ceiling based on the number given
export const getRandomNumber = (base: number): number => {
  return Math.floor(Math.random() * Math.floor(base));
};

// fn returns an array of numbers in order from 1 to endNum
export const getNumberRange = (endNum: number): number[] => {
  return Array.from(new Array(endNum), (_, index) => index + 1);
};

// fn returns a set of numbers in random order from 0 to setSize
const getRandomIndexSet = (setSize: number): Set<number> => {
  const randomSet = new Set<number>();
  let i = 0;
  let a;
  while (i < 3) {
    a = getRandomNumber(setSize);
    randomSet.add(a);
    i = randomSet.size;
  }
  return randomSet;
};

// fn returns an array of numbers in order based on the type of sum chosen in settings
export const definePossibleNums = (baseNum: SumState['baseNum'], op1: SumState['op1']): number[] => {
  const numLimit = op1 === '+' ? baseNum - 1 : 12;
  return getNumberRange(numLimit);
};

// Define how to get answers based on the operator
// @todo add other methods when needed
export const answerMethod: AnswerMethodsObj = {
  '+': (a, b) => a - b,
  x: (a, b) => a * b
};

// fn pulls out a random number from possible number, returns an array of randomised possible
// answers of the correct one, and two others, also returns the correct answer by itself
export const defineSum = (
  possibleNums: SumState['possibleNums'],
  baseNum: SumState['baseNum'],
  op1: SumState['op2']
): DefineSumResult => {
  // Choose a random number from the possible numbers array,
  // based on the length of the possible numbers array
  const randomNum = possibleNums[getRandomNumber(possibleNums.length)];

  // Define correct answer, and two incorrect other possibles, +/- up to 3 to the correct answer
  const answer1 = answerMethod[op1](baseNum, randomNum);
  let answer2 = answer1 + (getRandomNumber(3) + 1);
  if (op1 === '+') {
    answer2 = answer2 > baseNum ? baseNum : answer2; // Don't allow random answer to be higher than the baseNum
  }
  let answer3 = answer1 - (getRandomNumber(3) + 1);
  answer3 = answer3 < 0 ? 0 : answer3; // Don't allow random answer to be negative
  // Put the possible answers into an array, ready to be shuffled
  const answerArray = [answer1, answer2, answer3];
  // Create a random order of indices of 0, 1 and 2
  const answerSet: Set<number> = getRandomIndexSet(3);

  // shuffle the possible answer array according to the random order of indices
  const possibleAns = [...answerSet].map((x) => answerArray[x]);

  return { randomNum, possibleAns, answer1 };
};

export const getLocalSettings = (): SettingsModel | null => {
  const localSettings = window.localStorage.getItem('sevenStarSettings');
  if (localSettings) {
    return JSON.parse(localSettings);
  }
  return null;
};
