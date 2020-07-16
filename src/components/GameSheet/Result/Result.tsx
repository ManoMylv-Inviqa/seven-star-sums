import React from 'react';
import Button from '../../../UI/atoms/Button/Button';
import withAnimation from '../../../HOCs/withAnimation/withAnimation';
import '../Answers/Answers.css';
import './Result.css';
import { useStatus } from '../../../context/StatusContext';
import { useSum } from '../../../context/SumContext';
import { useAnswer } from '../../../context/AnswerContext';
import { useScore } from '../../../context/ScoreContext';

const Result: React.FC = () => {
  const { setGameStatus, setShowSplash } = useStatus();
  const { rightWrong, setRightWrong } = useSum();
  const { correctAns } = useAnswer();
  const { score, livesLeft } = useScore();

  const endWin = score === 7;
  const endLose = livesLeft === 0;

  const gameReviewHandler = (): void => {
    setGameStatus(endWin ? 'endWin' : 'endLose');
    setShowSplash(true);
  };

  const nextQuestionHandler = (): void => {
    setTimeout(() => {
      setRightWrong(null);
    }, 800);
    setGameStatus('defineSum');
  };

  const borderStyle = rightWrong ? 'green-border' : 'red-border';
  let starText = score === 1 && !endWin ? 'Have a star!' : 'Have another star!';
  if (endWin) {
    starText = 'You just got your seventh star, and won the game!';
  }
  const loseText = endLose
    ? 'You just lost your last life... Game over.'
    : 'You lose a life, but try again with another sum.';
  const modifiers = 'horizontal';

  return (
    <div className={`container answer-container flex-order--2 ${borderStyle}`}>
      <div className="result-container">
        <h4 className="white-text">
          {rightWrong
            ? `Yay, you got the sum right! ${starText}`
            : `Unlucky! The correct answer was ${correctAns}. ${loseText}`}
        </h4>
      </div>
      {endWin || endLose ? (
        <Button type="button" handler={gameReviewHandler} modifiers={modifiers}>
          Review game
        </Button>
      ) : (
        <Button type="button" handler={nextQuestionHandler} modifiers={modifiers}>
          Next question
        </Button>
      )}
    </div>
  );
};

export default withAnimation(Result, 'showResult');
