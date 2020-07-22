import React from 'react';
import Button from '../../../UI/atoms/Button/Button';
import '../Answers/Answers.css';
import withAnimation from '../../../HOCs/withAnimation/withAnimation';
import { useStatus } from '../../../context/StatusContext';
import { useAnswer } from '../../../context/AnswerContext';
import { useSum } from '../../../context/SumContext';
import { useScore } from '../../../context/ScoreContext';

const Check: React.FC = (): JSX.Element => {
  const { setGameStatus } = useStatus();
  const { correctAns } = useAnswer();
  const { num2, setNum2, setRightWrong } = useSum();
  const { wrongAnswers, setLivesLeft, setScore, setWrongAnswers } = useScore();

  const yesButtonHandler = (): void => {
    const correct = num2 === correctAns;
    setRightWrong(correct);
    setGameStatus('showResult');
    if (!correct) {
      setLivesLeft((prevLives) => prevLives - 1);
      setWrongAnswers([
        ...wrongAnswers,
        {
          correctAnswer: correctAns,
          playerAnswer: num2
        }
      ]);
      return;
    }
    setScore((prevScore) => prevScore + 1);
  };

  const noButtonHandler = (): void => {
    setNum2('?');
    setGameStatus('showSum');
  };

  const modifiers = 'horizontal';

  return (
    <div className="container answer-container flex-order--3">
      <div>
        <h4 className="white-text">Are you sure?</h4>
      </div>
      <Button type="button" handler={yesButtonHandler} modifiers={modifiers}>
        Yes
      </Button>
      <Button type="button" handler={noButtonHandler} modifiers={modifiers}>
        No
      </Button>
    </div>
  );
};

export default withAnimation(Check, 'confirmAnswer');
