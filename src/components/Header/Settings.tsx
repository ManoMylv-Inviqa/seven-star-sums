import React from 'react';
import Button from '../_atoms/Button/Button';
import './Header.css';

const Settings: React.FC = () => {
  const modifiers = ['horizontal', 'horizontal-small'];
  return (
    <Button
      type="button"
      handler={(): void => {
        alert('Settings');
      }}
      modifiers={modifiers}
    >
      Settings
    </Button>
  );
};

export default Settings;
