import React from 'react';
import Button from '../../UI/atoms/Button/Button';

interface SettingsButtonProps {
  showSettings(): void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ showSettings }) => {
  const modifiers = ['horizontal', 'horizontal-small'];
  return (
    <Button type="button" handler={showSettings} modifiers={modifiers}>
      Change settings
    </Button>
  );
};

export default SettingsButton;
