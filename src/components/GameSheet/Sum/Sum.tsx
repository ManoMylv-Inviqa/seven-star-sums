import React from 'react';
import './Sum.css';
import '../../../UI/atoms/Button/Button.css';
import { useSum } from '../../../context/SumContext';

const Sum: React.FC = () => {
  const { num1, num2, op1, op2, baseNum, rightWrong } = useSum();
  let borderColour: string;
  if (rightWrong === null || num2 === '?') {
    borderColour = '';
  } else {
    borderColour = rightWrong ? 'border-green' : 'border-red';
  }
  const bonds = op1 === '+';
  const circle2 = bonds ? num2 : baseNum;
  const circle3 = bonds ? baseNum : num2;
  const circle2Styles = bonds ? `btn--round btn--round-large ${borderColour}` : 'btn--round btn--round-large';
  const circle3Styles = bonds ? 'btn--round btn--round-large' : `btn--round btn--round-large ${borderColour}`;
  return (
    <div className="container sum-container">
      <div className="btn--round btn--round-large">{num1}</div>
      <div className="btn--round btn--round-small">{op1}</div>
      <div className={circle2Styles}>{circle2}</div>
      <div className="btn--round btn--round-small">{op2}</div>
      <div className={circle3Styles}>{circle3}</div>
    </div>
  );
};

export default Sum;
