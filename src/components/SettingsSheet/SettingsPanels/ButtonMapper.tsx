import React from 'react';
import Button from '../../../UI/atoms/Button/Button';
import { GenericFunc, OptionsMap, SumState } from '../../../types/types';

// BUTTON STYLING
export const buttonStyles = {
  horiz: ['horizontal'],
  horizGreen: ['horizontal', 'horizontal-green'],
  smallRound: ['round', 'round-small', 'round-white-border']
};

export const makeButtonStyles = (array1: string[]): string[][] => {
  const array2 = [...array1, 'active'];
  const array3 = [...array1, 'inactive'];
  return [array1, array2, array3];
};

// CREATE BUTTON MAPS
export const buttonMap = (
  options: OptionsMap<string | number | SumState['op1'] | SumState['sumType']>,
  stateCheck: string | number,
  panelNum: number,
  clickHandler: GenericFunc<SumState['sumType'] & SumState['op1'] & number>,
  buttonStyle: string[][],
  buttonText: number[] | string[],
  settingStatus: number
): JSX.Element[] =>
  options.map(
    (option: string | number | SumState['op1'] | SumState['sumType'], index: number): JSX.Element => {
      const [butMod, butModAct, butModInact] = buttonStyle;
      let buttonModifiers = butMod;
      if (settingStatus > panelNum && stateCheck) {
        buttonModifiers = option === stateCheck ? butModAct : butModInact;
      }
      return (
        <Button
          key={`panel-${panelNum}-${option}`}
          type="button"
          handler={(): void => clickHandler(option as SumState['sumType'] & SumState['op1'] & number)}
          modifiers={buttonModifiers}
        >
          {buttonText[index]}
        </Button>
      );
    }
  );
