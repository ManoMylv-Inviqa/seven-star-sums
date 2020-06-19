import React from 'react';
import Answer from './Answer/Answer';
import './Answers.css';
import withAnimation from '../../HOCs/withAnimation/withAnimation';
import { AppState } from '../../types/types';

interface AnswersProps extends React.HTMLAttributes<HTMLDivElement> {
  answers: AppState['possibleAns'];
  clicked(answer: number): void;
  gameStatus: AppState['gameStatus'];
}

const Answers: React.FC<AnswersProps> = ({ answers, clicked, gameStatus }) => {
  const answerMap = answers.map(
    (answer): JSX.Element => {
      return <Answer key={`answer-${answer}`} value={answer} clicked={(): void => clicked(answer)} />;
    }
  );

  const order = gameStatus === 'showSum' ? 'flex-order--1' : 'flex-order--4';

  return (
    <div className={`container answer-container ${order}`}>
      <div>
        <h4 className="white-text">Choose an answer:</h4>
      </div>
      {answerMap}
    </div>
  );
};

export default withAnimation(Answers, 'showSum');
