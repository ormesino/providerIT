import React, { Component } from 'react';
import './style.css';

export default class Button extends Component {
  render() {
    return(
      <div>
        <button onClick={this.props.action} className="btnCookie">{this.props.title}</button>
      </div>
    );
  }
} 