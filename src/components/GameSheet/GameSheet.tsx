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
  const { baseNum, op1, possibleNums, setNum1, setNum2, setPossibleNums, setRightWrong } = useSum();
  const { setPossibleAns, setCorrectAns } = useAnswer();
  const { totalLives, setLivesLeft, setScore } = useScore();

  const resetGameStatus = gameStatus === 'resetGame';
  const defineNumsStatus = gameStatus === 'defineNums';
  const defineSumStatus = gameStatus === 'defineSum';

  useEffect(() => {
    if (resetGameStatus) {
      setPossibleNums([]);
      setRightWrong(null);
      setScore(0);
      setLivesLeft(totalLives);
      setGameStatus('defineNums');
    }
  }, [resetGameStatus, setPossibleNums, setRightWrong, setScore, setLivesLeft, totalLives, setGameStatus]);

  useEffect(() => {
    if (defineNumsStatus) {
      const newNums = definePossibleNums(baseNum, op1);
      setPossibleNums([...possibleNums].concat(newNums));
      setGameStatus('defineSum');
    }
  }, [defineNumsStatus, setGameStatus, baseNum, op1, possibleNums, setPossibleNums]);

  useEffect(() => {
    if (defineSumStatus) {
      const newSum = defineSum(possibleNums, baseNum, op1);
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
