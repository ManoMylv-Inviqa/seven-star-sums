import React, { useState, useMemo, useContext } from 'react';
import { AnswerState, Props } from '../types/types';

const AnswerContext = React.createContext<Partial<AnswerState>>({});
const { Provider } = AnswerContext;

const AnswerProvider = ({ children }: Props): JSX.Element => {
  const [possibleAns, setPossibleAns] = useState([] as number[]);
  const [correctAns, setCorrectAns] = useState(null as AnswerState['correctAns']);

  const answerState = useMemo(() => ({ possibleAns, correctAns, setPossibleAns, setCorrectAns }), [
    possibleAns,
    correctAns
  ]);
  return <Provider value={answerState}>{children}</Provider>;
};

const useAnswer = (): AnswerState => {
  const { possibleAns, correctAns, setPossibleAns, setCorrectAns } = useContext(AnswerContext);

  if (
    possibleAns === undefined ||
    correctAns === undefined ||
    setPossibleAns === undefined ||
    setCorrectAns === undefined
  ) {
    throw new Error('useAnswer must be used within a AnswerProvider');
  }

  return { possibleAns, correctAns, setPossibleAns, setCorrectAns };
};

export { AnswerProvider, useAnswer };
