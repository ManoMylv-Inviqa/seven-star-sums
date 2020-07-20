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
type Operator1 = '+' | 'x';

export type Props = { children: ReactNode };
type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type AnswerState = {
  possibleAns: number[];
  correctAns: number | null;
  setPossibleAns: StateSetter<AnswerState['possibleAns']>;
  setCorrectAns: StateSetter<AnswerState['correctAns']>;
};

export type ScoreState = {
  totalLives: number;
  livesLeft: number;
  score: number;
  setTotalLives: StateSetter<ScoreState['totalLives']>;
  setLivesLeft: StateSetter<ScoreState['livesLeft']>;
  setScore: StateSetter<ScoreState['score']>;
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
  possibleNums: number[];
  num1: number | null;
  num2: AnswerButton;
  baseNum: number;
  op1: Operator1;
  op2: string;
  rightWrong: boolean | null;
  setPossibleNums: StateSetter<SumState['possibleNums']>;
  setNum1: StateSetter<SumState['num1']>;
  setNum2: StateSetter<SumState['num2']>;
  setBaseNum: StateSetter<SumState['baseNum']>;
  setOp1: StateSetter<SumState['op1']>;
  setOp2: StateSetter<SumState['op2']>;
  setRightWrong: StateSetter<SumState['rightWrong']>;
};

export interface SettingsModel {
  finalBaseNum: number;
  finalOperator: SumState['op1'];
  finalDifficulty: number;
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
