import React from 'react';
import './GameReview.css';
import Heart from '../../../UI/atoms/Icons/Heart';
import Star from '../../../UI/atoms/Icons/Star';
import { useScore } from '../../../context/ScoreContext';
import { useSum } from '../../../context/SumContext';
import { answerMethod } from '../../../helpers/helpers';

const GameReview: React.FC = () => {
  const { totalLives, livesLeft, score, wrongAnswers } = useScore();
  const { baseNum, op1 } = useSum();

  const lostLives = totalLives - livesLeft;

  const pluralStars = score === 1 ? '' : 's';
  const pluralLives = lostLives === 1 ? 'life' : 'lives';

  const finalScore = `You won ${score} star${pluralStars}.`;
  const finalLives = `You lost ${lostLives} ${pluralLives}.`;

  const didLoseLives = lostLives > 0;

  const wrongSums = didLoseLives
    ? wrongAnswers.map((obj) => {
        const isAddition = op1 === '+';
        const missingNum = isAddition
          ? answerMethod[op1](baseNum, obj.correctAnswer as number)
          : (obj.correctAnswer as number) / baseNum;
        const sum = isAddition
          ? `${missingNum} + ${obj.correctAnswer} = ${baseNum}`
          : `${missingNum} x ${baseNum} = ${obj.correctAnswer}`;

        return (
          <div className="game-review__sum-container" key={`sum-${obj.correctAnswer}`}>
            <p>
              <span className="game-review__sum">{sum}</span>
              &nbsp;&nbsp;&nbsp;You answered&nbsp;
              <span className="game-review__answer game-review__answer--wrong">{obj.playerAnswer}</span>
              ;&nbsp; the correct answer was&nbsp;
              <span className="game-review__answer game-review__answer--right">{obj.correctAnswer}</span>
            </p>
          </div>
        );
      })
    : null;

  return (
    <div className="game-review">
      <h4>Let&rsquo;s review your game...</h4>
      <p>
        <Star fill="#fff100" stroke="#ff9b00" />
        <strong>{finalScore}</strong>
      </p>
      <p>
        <Heart fill="#e74c3c" />
        <strong>{finalLives}</strong>
      </p>
      {didLoseLives && (
        <p>
          <strong>These are the sums you didn&rsquo;t get right:</strong>
        </p>
      )}
      {wrongSums}
    </div>
  );
};

export default GameReview;
