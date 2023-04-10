import React, { Component } from 'react';

class Membro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    };
    this.entrar = this.entrar.bind(this);
    this.sair = this.sair.bind(this);
  }
  s

  render() {
    return (
      <div>
        <h2>Bem-vindo(a) {this.state.name}</h2>
        <button id="btnEntrar" onClick={this.entrar} >
          Entrar no sistema
        </button>
        <button id="btnSair" onClick={this.sair}>
          Sair
        </button>
      </div>
    );
  }
}

export default Membro;