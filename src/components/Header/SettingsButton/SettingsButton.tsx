import React from 'react';
import Button from '../../../UI/atoms/Button/Button';
import { useStatus } from '../../../context/StatusContext';

const SettingsButton: React.FC = () => {
  const { setGameStatus } = useStatus();

  const showSettingsHandler = (): void => {
    setGameStatus('showSettings');
  };

  const modifiers = ['horizontal', 'horizontal-small'];

  return (
    <Button type="button" handler={showSettingsHandler} modifiers={modifiers}>
      Change settings
    </Button>
  );
};

export default SettingsButton;
