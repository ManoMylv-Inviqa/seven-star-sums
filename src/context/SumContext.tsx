import React, { useState, useMemo, useContext } from 'react';
import { SumState, Props } from '../types/types';

const SumContext = React.createContext<Partial<SumState>>({});
const { Provider } = SumContext;

const SumProvider = ({ children }: Props): JSX.Element => {
  const [possibleNums, setPossibleNums] = useState([] as SumState['possibleNums']);
  const [num1, setNum1] = useState(null as SumState['num1']);
  const [num2, setNum2] = useState('?' as SumState['num2']);
  const [baseNum, setBaseNum] = useState(20);
  const [op1, setOp1] = useState('+' as SumState['op1']);
  const [op2, setOp2] = useState('=');
  const [rightWrong, setRightWrong] = useState(null as SumState['rightWrong']);

  const sumState = useMemo(
    () => ({
      possibleNums,
      num1,
      num2,
      baseNum,
      op1,
      op2,
      rightWrong,
      setPossibleNums,
      setNum1,
      setNum2,
      setBaseNum,
      setOp1,
      setOp2,
      setRightWrong
    }),
    [possibleNums, num1, num2, baseNum, op1, op2, rightWrong]
  );

  return <Provider value={sumState}>{children}</Provider>;
};

const useSum = (): SumState => {
  const {
    possibleNums,
    num1,
    num2,
    baseNum,
    op1,
    op2,
    rightWrong,
    setPossibleNums,
    setNum1,
    setNum2,
    setBaseNum,
    setOp1,
    setOp2,
    setRightWrong
  } = useContext(SumContext);

  if (
    possibleNums === undefined ||
    num1 === undefined ||
    num2 === undefined ||
    baseNum === undefined ||
    op1 === undefined ||
    op2 === undefined ||
    rightWrong === undefined ||
    setPossibleNums === undefined ||
    setNum1 === undefined ||
    setNum2 === undefined ||
    setBaseNum === undefined ||
    setOp1 === undefined ||
    setOp2 === undefined ||
    setRightWrong === undefined
  ) {
    throw new Error('useSum must be used within a SumProvider');
  }

  return {
    possibleNums,
    num1,
    num2,
    baseNum,
    op1,
    op2,
    rightWrong,
    setPossibleNums,
    setNum1,
    setNum2,
    setBaseNum,
    setOp1,
    setOp2,
    setRightWrong
  };
};

export { SumProvider, useSum };
