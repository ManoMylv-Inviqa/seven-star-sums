import React from 'react';
import Star from '../../UI/atoms/Icons/Star';
import Heart from '../../UI/atoms/Icons/Heart';
import './Score.css';
import { AppState } from '../../types/types';

interface ScoreProps extends React.HTMLAttributes<HTMLDivElement> {
  displayScore: AppState['score'];
  totalLives: AppState['totalLives'];
  livesLeft: AppState['livesLeft'];
}

const Score: React.FC<ScoreProps> = ({ displayScore, totalLives, livesLeft }) => {
  const stars = [];
  for (let i = 1; i <= 7; i++) {
    stars.push(
      <Star
        key={`star-${i}`}
        fill={i <= displayScore ? '#fff100' : '#ccc'}
        stroke={i <= displayScore ? '#ff9b00' : '#888'}
      />
    );
  }

  const hearts = [];
  for (let j = 1; j <= totalLives; j++) {
    hearts.push(<Heart key={`heart-${j}`} fill={j <= livesLeft ? '#e74c3c' : '#220277'} />);
  }

  return (
    <div className="score-strip">
      <div className="container score-container">
        <div>
          <h4 className="white-text">Your score is:</h4>
        </div>
        <div className="icon-container">{stars}</div>
      </div>
      <div className="container score-container no-top-padding">
        <h4 className="lightest-text">{`You have ${livesLeft} lives left.`}</h4>
        <div className="icon-container">{hearts}</div>
      </div>
    </div>
  );
};

export default Score;
