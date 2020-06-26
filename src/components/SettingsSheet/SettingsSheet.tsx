import React, { useState } from 'react';
import Button from '../../UI/atoms/Button/Button';
import './SettingsSheet.css';
import { SettingsPayload, GenericFunc } from '../../types/types';

interface SettingsSheetProps {
  handleSettings(payload: SettingsPayload): void;
}

const SettingsSheet: React.FC<SettingsSheetProps> = ({ handleSettings }) => {
  const [settingStatus, setSettingStatus] = useState(1);
  const [operator, setOperator] = useState('+' as SettingsPayload['operator']);
  const [baseNum, setBaseNum] = useState(2);
  const [difficulty, setDifficulty] = useState(7);

  // PANEL HANDLERS START
  const panel1Handler = (chosenOperator: SettingsPayload['operator']): void => {
    setSettingStatus(2);
    setOperator(chosenOperator);
  };

  const panel2Handler = (chosenBaseNum: number): void => {
    setSettingStatus(3);
    setBaseNum(chosenBaseNum);
  };

  const panel3Handler = (lives: number): void => {
    setSettingStatus(4);
    setDifficulty(lives);
  };

  // PANEL VISIBILITY OPTIONS
  const panel2viz = settingStatus > 1 ? 'show' : 'hide';
  const panel3viz = settingStatus > 2 ? 'show' : 'hide';
  const panel4viz = settingStatus > 3 ? 'show' : 'hide';

  // RENDERING LOGIC
  const pairs = operator === '+';

  // BUTTON STYLING
  const horizButtons = ['horizontal'];
  // const horizButtonsActive = ['horizontal', 'green-border'];
  const horizGreenButtons = ['horizontal', 'horizontal-green'];
  const smallRoundButtons = ['round', 'round-small', 'round-white-border'];
  // const smallRoundButtonsActive = ['round', 'round-small', 'round-white-border', 'green-border'];

  const makeButtonStyles = (array1: string[]): string[][] => {
    const array2 = [...array1];
    array2.push('green-border');
    return [array1, array2];
  };

  // BUTTON CONTENT
  const operatorOptions = ['+', 'x'];
  const operatorText = ['Number pairs', 'Times tables'];
  const tableOptions = [2, 3, 4, 5, 8, 10];
  const pairOptions = [10, 20];
  const difficultyOptions = [7, 5, 3];
  const difficultyText = ['Medium: 7', 'Hard: 5', ' Very hard: 3'];

  // CREATE BUTTON MAPS
  const buttonMap = (
    options: any[],
    stateCheck: string | number,
    panelNum: number,
    clickHandler: GenericFunc,
    buttonStyle: string[][],
    buttonText: number[] | string[]
  ): JSX.Element[] =>
    options.map(
      (option, index): JSX.Element => {
        const [butMod, butModAct] = buttonStyle;
        let buttonModifiers = butMod;
        if (option === stateCheck && settingStatus > panelNum) {
          buttonModifiers = butModAct;
        }
        return (
          <Button
            key={`panel-${panelNum}-${option}`}
            type="button"
            handler={() => clickHandler(option)}
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
  const pairMap = buttonMap(pairOptions, baseNum, 2, panel2Handler, makeButtonStyles(smallRoundButtons), pairOptions);
  const tableMap = buttonMap(
    tableOptions,
    baseNum,
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

  return (
    <div className="sheet--settings">
      <div className="settings__panel settings__panel--1">
        <h3>What type of sums do you want to play today?</h3>
        <div className="settings__button-container">{operatorMap}</div>
      </div>
      <div className={`settings__panel settings__panel--2 settings__panel--${panel2viz}`}>
        {!!pairs && (
          <>
            <h3>Choose your number pair:</h3>
            <div className="settings__button-container settings__button-container--small">{pairMap}</div>
          </>
        )}
        {!pairs && (
          <>
            <h3>Choose your times tables:</h3>
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
          handler={(): void => handleSettings({ baseNum, operator, difficulty })}
          modifiers={horizGreenButtons}
        >
          Start the sums!
        </Button>
      </div>
    </div>
  );
};

export default SettingsSheet;
