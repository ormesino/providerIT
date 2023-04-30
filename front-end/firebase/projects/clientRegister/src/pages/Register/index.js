import { useState, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
        

import { auth } from '../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const toast = useRef(null);

  function handleRegister(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Conta registrada!' });
          setEmail('');
          setPassword('');
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1500);  
        })
        .catch((error) => {
          if (error.code === 'auth/weak-password') {
            toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Senha fraca, tente novamente.' });
          } else if (error.code === 'auth/email-already-in-use') {
            toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'E-mail já cadastrado.' });
          } else {
            toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Houve um erro ao se registrar.' });
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
          <Password size={30} value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
          <label htmlFor="password">Senha</label>
        </span>

        <Toast ref={toast} />
        <button type='submit'>Registrar</button>
        
        <Divider />
        
        <p>Já possui uma conta? <Link to="/">Faça o login.</Link></p>
      </form>
    </div>
  );
}

/* import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function SeverityDemo() {
    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    }

    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Info', detail:'Message Content', life: 3000});
    }

    const showWarn = () => {
        toast.current.show({severity:'warn', summary: 'Warning', detail:'Message Content', life: 3000});
    }

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
    }

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast} />
            <div className="flex flex-wrap gap-2">
                <Button label="Success" className="p-button-success" onClick={showSuccess} />
                <Button label="Info" className="p-button-info" onClick={showInfo} />
                <Button label="Warn" className="p-button-warning" onClick={showWarn} />
                <Button label="Error" className="p-button-danger" onClick={showError} />
            </div>
        </div>
    )
} */
