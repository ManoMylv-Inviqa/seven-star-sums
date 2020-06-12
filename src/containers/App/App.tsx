import React, { Component } from 'react';
import './App.css';
import Header from '../../components/Header/Header';
import Sum from '../../components/Sum/Sum'
import Answers from '../../components/Answers/Answers'
import Check from '../../components/Check/Check'
import Result from '../../components/Result/Result'
import Score from '../../components/Score/Score'
import Splashscreen from '../../components/Splashscreen/Splashscreen';
import { AppState, AnswerMethodsObj } from '../../types/types';

class App extends Component<{}, AppState> {

  state: AppState = {
    showSplash: true,
    gameStatus: 'startGame', // Possible values: 'startGame', 'showSum', 'confirmAnswer', 'showResult', 'endWin', 'endLose'
    possibleNums: [],
    baseNum: 20,
    num1: null,
    num2: '?',
    op1: '+',
    op2: '=',
    possibleAns: [],
    correctAns: null,
    gotItRight: null,
    score: 0,
    totalLives: 0,
    livesLeft: 0
  };
  
  // Method to create a random number. Will be used throughout app
  getRandomNumber = (base: number) => {
    return Math.floor(Math.random() * Math.floor(base));
  };

  // Method to define the sum to be solved. For addition and subtraction
  // Runs at the beginning of the game, and every time the next question button is pressed
  defineSum = () => {
    // First check to see if the game has ended
    if (this.checkForEndGame()){return};
    // Destructure the relevant state elements
    const { possibleNums, baseNum, op1 } = this.state;
    // Choose a random number from the possible numbers array, 
    // based on the length of the possible numbers array
    let randomNum = possibleNums[this.getRandomNumber(possibleNums.length)];
    // Define how to get answers based on the operator
    // @todo add other methods when needed
    const answerMethod: AnswerMethodsObj = {
      '+': (a, b) => a - b
    }
    // Define correct answer, and two other possibles
    const answer1 = answerMethod[op1](baseNum, randomNum);
    let answer2 = answer1 + (this.getRandomNumber(3)+1);
    answer2 = (answer2 > baseNum ? baseNum : answer2) // Don't allow random answer to be higher than the baseNum
    let answer3 = answer1 - (this.getRandomNumber(3)+1);
    answer3 = (answer3 < 0 ? 0 : answer3) // Don't allow random answer to be negative
    // Put the possible answers into an array, ready to be shuffled
    const answerArray = [answer1, answer2, answer3];
    // Create a random order of indices of 0, 1 and 2
    let answerSet: Set<number> = new Set(), i = 0, a;
    while (i < 3) {
      a = this.getRandomNumber(3);
      answerSet.add(a);
      i = answerSet.size;
    }
    // shuffle the possible answer array according to the random order of indices
    const possibleAns = [...answerSet].map(x => answerArray[x]);

    this.setState( { 
      gameStatus: 'showSum',
      num1: randomNum,
      num2: '?',
      // remove the chosen random number from the array of possible numbers and update the state
      possibleNums: [...possibleNums].filter( val => val !== randomNum ),
      possibleAns: possibleAns,
      correctAns: answer1
    } )
  };

  // Method to define the possible answers to a sum. For addition and subtraction.
  // Runs once at the beginning of the game, then calls the defineSum method as a callback
  definePossibleNums = () => {
    // Destructure the relevant state elements
    const { possibleNums, baseNum } = this.state;
    // Create and empty array, fill it with numbers from 1 to (baseNum -1),
    // this defines the possible numbers to be used in the left hand side of the sum
    let newNums: number[] = [];
    for (let i = 1; i < baseNum; i++) {
      newNums.push(i);
    }

    this.setState( { 
      possibleNums: [...possibleNums].concat(newNums),
      totalLives: baseNum - 8,
      livesLeft: baseNum - 8 
    }, () => {this.defineSum()});
  }

  // Method to start the game and hide the splash screen.
  // Can be expanded to start different games (addition, subtraction, times table)
  startGameHandler = () => {
    this.definePossibleNums();     
    this.setState({
      showSplash: false
    });
  }

  // Method to reset the game to the starting state
  resetGameHandler = () => {
    this.setState({
      possibleNums: [],
      score: 0
    }, () => {this.startGameHandler()});
  }

  // Method to check if the player has reached the max score, or has run out of possible answers
  checkForEndGame = () => {
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
      else if (livesLeft === 0) {
        this.setState({
          gameStatus: 'endLose',
          showSplash: true
        });
        return true;
      }
  }

  // Method to move the game into the phase where the player checks their answer
  answerClickHandler = (value: number) => {
    this.setState({
      gameStatus: 'confirmAnswer',
      num2: value
    })
  }

  // If the player is not happy with their selected answer, allow them to reset and choose another one
  noCheckHandler = () => {
    this.setState({
      gameStatus: 'showSum',
      num2: '?'
    })
  }

  // If the player is sure about their answer, check if the answer is correct and show the result
  yesCheckHandler = () => {
    if (this.state.num2 === this.state.correctAns) {
      this.setState(prevState => ({
        gameStatus: 'showResult',
        gotItRight: true,
        score: prevState.score + 1
      }))
    } else {
      this.setState(prevState => ({
        gameStatus: 'showResult',
        gotItRight: false,
        livesLeft: prevState.livesLeft - 1
      }))
    }
  }

  // When the player hits next question, tee up next q, but delay the game status change 
  // so that user does not see a correct answer suddenly change to being wrong.
  nextQuestionHandler = () => {
    this.defineSum();
    setTimeout(() => {
      this.setState( { 
        gotItRight: null
      })
    }, 800)
  }

  // React render method here
  render() {
    return (
      <div className="App">
        { !!this.state.showSplash && <Splashscreen 
          startgame={this.startGameHandler}
          resetgame={this.resetGameHandler}
          status={this.state.gameStatus}
        /> }
        <Header />
        <Sum 
          num1={this.state.num1}
          num2={this.state.num2}
          baseNum={this.state.baseNum}
          op1={this.state.op1}
          op2={this.state.op2}
          rightWrong={this.state.gotItRight}
          />
        <div className='answer-strip'>
          <Answers 
            answers={this.state.possibleAns}
            clicked={this.answerClickHandler}
            gameStatus={this.state.gameStatus}/>
          <Check 
            yesClicked={this.yesCheckHandler}
            noClicked={this.noCheckHandler}
            gameStatus={this.state.gameStatus}/>
          <Result 
            nextQ={this.nextQuestionHandler}
            rightWrong={this.state.gotItRight}
            score={this.state.score} 
            correctAns={this.state.correctAns}
            gameStatus={this.state.gameStatus} />
        </div>
        <Score 
        displayScore={this.state.score}
        totalLives={this.state.totalLives}
        livesLeft={this.state.livesLeft}/>
      </div>
    );
  }
}

export default App;