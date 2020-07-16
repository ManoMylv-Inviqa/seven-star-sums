import React from 'react';
import SettingsButton from './SettingsButton/SettingsButton';
import './Header.css';
import { useStatus } from '../../context/StatusContext';

const Header: React.FC = () => {
  const { gameStatus } = useStatus();
  return (
    <div className="container header-container">
      <h1>SEVEN STAR SUMS</h1>
      {gameStatus !== 'showSettings' && <SettingsButton />}
    </div>
  );
};

export default Header;
