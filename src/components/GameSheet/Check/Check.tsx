import React, { useEffect, useCallback } from 'react';
import Button from '../../../UI/atoms/Button/Button';
import '../Answers/Answers.css';
import withAnimation from '../../../HOCs/withAnimation/withAnimation';
import { useStatus } from '../../../context/StatusContext';
import { useAnswer } from '../../../context/AnswerContext';
import { useSum } from '../../../context/SumContext';
import { useScore } from '../../../context/ScoreContext';
import { getSumNumberOrder } from '../../../helpers/helpers';

const Check: React.FC = (): JSX.Element => {
  const { setGameStatus } = useStatus();
  const { correctAns } = useAnswer();
  const { op1, num1, num2, baseNum, answerCheck, possibleNums, setNum2, setRightWrong, setPossibleNums } = useSum();
  const { wrongAnswers, setLivesLeft, setScore, setWrongAnswers } = useScore();

  const assessAnswer = useCallback((): void => {
    const isCorrect = num2 === correctAns;
    setRightWrong(isCorrect);
    setGameStatus('showResult');
    if (!isCorrect) {
      setLivesLeft((prevLives) => prevLives - 1);
      setPossibleNums([...possibleNums].concat(num1 as number));
      const sumOrder = getSumNumberOrder(op1, num1, correctAns as number, baseNum);
      const sum = `${sumOrder[0]} ${op1} ${sumOrder[1]} = ${sumOrder[2]}`;
      setWrongAnswers([
        ...wrongAnswers,
        {
          correctAnswer: correctAns,
          playerAnswer: num2,
          completeSum: sum
        }
      ]);
      return;
    }
    setScore((prevScore) => prevScore + 1);
    // eslint-disable-next-line
  }, []);

  const yesButtonHandler = (): void => assessAnswer();

  const noButtonHandler = (): void => {
    setNum2('?');
    setGameStatus('showSum');
  };

  const modifiers = 'horizontal';

  // If the user has checks switched off assess the answer straight away
  useEffect(() => {
    if (!answerCheck) {
      assessAnswer();
    }
  }, [answerCheck, assessAnswer]);

  return (
    <div className="container answer-container flex-order--3">
      {answerCheck ? (
        <>
          <div>
            <h4 className="white-text">Are you sure?</h4>
          </div>
          <Button type="button" handler={yesButtonHandler} modifiers={modifiers}>
            Yes
          </Button>
          <Button type="button" handler={noButtonHandler} modifiers={modifiers}>
            No
          </Button>
        </>
      ) : (
        <div />
      )}
    </div>
  );
};

export default withAnimation(Check, 'confirmAnswer');
