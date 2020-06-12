import React from 'react';
import Star from '../Icons/Star';
import Heart from '../Icons/Heart';
import './Score.css';

interface ScoreProps {
    displayScore: number;
    totalLives: number;
    livesLeft: number;
}

const Score: React.FC<ScoreProps> = ({displayScore, totalLives, livesLeft}) => {
    let stars = [];
    for (let i=1; i <= 7; i++) {
        stars.push(<Star
            key={`star-${i}`}
            fill={i <= displayScore ? '#fff100' : '#ccc'}
            stroke={i <= displayScore ? '#ff9b00' : '#888'}
            />)
    }

    let hearts = [];
    for (let j=1; j <= totalLives; j++) {
        hearts.push(<Heart
            key={`heart-${j}`}
            fill={j <= livesLeft ? '#e74c3c' : '#220277'}
            />)
    }

    return (
        <div className='score-strip'>
            <div className='container score-container'>
                <div><h4 className='white-text'>Your score is:</h4></div>
                <div>{stars}</div>
            </div>
            <div className='container score-container no-top-padding'>
                <h4 className='lightest-text'>You have {livesLeft} lives left.</h4>
                <div>{hearts}</div>
            </div>
        </div>
    )
}

export default Score;