import React, { Component } from 'react';
import './style.css';
import Image from '../../assets/fortuneCookie.jpg';
import Button from '../Button';

export default class CookieDiv extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sentence: '',
    };

    this.fortunes = [
      'Do not be afraid of competition. 🏆',
      'An exciting opportunity lies ahead of you. 🤝',
      'You love peace. 🕊️',
      'Get your mind set…confidence will lead you on. 🧘',
      'You will always be surrounded by true friends. 🫂',
      'Sell your ideas-they have exceptional merit. 💡',
      'You should be able to undertake and complete anything. ✅',
      'You are kind and friendly. 💕',
      'You are wise beyond your years. 🦉',
      'Your ability to juggle many tasks will take you far. 🤹',
      'A routine task will turn into an enchanting adventure. ⏰',
    ];

    this.showFortune = this.showFortune.bind(this);
  }

  showFortune() {
    let state = this.state;
    let randomNum = Math.floor(Math.random() * this.fortunes.length);
    state.sentence = this.fortunes[randomNum];
    this.setState(state);
  }

  render() {
    return (
      <div className="container">
        <img src={Image} alt="Fortune Cookie" />

        {
          this.state.sentence != ''
            ?
            <h2 className="fortune">{this.state.sentence}</h2>
            :
            <h1>What is your daily fortune? 🤔</h1>
        }
        <Button title="Get a cookie!" action={this.showFortune} />
      </div>
    );
  }
}