import React from 'react';
import { buttonStyles, makeButtonStyles, buttonMap } from './ButtonMapper';
import { GenericFunc } from '../../../types/types';
import SettingsPanel from '../../../UI/atoms/SettingsPanel/SettingsPanel';

interface PanelBaseProps {
  stateChecker: number;
  handler: GenericFunc<number>;
  status: number;
  isBonds: boolean;
}

const SettingsPanelBase: React.FC<PanelBaseProps> = ({ stateChecker, handler, status, isBonds }) => {
  // BUTTON CONTENT
  const tableOptions = [2, 3, 4, 5, 8, 10];
  const bondOptions = [10, 20];

  // BUTTON MAP
  const bondMap = buttonMap(
    bondOptions,
    stateChecker,
    3,
    handler,
    makeButtonStyles(buttonStyles.smallRound),
    bondOptions,
    status
  );
  const tableMap = buttonMap(
    tableOptions,
    stateChecker,
    3,
    handler,
    makeButtonStyles(buttonStyles.smallRound),
    tableOptions,
    status
  );

  const panelButtons = isBonds ? bondMap : tableMap;
  const panelId = isBonds ? 'bonds' : 'table';
  const title = isBonds ? 'Choose your bond number' : 'Choose your times table';
  const buttonMods = isBonds ? 'sml' : undefined;

  // PANEL VISIBILITY OPTIONS
  const panelBaseViz = status > 2 ? 'show' : 'hide';

  return (
    <SettingsPanel
      id={panelId}
      title={title}
      buttonMap={panelButtons}
      panelModifiers={panelBaseViz}
      buttonModifiers={buttonMods}
    />
  );
};

export default SettingsPanelBase;
