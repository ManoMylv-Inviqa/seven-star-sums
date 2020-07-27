import { SumState, SettingsModel, AnswerMethodsObj, DefineSumResult, NumberSet, WrongAnswerArgs } from '../types/types';

// fn retuns a random integer with a ceiling based on the number given
export const getRandomNumber = (base: number): number => {
  return Math.floor(Math.random() * Math.floor(base));
};

// fn returns an array of numbers in order from 1 to endNum
export const getNumberRange = (endNum: number): number[] => {
  return Array.from(new Array(endNum), (_, index) => index + 1);
};

// fn returns an array of numbers in order based on the type of sum chosen in settings
// Runs when gameStatus is 'defineNums'
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

// fn returns a single possible WRONG answer. Takes the correct answer and randomly
// either adds or takes away a variance. Variance depends on the type of sum.
const getWrongAnswer = (baseNum: SumState['baseNum'], op1: SumState['op1'], answer1: number): number => {
  const lessOrMore = getRandomNumber(2) > 0;
  const answerVariance = op1 === '+' ? 3 : baseNum;
  let wrongAnswer = lessOrMore
    ? answer1 + (getRandomNumber(answerVariance) + 1)
    : answer1 - (getRandomNumber(answerVariance) + 1);
  if (op1 === '+') {
    wrongAnswer = wrongAnswer > baseNum ? baseNum : wrongAnswer; // Don't allow random answer to be higher than the baseNum
  }
  wrongAnswer = wrongAnswer < 0 ? 0 : wrongAnswer; // Don't allow random answer to be negative
  return wrongAnswer;
};

// fn returns a set of numbers, based on set size, and function to define the numbers
const getNumberSet: NumberSet<number[] | WrongAnswerArgs> = (targetSetSize, func, args) => {
  const numberSet = new Set<number>();
  let i = 0;
  let a;
  while (i < targetSetSize) {
    a = func(...args);
    numberSet.add(a);
    i = numberSet.size;
  }
  return numberSet;
};

// fn pulls out a random number from possible number, returns an array of randomised possible
// answers of the correct one, and two others, also returns the correct answer by itself
// Runs when gameStatus is 'defineSum'
export const defineSum = (
  possibleNums: SumState['possibleNums'],
  baseNum: SumState['baseNum'],
  op1: SumState['op1']
): DefineSumResult => {
  // Choose a random number from the possible numbers array
  const randomNum = possibleNums[getRandomNumber(possibleNums.length)];
  // fn defines correct answer, and two incorrect other possibles
  const answer1 = answerMethod[op1](baseNum, randomNum);
  const wrongAnswerArray = [...getNumberSet(2, getWrongAnswer, [baseNum, op1, answer1])];
  // Put the possible answers into an array, ready to be shuffled
  const answerArray = [...wrongAnswerArray, answer1];
  // Create a random order of indices of 0, 1 and 2
  const answerSet: Set<number> = getNumberSet(3, getRandomNumber, [3]);
  // shuffle the possible answer array according to the random order of indices
  const possibleAns = [...answerSet].map((x) => answerArray[x]);

  return { randomNum, possibleAns, answer1 };
};

// fn to retrieve settings from local storage. Returns null if they are not saved.
export const getLocalSettings = (): SettingsModel | null => {
  const localSettings = window.localStorage.getItem('sevenStarSettings');
  if (localSettings) {
    return JSON.parse(localSettings);
  }
  return null;
};
