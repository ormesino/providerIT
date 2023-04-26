import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          alert('Registrado com sucesso!');
          navigate('/', { replace: true });
          console.log(result);
        })
        .catch((error) => {
          if (error.code === 'auth/weak-password') {
            alert('Senha fraca!');
          } else if (error.code === 'auth/email-already-in-use') {
            alert('E-mail já cadastrado!');
          } else {
            alert('Erro ao registrar!');
          }
          setPassword('');
        });
    } else {
      alert('Preencha os campos corretamente!');
    }
  }

  return (
    <div className='homeContainer'>
      <h1>Registro</h1>
      <span>Vamos criar a sua conta!</span>

      <form
        className='homeForm'
        onSubmit={handleRegister}
      >
        <input
          type='text'
          placeholder='Digite um e-mail.'
          value={email}
          onChange={(e) => setEmail(e.target.value)}

        />
        <input
          type='password'
          placeholder='Digite uma senha.'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Registrar</button>
        <p>Já possui uma conta? <Link to="/">Faça o login.</Link></p>
      </form>
    </div>
  );
}