import React from 'react';
import { buttonStyles, makeButtonStyles, buttonMap } from './ButtonMapper';
import { GenericFunc } from '../../../types/types';
import SettingsPanel from '../../../UI/atoms/SettingsPanel/SettingsPanel';

interface PanelLivesProps {
  stateChecker: number;
  handler: GenericFunc<number>;
  status: number;
  isResetOperator: boolean;
}

const SettingsPanelLives: React.FC<PanelLivesProps> = ({ stateChecker, handler, status, isResetOperator }) => {
  // BUTTON CONTENT
  const difficultyOptions = [7, 5, 3];
  const difficultyText = ['Medium: 7', 'Hard: 5', ' Very hard: 3'];

  // BUTTON MAP
  const difficultyMap = buttonMap(
    difficultyOptions,
    stateChecker,
    4,
    handler,
    makeButtonStyles(buttonStyles.horiz),
    difficultyText,
    status
  );

  // PANEL VISIBILITY OPTIONS
  const panelLivesViz = status > 3 || isResetOperator ? 'show' : 'hide';

  return (
    <SettingsPanel
      title="How many lives do you want to have?"
      buttonMap={difficultyMap}
      panelModifiers={panelLivesViz}
      buttonModifiers="med"
    />
  );
};

export default SettingsPanelLives;
