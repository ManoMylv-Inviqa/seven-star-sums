import {
  SumState,
  SettingsModel,
  AnswerMethodsObj,
  DefineSumResult,
  NumberSet,
  WrongAnswerArgs,
  SumNumberOrder
} from '../types/types';

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
export const definePossibleNums = (
  baseNum: SumState['baseNum'],
  sumType: SumState['sumType'],
  isHard: SumState['isHard']
): number[] => {
  if (sumType === 'tables' && isHard) {
    return [3, 4, 6, 7, 8, 9, 12];
  }
  const numLimit = sumType === 'bonds' ? baseNum - 1 : 12;
  return getNumberRange(numLimit);
};

// Define how to get answers based on the operator
// @todo add other methods when needed
export const answerMethod: AnswerMethodsObj = {
  '+': (a, b) => a - b,
  '-': (a, b) => a - b,
  x: (a, b) => a * b,
  '÷': (_, b) => b
};

// fn returns a single possible WRONG answer. Takes the correct answer and randomly
// either adds or takes away a variance. Variance depends on the type of sum.
const getWrongAnswer = (baseNum: SumState['baseNum'], sumType: SumState['sumType'], answer1: number): number => {
  const lessOrMore = getRandomNumber(2) > 0;
  const answerVariance = sumType === 'bonds' ? 3 : baseNum;
  let wrongAnswer = lessOrMore
    ? answer1 + (getRandomNumber(answerVariance) + 1)
    : answer1 - (getRandomNumber(answerVariance) + 1);
  if (sumType === 'bonds') {
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
  sumType: SumState['sumType'],
  possibleNums: SumState['possibleNums'],
  baseNum: SumState['baseNum'],
  op1: SumState['op1']
): DefineSumResult => {
  // Choose a random number from the possible numbers array
  const randomNum = possibleNums[getRandomNumber(possibleNums.length)];
  // fn defines correct answer, and two incorrect other possibles
  const answer1 = answerMethod[op1](baseNum, randomNum);
  const wrongAnswerArray = [...getNumberSet(2, getWrongAnswer, [baseNum, sumType, answer1])];
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

// fn to construct the sum depending on the operator chosen operator
export const getSumNumberOrder = (
  operator: SumState['op1'],
  number1: SumState['num1'],
  number2: SumState['num2'],
  baseNumber: SumState['baseNum']
): SumNumberOrder => {
  const divTotal = number1 ? number1 * baseNumber : baseNumber;
  const numOrder = {
    '+': [number1, number2, baseNumber],
    '-': [baseNumber, number2, number1],
    x: [number1, baseNumber, number2],
    '÷': [divTotal, baseNumber, number2]
  };
  return numOrder[operator];
};

export const getCssClasses = (baseClass: string, modifiers: string | string[] | undefined): string => {
  let CSSclasses = '';
  if (modifiers) {
    if (typeof modifiers === 'string') {
      CSSclasses = `${baseClass} ${baseClass}--${modifiers}`;
    }
    if (typeof modifiers === 'object' && modifiers !== null) {
      const expandedModifiers = modifiers.map((modifier) => `${baseClass}--${modifier}`).join(' ');
      CSSclasses = `${baseClass} ${expandedModifiers}`;
    }
    return CSSclasses;
  }
  CSSclasses = baseClass;
  return CSSclasses;
};
