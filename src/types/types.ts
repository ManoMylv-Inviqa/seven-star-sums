import { ReactNode } from 'react';

// CONTEXT AND STATE TYPES

export type GameStates =
  | 'startGame'
  | 'showSettings'
  | 'defineNums'
  | 'defineSum'
  | 'resetGame'
  | 'showSum'
  | 'confirmAnswer'
  | 'showResult'
  | 'endWin'
  | 'endLose';

type AnswerButton = number | '?';
type SumTypes = 'bonds' | 'tables';
type Operator1 = '+' | '-' | 'x' | '÷';

export type Props = { children: ReactNode };
type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type AnswerState = {
  possibleAns: number[];
  correctAns: number | null;
  setPossibleAns: StateSetter<AnswerState['possibleAns']>;
  setCorrectAns: StateSetter<AnswerState['correctAns']>;
};

interface WrongAnswer {
  correctAnswer: AnswerState['correctAns'];
  playerAnswer: AnswerButton;
  completeSum: string;
}

export type ScoreState = {
  totalLives: number;
  livesLeft: number;
  score: number;
  wrongAnswers: WrongAnswer[];
  setTotalLives: StateSetter<ScoreState['totalLives']>;
  setLivesLeft: StateSetter<ScoreState['livesLeft']>;
  setScore: StateSetter<ScoreState['score']>;
  setWrongAnswers: StateSetter<ScoreState['wrongAnswers']>;
};

export type StatusState = {
  gameStatus: GameStates;
  showSplash: boolean;
  isLocalSettings: boolean;
  setGameStatus: StateSetter<StatusState['gameStatus']>;
  setShowSplash: StateSetter<StatusState['showSplash']>;
  setIsLocalSettings: StateSetter<StatusState['isLocalSettings']>;
};

export type SumState = {
  sumType: SumTypes;
  possibleNums: number[];
  num1: number | null;
  num2: AnswerButton;
  baseNum: number;
  op1: Operator1;
  rightWrong: boolean | null;
  answerCheck: boolean;
  isHard: boolean;
  setSumType: StateSetter<SumState['sumType']>;
  setPossibleNums: StateSetter<SumState['possibleNums']>;
  setNum1: StateSetter<SumState['num1']>;
  setNum2: StateSetter<SumState['num2']>;
  setBaseNum: StateSetter<SumState['baseNum']>;
  setOp1: StateSetter<SumState['op1']>;
  setRightWrong: StateSetter<SumState['rightWrong']>;
  setAnswerCheck: StateSetter<SumState['answerCheck']>;
  setIsHard: StateSetter<SumState['isHard']>;
};

export interface SettingsModel {
  finalSumType: SumState['sumType'];
  finalBaseNum: number;
  finalOperator: SumState['op1'];
  finalDifficulty: number;
  finalAnswerCheck: SumState['answerCheck'];
  finalIsHard: SumState['isHard'];
}

// METHOD AND FUNCTION TYPES

interface AnswerMethod {
  (a: number, b: number): number;
}

export interface AnswerMethodsObj {
  [key: string]: AnswerMethod;
}

export type GenericFunc<T> = (arg0: T) => void;
export type OptionsMap<T> = T[];

export interface DefineSumResult {
  randomNum: SumState['num1'];
  possibleAns: AnswerState['possibleAns'];
  answer1: AnswerState['correctAns'];
}

export type NumberSet<T> = (a: number, b: Function, c: T) => Set<number>;
export type WrongAnswerArgs = [SumState['baseNum'], SumState['sumType'], number];
export type SumNumberOrder = Array<SumState['num1'] | SumState['num2'] | SumState['baseNum']>;
