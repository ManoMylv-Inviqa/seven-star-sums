import React from 'react';
import Answer from './Answer/Answer';
import './Answers.css';
import withAnimation from '../../../HOCs/withAnimation/withAnimation';
import { useStatus } from '../../../context/StatusContext';
import { useSum } from '../../../context/SumContext';
import { useAnswer } from '../../../context/AnswerContext';

const Answers: React.FC = () => {
  const { gameStatus, setGameStatus } = useStatus();
  const { setNum2 } = useSum();
  const { possibleAns } = useAnswer();

  const answerClickHandler = (answer: number): void => {
    setNum2(answer);
    setGameStatus('confirmAnswer');
  };

  const answerMap = possibleAns.map(
    (answer): JSX.Element => {
      return <Answer key={`answer-${answer}`} value={answer} clicked={(): void => answerClickHandler(answer)} />;
    }
  );

  const order = gameStatus === 'showSum' ? '1' : '4';

  return (
    <div className={`container answer-container flex-order--${order}`}>
      <div>
        <h4 className="white-text">Choose an answer:</h4>
      </div>
      {answerMap}
    </div>
  );
};

export default withAnimation(Answers, 'showSum');
