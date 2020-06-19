import React from 'react';
import './Sum.css';
import '../_atoms/Button/Button.css';
import { AppState } from '../../types/types';

interface SumProps extends React.HTMLAttributes<HTMLDivElement> {
  num1: AppState['num1'];
  num2: AppState['num2'];
  op1: AppState['op1'];
  op2: AppState['op2'];
  baseNum: AppState['baseNum'];
  rightWrong: AppState['gotItRight'];
}

const Sum: React.FC<SumProps> = ({ num1, num2, op1, op2, baseNum, rightWrong }) => {
  let borderColour: string;
  if (rightWrong === null || num2 === '?') {
    borderColour = '';
  } else {
    borderColour = rightWrong ? 'border-green' : 'border-red';
  }
  return (
    <div className="container sum-container">
      <div className="btn--round btn--round-large">{num1}</div>
      <div className="btn--round btn--round-small">{op1}</div>
      <div className={`btn--round btn--round-large ${borderColour}`}>{num2}</div>
      <div className="btn--round btn--round-small">{op2}</div>
      <div className="btn--round btn--round-large">{baseNum}</div>
    </div>
  );
};

export default Sum;
