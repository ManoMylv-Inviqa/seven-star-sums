import React, { useState, useMemo, useContext } from 'react';
import { GameStates, Props, StatusState } from '../types/types';

const StatusContext = React.createContext<Partial<StatusState>>({ gameStatus: 'showSettings' });
const { Provider } = StatusContext;

const StatusProvider = ({ children }: Props): JSX.Element => {
  const [gameStatus, setGameStatus] = useState('showSettings' as GameStates);
  const [showSplash, setShowSplash] = useState(false);

  const statusState = useMemo(() => ({ gameStatus, showSplash, setGameStatus, setShowSplash }), [
    gameStatus,
    showSplash
  ]);

  return <Provider value={statusState}>{children}</Provider>;
};

const useStatus = (): StatusState => {
  const { gameStatus, showSplash, setGameStatus, setShowSplash } = useContext(StatusContext);

  if (
    gameStatus === undefined ||
    showSplash === undefined ||
    setGameStatus === undefined ||
    setShowSplash === undefined
  ) {
    throw new Error('useStatus must be used within a StatusProvider');
  }

  return { gameStatus, showSplash, setGameStatus, setShowSplash };
};

export { StatusProvider, useStatus };
