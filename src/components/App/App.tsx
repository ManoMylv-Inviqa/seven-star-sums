import React from 'react';
import './App.css';
import Header from '../Header/Header';
import GameSheet from '../GameSheet/GameSheet';
import SettingsSheet from '../SettingsSheet/SettingsSheet';
import Splashscreen from '../Splashscreen/Splashscreen';
import { useStatus } from '../../context/StatusContext';
import { SumProvider } from '../../context/SumContext';
import { ScoreProvider } from '../../context/ScoreContext';
import { AnswerProvider } from '../../context/AnswerContext';

const App: React.FC = () => {
  const { gameStatus, showSplash } = useStatus();

  return (
    <div className="App">
      {showSplash && <Splashscreen />}
      <Header />
      <SumProvider>
        <div className="stage">
          <ScoreProvider>
            {gameStatus === 'showSettings' ? (
              <SettingsSheet />
            ) : (
              <AnswerProvider>
                <GameSheet />
              </AnswerProvider>
            )}
          </ScoreProvider>
        </div>
      </SumProvider>
    </div>
  );
};

export default App;
