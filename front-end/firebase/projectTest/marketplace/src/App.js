import { useState } from 'react';

import { db } from './firebaseConnection';
import { collection, addDoc } from 'firebase/firestore'

import './App.css';

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");

  async function createUser() {
    if(email !== "" && username !== "" && birthDate !== "" && password !== "") {
      await addDoc(collection(db, "users"), {
        email,
        birthDate,
        username,
        password
      })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        setUsername("");
        setEmail("");
        setBirthDate("");
        setPassword("");
      })
      .catch((error) => {
        alert("Não foi possível registrar o usuário");
        console.log(error);
      })
    } else {
      alert("Preencha todos os campos!");
    }
  }

  return (
    <div>
      <div className="container">
        <p className="title">Register a new customer!</p>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
        />
        <input
          type="text"
          placeholder="Data de Nascimento"
          onFocus={(e) => e.target.type = "date"}
          onBlur={(e) => {
            if (!e.target.value) {
              e.target.type = "text"
            }
          }}
          value={birthDate}
          onChange={(e) => { setBirthDate(e.target.value) }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button onClick={createUser}>Cadastrar Usuário</button>
      </div>
    </div>
  );
}

export default App;