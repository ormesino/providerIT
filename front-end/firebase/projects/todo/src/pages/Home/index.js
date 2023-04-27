import { useState } from 'react';
import './style.css';

import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert('Logado com sucesso!');
          navigate('/admin', { replace: true });
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            alert('Senha incorreta!');
          } else if (error.code === 'auth/user-not-found') {
            alert('Usuário não encontrado!');
          } else {
            alert('Erro ao logar!');
          }
          setPassword('');
        });
    } else {
      alert('Preencha os campos corretamente!');
    }
  }

  return (
    <div className='homeContainer'>
      <h1>ToDo</h1>
      <span>Gerencie suas tarefas de forma fácil e rápida.</span>

      <form
        className='homeForm'
        onSubmit={handleLogin}
      >
        <input
          type='text'
          placeholder='Digite seu e-mail.'
          value={email}
          onChange={(e) => setEmail(e.target.value)}

        />
        <input
          type='password'
          placeholder='Digite sua senha.'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Entrar</button>
        <p>Não possui uma conta? <Link to="/register">Registre-se!</Link></p>
      </form>
    </div>
  );
}