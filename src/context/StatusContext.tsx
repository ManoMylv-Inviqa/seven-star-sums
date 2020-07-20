import React, { useState, useMemo, useContext } from 'react';
import { GameStates, Props, StatusState } from '../types/types';

const StatusContext = React.createContext<Partial<StatusState>>({ gameStatus: 'showSettings' });
const { Provider } = StatusContext;

const StatusProvider = ({ children }: Props): JSX.Element => {
  const [gameStatus, setGameStatus] = useState('startGame' as GameStates);
  const [showSplash, setShowSplash] = useState(true);
  const [isLocalSettings, setIsLocalSettings] = useState(false);

  const statusState = useMemo(
    () => ({ gameStatus, showSplash, isLocalSettings, setGameStatus, setShowSplash, setIsLocalSettings }),
    [gameStatus, showSplash, isLocalSettings]
  );

  return <Provider value={statusState}>{children}</Provider>;
};

const useStatus = (): StatusState => {
  const { gameStatus, showSplash, isLocalSettings, setGameStatus, setShowSplash, setIsLocalSettings } = useContext(
    StatusContext
  );

  if (
    gameStatus === undefined ||
    showSplash === undefined ||
    isLocalSettings === undefined ||
    setGameStatus === undefined ||
    setShowSplash === undefined ||
    setIsLocalSettings === undefined
  ) {
    throw new Error('useStatus must be used within a StatusProvider');
  }

  return { gameStatus, showSplash, isLocalSettings, setGameStatus, setShowSplash, setIsLocalSettings };
};

export { StatusProvider, useStatus };
