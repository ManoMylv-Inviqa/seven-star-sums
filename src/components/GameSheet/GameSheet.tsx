import React, { useEffect } from 'react';
import Sum from './Sum/Sum';
import Answers from './Answers/Answers';
import Check from './Check/Check';
import Result from './Result/Result';
import Score from './Score/Score';
import './GameSheet.css';
import { useStatus } from '../../context/StatusContext';
import { useSum } from '../../context/SumContext';
import { useAnswer } from '../../context/AnswerContext';
import { useScore } from '../../context/ScoreContext';
import { definePossibleNums, defineSum } from '../../helpers/helpers';

const GameSheet: React.FC = () => {
  const { gameStatus, setGameStatus } = useStatus();
  const { sumType, baseNum, op1, possibleNums, isHard, setNum1, setNum2, setPossibleNums, setRightWrong } = useSum();
  const { setPossibleAns, setCorrectAns } = useAnswer();
  const { totalLives, setLivesLeft, setScore, setWrongAnswers } = useScore();

  const resetGameStatus = gameStatus === 'resetGame';
  const defineNumsStatus = gameStatus === 'defineNums';
  const defineSumStatus = gameStatus === 'defineSum';

  useEffect(() => {
    if (resetGameStatus) {
      setPossibleNums([]);
      setRightWrong(null);
      setScore(0);
      setLivesLeft(totalLives);
      setWrongAnswers([]);
      setGameStatus('defineNums');
    }
  }, [
    resetGameStatus,
    setPossibleNums,
    setRightWrong,
    setScore,
    setLivesLeft,
    totalLives,
    setWrongAnswers,
    setGameStatus
  ]);

  useEffect(() => {
    if (defineNumsStatus) {
      const newNums = definePossibleNums(baseNum, sumType, isHard);
      setPossibleNums([...possibleNums].concat(newNums));
      setGameStatus('defineSum');
    }
  }, [defineNumsStatus, setGameStatus, baseNum, sumType, possibleNums, isHard, setPossibleNums]);

  useEffect(() => {
    if (defineSumStatus) {
      const newSum = defineSum(sumType, possibleNums, baseNum, op1);
      setNum1(newSum.randomNum);
      setNum2('?');
      setPossibleNums([...possibleNums].filter((val) => val !== newSum.randomNum));
      setPossibleAns(newSum.possibleAns);
      setCorrectAns(newSum.answer1);
      setGameStatus('showSum');
    }
  }, [
    defineSumStatus,
    setGameStatus,
    sumType,
    baseNum,
    op1,
    possibleNums,
    setCorrectAns,
    setNum1,
    setNum2,
    setPossibleAns,
    setPossibleNums
  ]);

  return (
    <div className="game__sheet">
      <Sum />
      <div className="answer-strip">
        <Answers />
        <Check />
        <Result />
      </div>
      <Score />
    </div>
  );
};

export default GameSheet;
