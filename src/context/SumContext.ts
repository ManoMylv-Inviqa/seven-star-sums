import React from 'react';
import { AppState, SettingsPayload } from '../types/types';

type SumContextProps = {
  num1: AppState['num1'];
  num2: AppState['num2'];
  baseNum: AppState['baseNum'];
  op1: AppState['op1'];
  op2: AppState['op2'];
  rightWrong: AppState['rightWrong'];
  settingsHandler(payload: SettingsPayload): void;
};

const SumContext = React.createContext<Partial<SumContextProps>>({});

export default SumContext;