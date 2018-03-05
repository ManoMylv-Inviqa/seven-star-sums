import React, { Component } from 'react';
import './App.css';
import Header from '../../components/Header/Header';
import Sum from '../../components/Sum/Sum'
import Answers from '../../components/Answers/Answers'
import Check from '../../components/Check/Check'
import Result from '../../components/Result/Result'
import Score from '../../components/Score/Score'
import Splashscreen from '../../components/Splashscreen/Splashscreen';

class App extends Component {

  state = {
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
    score: 0
  };
  
  // Function to create a random number. Will be used throughout app
  getRandomNumber = (base) => {
    return Math.floor(Math.random() * Math.floor(base));
  };

  // Function to define the sum to be solved. For addition and subtraction
  // Runs at the beginning of the game, and every time the next question button is pressed
  defineSum = () => {
    // Destructure the relevant state elements
    const { possibleNums, baseNum, op1 } = this.state;
    // Choose a random number from the possible numbers array, 
    // based on the length of the possible numbers array
    let randomNum = possibleNums[this.getRandomNumber(possibleNums.length)];
    // Define how to get answers based on the operator
    // @todo add other methods when needed
    const answerMethod = {
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
    let answerSet = new Set(), i = 0, a;
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
      correctAns: answer1,
      gotItRight: null
    } )
  };

  // Function to define the possible answers to a sum. For addition and subtraction.
  // Runs once at the beginning of the game, then calls the defineSum function as a callback
  definePossibleNums = () => {
    // Destructure the relevant state elements
    const { possibleNums, baseNum } = this.state;
    // Create and empty array, fill it with numbers from 1 to (baseNum -1),
    // this defines the possible numbers to be used in the left hand side of the sum
    let newNums = [];
    for (let i = 1; i < baseNum; i++) {
      newNums.push(i);
    }

    this.setState( { 
      possibleNums: [...possibleNums].concat(newNums), 
    }, () => {this.defineSum()});
  }

  // Function to start the game and hide the splash screen.
  // Can be expanded to start different games (addition, subtraction, times table)
  startGameHandler = () => {
    this.definePossibleNums();     
    this.setState({
      showSplash: false
    });
  }

  // Function to reset the game to the starting state
  resetGameHandler = () => {
    this.setState({
      possibleNums: [],
      score: 0
    }, () => {this.startGameHandler()});
  }

  // Function to check if the player has reached the max score, or has run out of possible answers
  checkForEndGame = () => {
      // Destructure the relevant state elements
      const { possibleNums, score } = this.state;  
      // Check if score has reached 7
      if (score === 7) {
        this.setState({
          gameStatus: 'endWin',
          showSplash: true
        });
      }
      else if (possibleNums.length === 0) {
        this.setState({
          gameStatus: 'endLose',
          showSplash: true
        });
      }
      else { return };
  }

  answerClickHandler = (value) => {
    this.setState({
      gameStatus: 'confirmAnswer',
      num2: value
    })
  }

  noCheckHandler = () => {
    this.setState({
      gameStatus: 'showSum',
      num2: '?'
    })
  }

  yesCheckHandler = () => {
    if (this.state.num2 === this.state.correctAns) {
      this.setState(prevState => ({
        gameStatus: 'showResult',
        gotItRight: true,
        score: prevState.score + 1
      }), () => {this.checkForEndGame()})
    } else {
      this.setState({
        gameStatus: 'showResult',
        gotItRight: false
      }, () => {this.checkForEndGame()})
    }
  }

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
          />
        { this.state.gameStatus === 'showSum' ? 
        <Answers 
          answers={this.state.possibleAns}
          clicked={this.answerClickHandler}/>
        : null }
        { this.state.gameStatus === 'confirmAnswer' ?
        <Check 
          yesClicked={this.yesCheckHandler}
          noClicked={this.noCheckHandler}/>
        : null }
        { this.state.gameStatus === 'showResult' ?
        <Result 
          nextQ={this.defineSum}
          rightWrong={this.state.gotItRight}/>
        : null }
        <Score displayScore={this.state.score}/>
      </div>
    );
  }
}

export default App;
