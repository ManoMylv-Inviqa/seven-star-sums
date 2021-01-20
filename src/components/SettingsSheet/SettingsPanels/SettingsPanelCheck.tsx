import React from 'react';
import { buttonStyles, makeButtonStyles, buttonMap } from './ButtonMapper';
import { GenericFunc } from '../../../types/types';
import SettingsPanel from '../../../UI/atoms/SettingsPanel/SettingsPanel';

interface PanelCheckProps {
  stateChecker: string;
  handler: GenericFunc<string>;
  status: number;
}

const SettingsPanelType: React.FC<PanelCheckProps> = ({ stateChecker, handler, status }) => {
  // BUTTON CONTENT
  const checkOptions = ['true', 'false'];
  const checkText = ['Yes', 'No'];

  // BUTTON MAP
  const checkMap = buttonMap(
    checkOptions,
    stateChecker,
    1,
    handler,
    makeButtonStyles(buttonStyles.horiz),
    checkText,
    status
  );

  // PANEL VISIBILITY OPTIONS
  const panelCheckViz = status > 6 ? 'show' : 'hide';

  return (
    <SettingsPanel
      title="Do you want to check your answers before submitting them?"
      buttonMap={checkMap}
      panelModifiers={panelCheckViz}
      buttonModifiers="lge"
    />
  );
};

export default SettingsPanelType;
