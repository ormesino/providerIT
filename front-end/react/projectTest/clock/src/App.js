import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: "",
      viewHours: false,
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ hours: new Date().toLocaleTimeString() })
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.hours.endsWith("00:00")) {
      alert("Welcome to a new hour! 🎉");
    }
  }

  render() {
    return (
      <>
        {this.state.viewHours ?
          <>
            <h1>Eyes on the watch 👀</h1>
            <h2>{this.state.hours}</h2>
          </>
          :
          <>
            <h1>Do you wish to see the hours? 🤔</h1>
            <button onClick={() => this.setState({ viewHours: true })}>Yes</button>
          </>
        }
      </>
    );
  }
}