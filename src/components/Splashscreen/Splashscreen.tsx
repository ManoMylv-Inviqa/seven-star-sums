import React from 'react';
import Button from '../../UI/atoms/Button/Button';
import './Splashscreen.css';
import { useStatus } from '../../context/StatusContext';
import { useSum } from '../../context/SumContext';
import { useScore } from '../../context/ScoreContext';
import { getLocalSettings } from '../../helpers/helpers';

const Splashscreen: React.FC = () => {
  let splash: JSX.Element = <div />;
  const modifiers = 'horizontal';
  const { gameStatus, setGameStatus, setShowSplash } = useStatus();
  const { setBaseNum, setOp1 } = useSum();
  const { setTotalLives, setLivesLeft } = useScore();

  const localSettings = getLocalSettings();

  const startSettingsHandler = (): void => {
    setGameStatus('showSettings');
    setShowSplash(false);
  };

  const startGameHandler = (): void => {
    if (localSettings) {
      setBaseNum(localSettings.finalBaseNum);
      setOp1(localSettings.finalOperator);
      setTotalLives(localSettings.finalDifficulty);
      setLivesLeft(localSettings.finalDifficulty);
      setGameStatus('defineNums');
      setShowSplash(false);
      return;
    }
    startSettingsHandler(); // Should never need this, but is a failsafe
  };

  const resetGameHandler = (): void => {
    setGameStatus('resetGame');
    setShowSplash(false);
  };

  switch (gameStatus) {
    case 'startGame':
      splash = (
        <>
          <h3>Hello!</h3>
          <h4>Do you want to...</h4>
          <Button type="button" handler={startGameHandler} modifiers={modifiers}>
            Use your previous settings?
          </Button>
          <h4>Or...</h4>
          <Button type="button" handler={startSettingsHandler} modifiers={modifiers}>
            Choose a new type of sum?
          </Button>
        </>
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
