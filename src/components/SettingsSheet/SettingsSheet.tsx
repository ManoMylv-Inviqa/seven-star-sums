import React, { useState, useEffect } from 'react';
import SettingsPanelType from './SettingsPanels/SettingsPanelType';
import SettingsPanelOp from './SettingsPanels/SettingsPanelOp';
import SettingsPanelBase from './SettingsPanels/SettingsPanelBase';
import SettingsPanelLives from './SettingsPanels/SettingsPanelLives';
import SettingsPanelCheck from './SettingsPanels/SettingsPanelCheck';
import SettingsPanelHard from './SettingsPanels/SettingsPanelHard';
import { buttonStyles } from './SettingsPanels/ButtonMapper';
import Button from '../../UI/atoms/Button/Button';
import './SettingsSheet.css';
import { GenericFunc, SumState } from '../../types/types';
import { useStatus } from '../../context/StatusContext';
import { useSum } from '../../context/SumContext';
import { useScore } from '../../context/ScoreContext';
import { getLocalSettings } from '../../helpers/helpers';

type LocalOperator = SumState['op1'] & '';

const SettingsSheet: React.FC = () => {
  // APP STATE FROM CONTEXT
  const { isLocalSettings, setGameStatus } = useStatus();
  const { setSumType, setBaseNum, setOp1, setAnswerCheck, setIsHard } = useSum();
  const { setTotalLives } = useScore();
  // LOCAL STATE IN COMPONENT
  const [settingStatus, setSettingStatus] = useState(1);
  const [panelSumType, setPanelSumType] = useState('bonds' as SumState['sumType']);
  const [operator, setOperator] = useState('+' as LocalOperator);
  const [panelBaseNum, setPanelBaseNum] = useState(2);
  const [difficulty, setDifficulty] = useState(0);
  const [checkAns, setCheckAns] = useState(true);
  const [hardSums, setHardSums] = useState(false);
  const [isResetType, setIsResetType] = useState(false);
  const [isResetOperator, setIsResetOperator] = useState(false);
  const localSettings = getLocalSettings();

  // IF SETTINGS HAVE ALREADY BEEN SET THEN SHOW ALL OPTIONS FROM START
  useEffect(() => {
    if (isLocalSettings && localSettings) {
      setSettingStatus(4);
      if (localSettings.finalOperator) {
        setOperator(localSettings.finalOperator as LocalOperator);
      }
      if (localSettings.finalBaseNum) {
        setPanelBaseNum(localSettings.finalBaseNum);
      }
      if (localSettings.finalDifficulty) {
        setDifficulty(localSettings.finalDifficulty);
      }
      if (localSettings.finalSumType) {
        setPanelSumType(localSettings.finalSumType);
      }
      if (localSettings.finalAnswerCheck) {
        setCheckAns(localSettings.finalAnswerCheck);
      }
      if (localSettings.finalIsHard) {
        setHardSums(localSettings.finalIsHard);
      }
    }
    // eslint-disable-next-line
  }, []);

  // PANEL HANDLERS
  const panelTypeHandler: GenericFunc<SumState['sumType']> = (chosenType) => {
    if (isLocalSettings) {
      setPanelBaseNum(0);
      setOperator('' as LocalOperator);
      setIsResetType(true);
      setIsResetOperator(false);
      setSettingStatus(4);
      setPanelSumType(chosenType as SumState['sumType']);
      return;
    }
    setSettingStatus(2);
    setPanelSumType(chosenType as SumState['sumType']);
  };

  const panelOpHandler: GenericFunc<SumState['op1']> = (chosenOperator) => {
    if (!isLocalSettings) {
      setSettingStatus(3);
    }
    if (isResetType) {
      setIsResetOperator(true);
      setSettingStatus(4);
    }
    if (isResetType && panelBaseNum > 0) {
      setSettingStatus(5);
    }
    setOperator(chosenOperator as LocalOperator);
  };

  const panelNumHandler: GenericFunc<number> = (chosenBaseNum) => {
    if (!isLocalSettings) {
      setSettingStatus(4);
    }
    if (isResetOperator) {
      setSettingStatus(5);
    }
    setPanelBaseNum(chosenBaseNum);
  };

  const panelLivesHandler: GenericFunc<number> = (lives) => {
    setSettingStatus(7);
    setDifficulty(lives);
  };

  const panelCheckHandler: GenericFunc<string> = (check) => {
    const nextPanel = panelSumType === 'tables' ? 8 : 9;
    setSettingStatus(nextPanel);
    const checkBool = check === 'true';
    setCheckAns(checkBool);
  };

  const panelHardHandler: GenericFunc<string> = (isHard) => {
    setSettingStatus(9);
    const isHardBool = isHard === 'true';
    setHardSums(isHardBool);
  };

  const finalSettings = (
    finalSumType: SumState['sumType'],
    finalBaseNum: number,
    finalOperator: SumState['op1'],
    finalDifficulty: number,
    finalAnsCheck: string,
    finalHardSums: string
  ): void => {
    const finalAnswerCheck = finalAnsCheck === 'true';
    const finalIsHard = finalHardSums === 'true';
    setSumType(finalSumType);
    setBaseNum(finalBaseNum);
    setOp1(finalOperator);
    setTotalLives(finalDifficulty);
    setAnswerCheck(finalAnswerCheck);
    setIsHard(finalIsHard);
    setGameStatus('resetGame');
    const allSettings = {
      finalSumType,
      finalBaseNum,
      finalOperator,
      finalDifficulty,
      finalAnswerCheck,
      finalIsHard
    };
    window.localStorage.setItem('sevenStarSettings', JSON.stringify(allSettings));
  };

  // PANEL VISIBILITY OPTIONS
  const nextButtonViz = (settingStatus > 3 && !isResetType && !isResetOperator) || settingStatus > 4 ? 'show' : 'hide';
  const finalButtonViz = settingStatus > 8 ? 'show' : 'hide';

  // RENDERING LOGIC
  const bonds = panelSumType === 'bonds';

  return (
    <div className="settings__sheet">
      {settingStatus < 6 ? (
        <>
          <SettingsPanelType stateChecker={panelSumType} handler={panelTypeHandler} status={settingStatus} />
          <SettingsPanelOp stateChecker={operator} handler={panelOpHandler} status={settingStatus} isBonds={bonds} />
          <SettingsPanelBase
            stateChecker={panelBaseNum}
            handler={panelNumHandler}
            status={settingStatus}
            isBonds={bonds}
          />
          <div className={`settings__panel settings__panel--${nextButtonViz}`}>
            <div className="settings__button-container settings__button-container--last settings__button-container--lge">
              <Button type="button" handler={(): void => setSettingStatus(6)} modifiers={buttonStyles.horizGreen}>
                Next &gt;
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <SettingsPanelLives
            stateChecker={difficulty}
            handler={panelLivesHandler}
            status={settingStatus}
            isResetOperator={isResetOperator}
          />
          <SettingsPanelCheck stateChecker={checkAns.toString()} handler={panelCheckHandler} status={settingStatus} />
          {panelSumType === 'tables' && (
            <SettingsPanelHard stateChecker={hardSums.toString()} handler={panelHardHandler} status={settingStatus} />
          )}
          <div className={`settings__panel settings__panel--${finalButtonViz}`}>
            <div className="settings__button-container settings__button-container--last settings__button-container--lge">
              <Button
                type="button"
                handler={(): void => {
                  finalSettings(
                    panelSumType,
                    panelBaseNum,
                    operator,
                    difficulty,
                    checkAns.toString(),
                    hardSums.toString()
                  );
                }}
                modifiers={buttonStyles.horizGreen}
              >
                Start the sums!
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsSheet;
