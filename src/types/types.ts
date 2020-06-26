type GameStates = 'startGame' | 'showSettings' | 'showSum' | 'confirmAnswer' | 'showResult' | 'endWin' | 'endLose';

type AnswerButton = number | '?';

export interface AppState {
  showSplash: boolean;
  gameStatus: GameStates;
  possibleNums: number[];
  baseNum: number;
  num1: number | null;
  num2: AnswerButton;
  op1: string;
  op2: string;
  possibleAns: number[];
  correctAns: number | null;
  gotItRight: boolean | null;
  score: number;
  totalLives: number;
  livesLeft: number;
}

interface AnswerMethod {
  (a: number, b: number): number;
}

export interface AnswerMethodsObj {
  [key: string]: AnswerMethod;
}

export interface SettingsPayload {
  baseNum: number;
  operator: '+' | 'x';
  difficulty: number;
}

export type GenericFunc = (arg0: any) => void;
