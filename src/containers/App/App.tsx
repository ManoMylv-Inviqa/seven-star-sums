import React, { Component } from 'react';
import './App.css';
import Header from '../../components/Header/Header';
import Sum from '../../components/Sum/Sum';
import Answers from '../../components/Answers/Answers';
import Check from '../../components/Check/Check';
import Result from '../../components/Result/Result';
import Score from '../../components/Score/Score';
import SettingsSheet from '../../components/SettingsSheet/SettingsSheet';
import Splashscreen from '../../components/Splashscreen/Splashscreen';
import { AppState, AnswerMethodsObj, SettingsPayload } from '../../types/types';
import StatusContext from '../../context/StatusContext';
import SumContext from '../../context/SumContext';
import AnswerContext from '../../context/AnswerContext';
import ScoreContext from '../../context/ScoreContext';

class App extends Component<{}, AppState> {
  state: AppState = {
    showSplash: false,
    gameStatus: 'showSettings',
    possibleNums: [],
    baseNum: 20,
    num1: null,
    num2: '?',
    op1: '+',
    op2: '=',
    possibleAns: [],
    correctAns: null,
    rightWrong: null,
    score: 0,
    totalLives: 7,
    livesLeft: 7
  };

  // Method to create a random number. Will be used throughout app
  getRandomNumber = (base: number): number => {
    return Math.floor(Math.random() * Math.floor(base));
  };

  // Method to define the sum to be solved. For addition and multiplication
  // Runs at the beginning of the game, and every time the next question button is pressed
  defineSum = (): void => {
    // First check to see if the game has ended
    if (this.checkForEndGame()) {
      return;
    }
    // Destructure the relevant state elements
    const { possibleNums, baseNum, op1 } = this.state;
    // Choose a random number from the possible numbers array,
    // based on the length of the possible numbers array
    const randomNum = possibleNums[this.getRandomNumber(possibleNums.length)];
    // Define how to get answers based on the operator
    // @todo add other methods when needed
    const answerMethod: AnswerMethodsObj = {
      '+': (a, b) => a - b,
      x: (a, b) => a * b
    };
    // Define correct answer, and two incorrect other possibles, +/- up to 3 to the correct answer
    const answer1 = answerMethod[op1](baseNum, randomNum);
    let answer2 = answer1 + (this.getRandomNumber(3) + 1);
    if (op1 === '+') {
      answer2 = answer2 > baseNum ? baseNum : answer2; // Don't allow random answer to be higher than the baseNum
    }
    let answer3 = answer1 - (this.getRandomNumber(3) + 1);
    answer3 = answer3 < 0 ? 0 : answer3; // Don't allow random answer to be negative
    // Put the possible answers into an array, ready to be shuffled
    const answerArray = [answer1, answer2, answer3];
    // Create a random order of indices of 0, 1 and 2
    const answerSet: Set<number> = new Set();
    let i = 0;
    let a;
    while (i < 3) {
      a = this.getRandomNumber(3);
      answerSet.add(a);
      i = answerSet.size;
    }
    // shuffle the possible answer array according to the random order of indices
    const possibleAns = [...answerSet].map((x) => answerArray[x]);

    this.setState({
      gameStatus: 'showSum',
      num1: randomNum,
      num2: '?',
      // remove the chosen random number from the array of possible numbers and update the state
      possibleNums: [...possibleNums].filter((val) => val !== randomNum),
      possibleAns,
      correctAns: answer1
    });
  };

  // Method to define the possible answers to a sum. For addition and subtraction.
  // Runs once at the beginning of the game, then calls the defineSum method as a callback
  definePossibleNums = (): void => {
    // Destructure the relevant state elements
    const { possibleNums, baseNum, op1 } = this.state;
    // Create and empty array, fill it with numbers from 1 to (baseNum -1),
    // this defines the possible numbers to be used in the left hand side of the sum
    const newNums: number[] = [];
    const numLimit = op1 === '+' ? baseNum : 13;
    for (let i = 1; i < numLimit; i++) {
      newNums.push(i);
    }

    this.setState(
      {
        possibleNums: [...possibleNums].concat(newNums)
      },
      () => {
        this.defineSum();
      }
    );
  };

  // Method to start the game and hide the splash screen.
  // Can be expanded to start different games (addition, subtraction, times table)
  startGameHandler = (): void => {
    this.definePossibleNums();
    this.setState({
      showSplash: false
    });
  };

  // Method to reset the game to the starting state
  resetGameHandler = (): void => {
    this.setState(
      {
        possibleNums: [],
        score: 0,
        rightWrong: null
      },
      () => {
        this.startGameHandler();
      }
    );
  };

  // Method to check if the player has reached the max score, or has run out of possible answers
  checkForEndGame = (): boolean => {
    // Destructure the relevant state elements
    const { livesLeft, score } = this.state;
    // Check if score has reached 7
    if (score === 7) {
      this.setState({
        gameStatus: 'endWin',
        showSplash: true
      });
      return true;
    }
    // Check if player has run out of lives
    if (livesLeft === 0) {
      this.setState({
        gameStatus: 'endLose',
        showSplash: true
      });
      return true;
    }

    return false;
  };

  // Method to move the game into the phase where the player checks their answer
  answerClickHandler = (value: number): void => {
    this.setState({
      gameStatus: 'confirmAnswer',
      num2: value
    });
  };

  // If the player is not happy with their selected answer, allow them to reset and choose another one
  noCheckHandler = (): void => {
    this.setState({
      gameStatus: 'showSum',
      num2: '?'
    });
  };

  // If the player is sure about their answer, check if the answer is correct and show the result
  yesCheckHandler = (): void => {
    const { num2, correctAns } = this.state;
    if (num2 === correctAns) {
      this.setState((prevState) => ({
        gameStatus: 'showResult',
        rightWrong: true,
        score: prevState.score + 1
      }));
      return;
    }
    this.setState((prevState) => ({
      gameStatus: 'showResult',
      rightWrong: false,
      livesLeft: prevState.livesLeft - 1
    }));
  };

  // When the player hits next question, tee up next q, but delay the game status change
  // so that user does not see a correct answer suddenly change to being wrong.
  nextQuestionHandler = (): void => {
    this.defineSum();
    setTimeout(() => {
      this.setState({
        rightWrong: null
      });
    }, 800);
  };

  showSettingsHandler = (): void => {
    this.setState({
      gameStatus: 'showSettings'
    });
  };

  settingsHandler = (payload: SettingsPayload): void => {
    this.setState(
      {
        baseNum: payload.baseNum,
        op1: payload.operator,
        totalLives: payload.difficulty,
        livesLeft: payload.difficulty
      },
      () => {
        this.resetGameHandler();
      }
    );
  };

  // React render method here
  render(): JSX.Element {
    const {
      showSplash,
      gameStatus,
      num1,
      num2,
      baseNum,
      op1,
      op2,
      rightWrong,
      possibleAns,
      score,
      correctAns,
      totalLives,
      livesLeft
    } = this.state;
    return (
      <StatusContext.Provider value={{ gameStatus }}>
        <div className="App">
          {showSplash && <Splashscreen startgame={this.startGameHandler} resetgame={this.resetGameHandler} />}
          <Header showSettings={this.showSettingsHandler} />
          <div className="stage">
            {gameStatus === 'showSettings' ? (
              <SettingsSheet handleSettings={this.settingsHandler} />
            ) : (
              <div className="game__sheet">
                <SumContext.Provider value={{ num1, num2, baseNum, op1, op2, rightWrong }}>
                  <Sum />
                  <AnswerContext.Provider
                    value={{
                      possibleAns,
                      answerClickHandler: this.answerClickHandler,
                      noCheckHandler: this.noCheckHandler,
                      yesCheckHandler: this.yesCheckHandler,
                      nextQuestionHandler: this.nextQuestionHandler,
                      score,
                      correctAns
                    }}
                  >
                    <div className="answer-strip">
                      <Answers />
                      <Check />
                      <Result />
                    </div>
                    <ScoreContext.Provider value={{ totalLives, livesLeft }}>
                      <Score />
                    </ScoreContext.Provider>
                  </AnswerContext.Provider>
                </SumContext.Provider>
              </div>
            )}
          </div>
        </div>
      </StatusContext.Provider>
    );
  }
}

export default App;
