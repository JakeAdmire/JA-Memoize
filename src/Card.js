import React, { Component } from 'react';
import Answers from './Answers.js';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { showAnswer: false, attemptCorrect: false, cardNumber: 0 };
  }
  showResults = (event) => {
    if (event.target.innerText === this.props.frontContent.solutionPrototype) {
      this.setState({attemptCorrect: true, showAnswer: true});
    } else { 
      this.setState({attemptCorrect: false, showAnswer: true})
    }
  }
  handleClick = (event) => {
    if (event.target.innerText === 'try again') { this.setState({showAnswer: false}); 
    } else { 
      let newNum = JSON.parse( localStorage.getItem('currNum') );
      this.setCardNum(newNum);
      this.setStorage();
      this.setState({showAnswer: false, attemptCorrect: false, cardNumber: newNum++})
    }
  }
  setCardNum = (newNum) => {
    newNum++;
    localStorage.setItem('currNum', newNum);
    this.props.resetState({cardNumber: newNum++});
  }
  setStorage() {
    let cardsArray = JSON.parse( localStorage.getItem('cardsArray') );
    cardsArray.splice(0, 1);
    localStorage.setItem( 'cardsArray', JSON.stringify(cardsArray) );
  }
  generateCard() {
    let header = this.state.attemptCorrect ? 'Good Job!' : 'Incorrect!';
    let button = this.state.attemptCorrect ? 'next prototype' : 'try again';
    if (this.state.showAnswer) {
      return (
      <div className="card-back">
        <h2>{header}</h2>
        <button className="back-button" onClick={this.handleClick}>{button}</button> 
      </div>
      ) 
    } else {
      return (
      <div className="card-front">
        <h3>What prototype would you use to..</h3>
        <h3>{this.props.frontContent.problem}</h3> 
        <h4 className="snippet">{this.props.frontContent.snippet}</h4>
      </div>
      )
    }
  }
  render() {
    let cardClass = this.state.showAnswer ? 'back' : '';
    return (
      <div className={`card ${cardClass}`}>
        <button disabled={true} className="left">PREVIOUS
          <span></span>
        </button>
        <button disabled={true} className="right">SKIP
          <span></span>
        </button>
        <span className='card-counter'>{JSON.parse( localStorage.getItem('currNum') ) + 1}</span>
        {this.generateCard()}
        <Answers  answers={this.props.answers}
                  correctAnswer={this.props.frontContent.solutionPrototype}
                  showResults={this.showResults}/>
      </div>
    )
  }
}