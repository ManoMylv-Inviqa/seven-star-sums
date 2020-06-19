import React from 'react';
import Button from '../_atoms/Button/Button';
import './Splashscreen.css';
import { AppState } from '../../types/types';

interface SplashscreenProps extends React.HTMLAttributes<HTMLDivElement> {
  startgame(): void;
  resetgame(): void;
  status: AppState['gameStatus'];
}

const Splashscreen: React.FC<SplashscreenProps> = ({ startgame, resetgame, status }) => {
  let splash: JSX.Element = <div />;
  const modifiers = 'horizontal';

  switch (status) {
    case 'startGame':
      splash = (
        <Button type="button" handler={startgame} modifiers={modifiers}>
          Start the sums!
        </Button>
      );
      break;
    case 'endWin':
      splash = (
        <div>
          <h3>Well done! You&rsquo;ve got seven stars!</h3>
          <Button type="button" handler={resetgame} modifiers={modifiers}>
            Play again!
          </Button>
        </div>
      );
      break;
    case 'endLose':
      splash = (
        <div>
          <h3>Unlucky! You&rsquo;ve run out lives...</h3>
          <Button type="button" handler={resetgame} modifiers={modifiers}>
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
