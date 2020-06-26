import React from 'react';
import Button from '../../UI/atoms/Button/Button';
import withAnimation from '../../HOCs/withAnimation/withAnimation';
import { AppState } from '../../types/types';
import '../Answers/Answers.css';
import './Result.css';

interface ResultProps extends React.HTMLAttributes<HTMLDivElement> {
  nextQ(): void;
  rightWrong: AppState['gotItRight'];
  score: AppState['score'];
  correctAns: AppState['correctAns'];
}

const Result: React.FC<ResultProps> = ({ nextQ, rightWrong, score, correctAns }) => {
  const borderStyle = rightWrong ? 'green-border' : 'red-border';
  const starNum = score === 1 ? 'a' : 'another';
  const modifiers = 'horizontal';

  return (
    <div className={`container answer-container flex-order--2 ${borderStyle}`}>
      <div className="result-container">
        <h4 className="white-text">
          {rightWrong
            ? `Yay, you got the sum right! Have ${starNum} star!`
            : `Unlucky! The correct answer was ${correctAns}. You lose a life, but try again with another sum.`}
        </h4>
      </div>
      <Button type="button" handler={nextQ} modifiers={modifiers}>
        Next question
      </Button>
    </div>
  );
};

export default withAnimation(Result, 'showResult');
