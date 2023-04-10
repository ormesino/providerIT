import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        email: '',
        password: '',
        gender: ''
      }
    }

    this.saveData = this.saveData.bind(this);
    this.register = this.register.bind(this);
  }

  saveData(e) {
    if (e.target.value != '') {
      let form = this.state.form;
      form[e.target.name] = e.target.value;
      this.setState({ form: form });
    }
  }

  register() {
    let form = this.state.form;
    if (form.email === '' || form.name === '' || form.password === '' || form.gender === '') {
      alert('Some info is missing, make sure to fill in all fields!');
    } else {
      alert(`User ${this.state.form.name} has been created! 🤗`);
    }
  }

  render() {
    return (
      <>
        <form onSubmit={this.register}>
          <label>Name: </label>
          <input type="text" name="name" onBlur={this.saveData} />
          <br />

          <label>E-mail: </label>
          <input type="text" name="email" onBlur={this.saveData} />
          <br />

          <label>Password: </label>
          <input type="password" name="password" onBlur={this.saveData} />
          <br />

          <label>Gender: </label>
          <select onChange={this.saveData} name="gender" >
            <option disabled selected>Select</option>
            <option value="Masculine">Masculine</option>
            <option value="Feminine">Feminine</option>
            <option value="Other">Other</option>
          </select>
          <br />

          <button type="submit">Register</button>
        </form>
      </>
    );
  }
} 