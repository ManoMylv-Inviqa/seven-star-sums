import { getRandomNumber } from './helpers';

export const correctText = ['Excellent!', 'Epic!', 'Yay!', 'Great!', 'Awesome!', 'Cool!', 'Sick!', 'Nice!', 'Woohoo!'];

export const wrongText = ['Oh dear!', 'Unlucky!', 'Ouch!', 'Eek!', 'Aaagh!', 'Oops!', 'Fail!'];

export const winText = ['Well done!', 'Amazing!', 'Incredible!', 'Wow!'];

export const loseText = ['Unlucky!', 'Oh well...', 'Good try, but...', 'It\u2019s sad news...', 'Boohoo!'];

export const getRandomText = (textArray: string[]): string => {
  return textArray[getRandomNumber(textArray.length)];
};
