import React from 'react';
import { buttonStyles, makeButtonStyles, buttonMap } from './ButtonMapper';
import { GenericFunc, SumState } from '../../../types/types';
import SettingsPanel from '../../../UI/atoms/SettingsPanel/SettingsPanel';

interface PanelTypeProps {
  stateChecker: SumState['sumType'];
  handler: GenericFunc<SumState['sumType']>;
  status: number;
}

const SettingsPanelType: React.FC<PanelTypeProps> = ({ stateChecker, handler, status }) => {
  // BUTTON CONTENT
  const typeOptions = ['bonds', 'tables'];
  const typeText = ['Number bonds', 'Times tables'];

  // BUTTON MAP
  const typeMap = buttonMap(
    typeOptions,
    stateChecker,
    1,
    handler,
    makeButtonStyles(buttonStyles.horiz),
    typeText,
    status
  );

  return (
    <SettingsPanel title="What type of sums do you want to play today?" buttonMap={typeMap} buttonModifiers="lge" />
  );
};

export default SettingsPanelType;
