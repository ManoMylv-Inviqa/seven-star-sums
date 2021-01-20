import React from 'react';
import './Sum.css';
import '../../../UI/atoms/Button/Button.css';
import { useSum } from '../../../context/SumContext';
import { getSumNumberOrder } from '../../../helpers/helpers';

const Sum: React.FC = () => {
  const { sumType, num1, num2, op1, baseNum, rightWrong } = useSum();
  let borderColour: string;
  if (rightWrong === null || num2 === '?') {
    borderColour = '';
  } else {
    borderColour = rightWrong ? 'border-green' : 'border-red';
  }
  const bonds = sumType === 'bonds';
  const sumOrder = getSumNumberOrder(op1, num1, num2, baseNum);
  const circle2Styles = bonds ? `btn--round btn--round-large ${borderColour}` : 'btn--round btn--round-large';
  const circle3Styles = bonds ? 'btn--round btn--round-large' : `btn--round btn--round-large ${borderColour}`;
  return (
    <div className="container sum-container">
      <div className="btn--round btn--round-large">{sumOrder[0]}</div>
      <div className="btn--round btn--round-small">{op1}</div>
      <div className={circle2Styles}>{sumOrder[1]}</div>
      <div className="btn--round btn--round-small">=</div>
      <div className={circle3Styles}>{sumOrder[2]}</div>
    </div>
  );
};

export default Sum;
