import React, { useState } from 'react';
import Button from '../../../UI/atoms/Button/Button';
import { useStatus } from '../../../context/StatusContext';

const SettingsButton: React.FC = () => {
  const { gameStatus, setGameStatus } = useStatus();

  const [isMidGame, setIsMidGame] = useState(false);

  const showSettingsHandler = (): void => {
    if (gameStatus === 'showSum' || gameStatus === 'confirmAnswer' || gameStatus === 'showResult') {
      setIsMidGame(true);
    }
    setGameStatus('showSettings');
  };

  const cancelSettingsHandler = (): void => {
    setIsMidGame(false);
    setGameStatus('defineSum');
  };

  let setButton = <div />;
  const modifiers = ['horizontal', 'horizontal-small'];

  if (gameStatus !== 'showSettings') {
    setButton = (
      <Button type="button" handler={showSettingsHandler} modifiers={modifiers}>
        Change settings
      </Button>
    );
  }

  if (gameStatus === 'showSettings' && isMidGame) {
    setButton = (
      <Button type="button" handler={cancelSettingsHandler} modifiers={modifiers}>
        Cancel and return to game
      </Button>
    );
  }

  return <>{setButton}</>;
};

export default SettingsButton;
