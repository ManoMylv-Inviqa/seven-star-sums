import React from 'react';
import SettingsButton from '../SettingsButton/SettingsButton';
import './Header.css';
import { AppState } from '../../types/types';

interface HeaderProps {
  gameStatus: AppState['gameStatus'];
  showSettings(): void;
}

const Header: React.FC<HeaderProps> = ({ gameStatus, showSettings }) => {
  return (
    <div className="container header-container">
      <h1>SEVEN STAR SUMS</h1>
      {gameStatus !== 'showSettings' && <SettingsButton showSettings={showSettings} />}
    </div>
  );
};

export default Header;
