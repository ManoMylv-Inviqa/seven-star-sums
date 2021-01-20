import React from 'react';
import { buttonStyles, makeButtonStyles, buttonMap } from './ButtonMapper';
import { GenericFunc } from '../../../types/types';
import SettingsPanel from '../../../UI/atoms/SettingsPanel/SettingsPanel';

interface PanelHardProps {
  stateChecker: string;
  handler: GenericFunc<string>;
  status: number;
}

const SettingsPanelType: React.FC<PanelHardProps> = ({ stateChecker, handler, status }) => {
  // BUTTON CONTENT
  const hardOptions = ['true', 'false'];
  const hardText = ['Yes', 'No'];

  // BUTTON MAP
  const hardMap = buttonMap(
    hardOptions,
    stateChecker,
    1,
    handler,
    makeButtonStyles(buttonStyles.horiz),
    hardText,
    status
  );

  // PANEL VISIBILITY OPTIONS
  const panelHardViz = status > 7 ? 'show' : 'hide';

  return (
    <SettingsPanel
      title="Do you only want hard sums?"
      buttonMap={hardMap}
      panelModifiers={panelHardViz}
      buttonModifiers="lge"
    />
  );
};

export default SettingsPanelType;
