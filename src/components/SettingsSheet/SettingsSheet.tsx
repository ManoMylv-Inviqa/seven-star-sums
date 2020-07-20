import React, { useState, useEffect } from 'react';
import Button from '../../UI/atoms/Button/Button';
import './SettingsSheet.css';
import { GenericFunc, OptionsMap, SumState } from '../../types/types';
import { useStatus } from '../../context/StatusContext';
import { useSum } from '../../context/SumContext';
import { useScore } from '../../context/ScoreContext';
import { getLocalSettings } from '../../helpers/helpers';

const SettingsSheet: React.FC = () => {
  const { isLocalSettings, setGameStatus } = useStatus();
  const { setBaseNum, setOp1 } = useSum();
  const { setTotalLives } = useScore();
  const [settingStatus, setSettingStatus] = useState(1);
  const [operator, setOperator] = useState('+' as SumState['op1']);
  const [panelBaseNum, setPanelBaseNum] = useState(2);
  const [difficulty, setDifficulty] = useState(7);
  const [isResetOperator, setIsResetOperator] = useState(false);
  const localSettings = getLocalSettings();

  // IF SETTINGS HAVE ALREADY BEEN SET THEN SHOW ALL OPTIONS FROM START
  useEffect(() => {
    if (isLocalSettings && localSettings) {
      setSettingStatus(4);
      setOperator(localSettings.finalOperator);
      setPanelBaseNum(localSettings.finalBaseNum);
      setDifficulty(localSettings.finalDifficulty);
    }
    // eslint-disable-next-line
  }, []);

  // PANEL HANDLERS START
  const panel1Handler: GenericFunc<SumState['op1']> = (chosenOperator) => {
    if (isLocalSettings) {
      setPanelBaseNum(0);
      setIsResetOperator(true);
      setSettingStatus(4);
      setOperator(chosenOperator as SumState['op1']);
      return;
    }
    setSettingStatus(2);
    setOperator(chosenOperator as SumState['op1']);
  };

  const panel2Handler: GenericFunc<number> = (chosenBaseNum) => {
    if (!isLocalSettings) {
      setSettingStatus(3);
    }
    if (isResetOperator) {
      setSettingStatus(5);
    }
    setPanelBaseNum(chosenBaseNum);
  };

  const panel3Handler: GenericFunc<number> = (lives) => {
    setSettingStatus(4);
    if (isResetOperator) {
      setSettingStatus(5);
    }
    setDifficulty(lives);
  };

  // PANEL VISIBILITY OPTIONS
  const panel2viz = settingStatus > 1 ? 'show' : 'hide';
  const panel3viz = settingStatus > 2 || isResetOperator ? 'show' : 'hide';
  const panel4viz = (settingStatus > 3 && !isResetOperator) || settingStatus > 4 ? 'show' : 'hide';

  // RENDERING LOGIC
  const bonds = operator === '+';

  // BUTTON STYLING
  const horizButtons = ['horizontal'];
  const horizGreenButtons = ['horizontal', 'horizontal-green'];
  const smallRoundButtons = ['round', 'round-small', 'round-white-border'];

  const makeButtonStyles = (array1: string[]): string[][] => {
    const array2 = [...array1];
    array2.push('active');
    const array3 = [...array1];
    array3.push('inactive');
    return [array1, array2, array3];
  };

  // BUTTON CONTENT
  const operatorOptions = ['+', 'x'];
  const operatorText = ['Number bonds', 'Times tables'];
  const tableOptions = [2, 3, 4, 5, 8, 10];
  const pairOptions = [10, 20];
  const difficultyOptions = [7, 5, 3];
  const difficultyText = ['Medium: 7', 'Hard: 5', ' Very hard: 3'];

  // CREATE BUTTON MAPS
  const buttonMap = (
    options: OptionsMap<string | number | SumState['op1']>,
    stateCheck: string | number,
    panelNum: number,
    clickHandler: GenericFunc<SumState['op1'] & number>,
    buttonStyle: string[][],
    buttonText: number[] | string[]
  ): JSX.Element[] =>
    options.map(
      (option: string | number | SumState['op1'], index: number): JSX.Element => {
        const [butMod, butModAct, butModInact] = buttonStyle;
        let buttonModifiers = butMod;
        if (settingStatus > panelNum && stateCheck) {
          buttonModifiers = option === stateCheck ? butModAct : butModInact;
        }
        return (
          <Button
            key={`panel-${panelNum}-${option}`}
            type="button"
            handler={(): void => clickHandler(option as SumState['op1'] & number)}
            modifiers={buttonModifiers}
          >
            {buttonText[index]}
          </Button>
        );
      }
    );

  const operatorMap = buttonMap(
    operatorOptions,
    operator,
    1,
    panel1Handler,
    makeButtonStyles(horizButtons),
    operatorText
  );
  const pairMap = buttonMap(
    pairOptions,
    panelBaseNum,
    2,
    panel2Handler,
    makeButtonStyles(smallRoundButtons),
    pairOptions
  );
  const tableMap = buttonMap(
    tableOptions,
    panelBaseNum,
    2,
    panel2Handler,
    makeButtonStyles(smallRoundButtons),
    tableOptions
  );
  const difficultyMap = buttonMap(
    difficultyOptions,
    difficulty,
    3,
    panel3Handler,
    makeButtonStyles(horizButtons),
    difficultyText
  );

  const finalSettings = (finalBaseNum: number, finalOperator: SumState['op1'], finalDifficulty: number): void => {
    setBaseNum(finalBaseNum);
    setOp1(finalOperator);
    setTotalLives(finalDifficulty);
    setGameStatus('resetGame');
    const allSettings = { finalBaseNum, finalOperator, finalDifficulty };
    window.localStorage.setItem('sevenStarSettings', JSON.stringify(allSettings));
  };

  return (
    <div className="settings__sheet">
      <div className="settings__panel settings__panel--1">
        <h3>What type of sums do you want to play today?</h3>
        <div className="settings__button-container">{operatorMap}</div>
      </div>
      <div className={`settings__panel settings__panel--2 settings__panel--${panel2viz}`}>
        {bonds ? (
          <>
            <h3>Choose your bond number:</h3>
            <div className="settings__button-container settings__button-container--small">{pairMap}</div>
          </>
        ) : (
          <>
            <h3>Choose your times table:</h3>
            <div className="settings__button-container">{tableMap}</div>
          </>
        )}
      </div>
      <div className={`settings__panel settings__panel--3 settings__panel--${panel3viz}`}>
        <h3>How many lives do you want to have?</h3>
        <div className="settings__button-container">{difficultyMap}</div>
      </div>
      <div className={`settings__panel settings__panel--2 settings__panel--${panel4viz}`}>
        <Button
          type="button"
          handler={(): void => finalSettings(panelBaseNum, operator, difficulty)}
          modifiers={horizGreenButtons}
        >
          Start the sums!
        </Button>
      </div>
    </div>
  );
};

export default SettingsSheet;
