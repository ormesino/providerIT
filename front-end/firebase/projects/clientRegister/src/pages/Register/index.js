import { useState, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';

import { auth, db } from '../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const navigate = useNavigate();
  const toast = useRef(null);

  function handleRegister(e) {
    e.preventDefault();
    if (email !== '' && password !== '' && name !== '' && confirm !== '') {
      if (password !== confirm) {
        toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'As senhas não coincidem!' });
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Conta registrada!' });
          const uid = response.user.uid;
          setDoc(doc(db, 'user', uid), {
            name: name,
          });
          setEmail('');
          setPassword('');
          setName('');
          setConfirm('');
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1500);
        })
        .catch((error) => {
          if (error.code === 'auth/weak-password') {
            toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'Senha fraca, tente novamente.' });
          } else if (error.code === 'auth/email-already-in-use') {
            toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'E-mail já cadastrado.' });
          } else if (error.code === 'auth/invalid-email') {
            toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'E-mail inválido.' });
          } else {
            toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Houve um erro ao se registrar.' });
          }
          setPassword('');
          setConfirm('');
        });
    } else {
      toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'Preencha todos os campos!' });
    }
  }

  return (
    <div className='homeContainer'>
      <img src={Logo} alt="logo" />
      <span>Vamos criar a sua conta!</span>

      <form
        className='homeForm'
        onSubmit={handleRegister}
      >
        <span className="p-float-label">
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="email">E-mail</label>
        </span>
        <span className="p-float-label">
          <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="name">Nome</label>
        </span>
        <span className="p-float-label">
          <Password size={30} value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
          <label htmlFor="password">Senha</label>
        </span>
        <span className="p-float-label">
          <Password size={30} value={confirm} onChange={(e) => setConfirm(e.target.value)} toggleMask feedback={false} />
          <label htmlFor="password">Confirme a sua senha</label>
        </span>
        <Toast ref={toast} />
        <button type='submit'>Registrar</button>

        <Divider />

        <p>Já possui uma conta? <Link to="/">Faça o login.</Link></p>
      </form>
    </div>
  );
}