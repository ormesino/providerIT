import { useState, useRef } from 'react';

import './style.css';
import Logo from '../../assets/logo.png';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';

import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toast = useRef(null);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Você foi logado com sucesso!'});
          setTimeout(() => {
            navigate('/admin', { replace: true });
          }, 1500);   
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Senha incorreta.' });
          } else if (error.code === 'auth/user-not-found') {
            toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Usuário não encontrado.' });
          } else {
            toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Houve um erro ao tentar logar.' });
          }
          setPassword('');
        });
    } else {
      toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'Preencha todos os campos!' });
    }
  }

  return (
    <div className='homeContainer'>
      <img src={Logo} alt="logo" />
      <span>Gerencie suas tarefas de forma fácil e rápida.</span>

      <form
        className='homeForm'
        onSubmit={handleLogin}
      >
        <span className="p-float-label">
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="email">E-mail</label>
        </span>
        <span className="p-float-label">
          <Password size={30} value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} />
          <label htmlFor="password">Senha</label>
        </span>
        <Toast ref={toast} />
        <button type='submit'>Entrar</button>

        <Divider />

        <p> Não possui uma conta? <Link to="/register">Registre-se!</Link> </p>
      </form>
    </div>
  );
}