import React from 'react';
import { buttonStyles, makeButtonStyles, buttonMap } from './ButtonMapper';
import { GenericFunc, SumState } from '../../../types/types';
import SettingsPanel from '../../../UI/atoms/SettingsPanel/SettingsPanel';

interface PanelOpProps {
  stateChecker: SumState['op1'];
  handler: GenericFunc<SumState['op1']>;
  status: number;
  isBonds: boolean;
}

const SettingsPanelOp: React.FC<PanelOpProps> = ({ stateChecker, handler, status, isBonds }) => {
  // BUTTON CONTENT
  const bondOperatorOptions = ['+', '-'];
  const bondOperatorOptionsText = ['Adding (+)', 'Taking away (-)'];
  const tableOperatorOptions = ['x', '÷'];
  const tableOperatorOptionsText = ['Multiplication (x)', 'Division (÷)'];

  // BUTTON MAP
  const bondOperatorMap = buttonMap(
    bondOperatorOptions,
    stateChecker,
    2,
    handler,
    makeButtonStyles(buttonStyles.horiz),
    bondOperatorOptionsText,
    status
  );
  const tableOperatorMap = buttonMap(
    tableOperatorOptions,
    stateChecker,
    2,
    handler,
    makeButtonStyles(buttonStyles.horiz),
    tableOperatorOptionsText,
    status
  );

  const panelId = isBonds ? 'bonds' : 'table';
  const panelButtons = isBonds ? bondOperatorMap : tableOperatorMap;
  const title = isBonds ? 'Do you want to do adding or taking away?' : 'Do you want to do multiplication or division?';

  // PANEL VISIBILITY OPTIONS
  const panelOpViz = status > 1 ? 'show' : 'hide';

  return (
    <SettingsPanel
      id={panelId}
      title={title}
      buttonMap={panelButtons}
      panelModifiers={panelOpViz}
      buttonModifiers="lge"
    />
  );
};

export default SettingsPanelOp;
