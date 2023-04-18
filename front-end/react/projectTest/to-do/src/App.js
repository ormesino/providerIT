import React, { useState } from 'react';
import Image from './assets/icon.png';

import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  function registerTask(event) {
    let inputValue = event.target[0].value;
    if (inputValue === '') {
      alert("You can't create a task without name!");
      inputValue = '';
      event.preventDefault();
    } else {
      setTasks([...tasks, inputValue]);
      inputValue = '';
      alert('Task created!');
      event.preventDefault();
    }
  }

  return (
    <div>
      <div className="header">
        <img src={Image} />
        <h2>To-do List</h2>
      </div>

      <div className="form">
        <form onSubmit={registerTask}>
          <input type="text"></input>
          <button type="submit">Create Task</button>
        </form>
      </div>

      <div className="db">
        <a>Tasks created:</a>
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task}>{task}</li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;