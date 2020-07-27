import React from 'react';
import SettingsButton from './SettingsButton/SettingsButton';
import './Header.css';

const Header: React.FC = () => {
  return (
    <div className="container header-container">
      <h1>SEVEN STAR SUMS</h1>
      <SettingsButton />
    </div>
  );
};

export default Header;
