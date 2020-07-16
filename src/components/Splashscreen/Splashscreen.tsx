import React from 'react';
import Button from '../../UI/atoms/Button/Button';
import './Splashscreen.css';
import { useStatus } from '../../context/StatusContext';

const Splashscreen: React.FC = () => {
  let splash: JSX.Element = <div />;
  const modifiers = 'horizontal';
  const { gameStatus, setGameStatus, setShowSplash } = useStatus();

  const startGameHandler = (): void => {
    setGameStatus('startGame');
    setShowSplash(false);
  };

  const resetGameHandler = (): void => {
    setGameStatus('resetGame');
    setShowSplash(false);
  };

  switch (gameStatus) {
    case 'startGame':
      splash = (
        <Button type="button" handler={startGameHandler} modifiers={modifiers}>
          Start the sums!
        </Button>
      );
      break;
    case 'endWin':
      splash = (
        <div>
          <h3>Well done! You&rsquo;ve got seven stars!</h3>
          <Button type="button" handler={resetGameHandler} modifiers={modifiers}>
            Play again!
          </Button>
        </div>
      );
      break;
    case 'endLose':
      splash = (
        <div>
          <h3>Unlucky! You&rsquo;ve run out lives...</h3>
          <Button type="button" handler={resetGameHandler} modifiers={modifiers}>
            Try again!
          </Button>
        </div>
      );
      break;
    default:
      splash = <h3>Please refresh the page.</h3>;
  }

  return (
    <div className="screen">
      <div className="splash">
        <h1>Seven Star Sums</h1>
        {splash}
      </div>
    </div>
  );
};

export default Splashscreen;
