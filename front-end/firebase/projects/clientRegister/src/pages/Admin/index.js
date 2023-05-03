import { useState, useEffect, useRef } from 'react';

import './style.css';
import Logo from '../../assets/logo.svg';

import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';


import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';

export default function Admin() {
  const [user, setUser] = useState({});

  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState({});
  const [selectedClient, setSelectedClient] = useState(null);
  const [client, setClient] = useState({});
  const [clientList, setClientList] = useState([]);

  const toast = useRef(null);

  const fakeClients = [
    {
      id: 1,
      name: 'João do Nascimento',
      cpf: '123.456.789-00',
      birthDate: '01/01/2000',
      gender: 'Masculino'
    },
    {
      id: 2,
      name: 'Maria',
      cpf: '123.456.789-00',
      birthDate: '01/01/2000',
      gender: 'Feminino'
    },
    {
      id: 3,
      name: 'José',
      cpf: '123.456.789-00',
      birthDate: '01/01/2000',
      gender: 'Masculino'
    },
  ]

  useEffect(() => {
    async function loadClients() {
      const userDetail = localStorage.getItem('@detailUser');
      const data = JSON.parse(userDetail);
      const docRef = doc(db, 'user', data.uid);
      await getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            data.name = doc.data().name;
            setUser(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      /* const clientRef = collection(db, 'clients');
      const q = query(clientRef, orderBy('created', 'desc'), where("userUid", "==", data.uid));

      onSnapshot(q, (snapshot) => {
        let clients = [];
        snapshot.forEach((doc) => {
          clients.push({
            // ?
          });
        });
        setClientList(clients);
      }); */
    }

    loadClients();
  }, []);

  async function handleAddClient(e) {
    e.preventDefault();

    if (edit?.id) {
      if (true) {
        toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'Você não modificou os dados do cliente.' });
        setClient({});
        setEdit({});
      } else {
        const docRef = doc(db, 'clients', edit?.id);
        await updateDoc(docRef, {
          // ?
        })
          .then(() => {
            toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Dados do cliente atualizados!' });

            setEdit({});
          })
          .catch(() => {
            toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao atualizar os dados do cliente.' });

            setEdit({});
          })
      }
      return;
    }


    await addDoc(collection(db, 'clients'), {
      // ?
    })
      .then(() => {
        toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Cliente adicionado!' });

      })
      .catch((error) => {
        toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao adicionar o cliente.' });
      });
  }

  async function handleEditClient(item) {
    setEdit(item);

  }

  async function handleDeleteClient(id) {
    const docRef = doc(db, 'clients', id);
    await deleteDoc(docRef)
      .then(() => {
        toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Cliente excluído.' });
      })
      .catch(() => {
        toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao excluir o cliente.' });
      });
  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className='adminContainer'>
      <img src={Logo} alt="logo" />
      <div className='adminWelcome'>
        <h3>Seja bem-vindo(a)</h3>
        <div className='adminInfo'>
          <p>{user.name}</p>
          <Button
            icon="pi pi-sign-out"
            className='p-button-danger'
            onClick={handleLogout}
          />
        </div>
      </div>

      <div className="inputArea">
        <InputText
          placeholder='Nome'
          value={client.name}
          onChange={(e) => setClient({ ...client, name: e.target.value })}
        />
        <Calendar
          placeholder='Data de Nascimento'
          dateFormat="dd/mm/yy"
          value={client.birthDate}
          onChange={(e) => setClient({ ...client, birthDate: e.target.value })}
          readOnlyInput
        />
        <div className="card flex justify-content-center">
          <Button
            label="Adicionar"
            icon="pi pi-plus"
            onClick={() => setVisible(true)}
          />
          <Dialog header="Cadastro do Cliente" visible={visible} onHide={() => setVisible(false)}
            style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
            <form>
              <div>
                <InputText
                  placeholder='Nome'
                  value={client.name}
                  onChange={(e) => setClient({ ...client, name: e.target.value })}
                />
                <Calendar
                  placeholder='Data de Nascimento'
                  dateFormat="dd/mm/yy"
                  value={client.birthDate}
                  onChange={(e) => setClient({ ...client, birthDate: e.value })}
                  readOnlyInput
                />
              </div>
              <InputMask
                placeholder='CPF'
                id="cpf"
                mask="999.999.999-99"
                value={client.cpf}
                onChange={(e) => setClient({ ...client, cpf: e.target.value })}
              />

            </form>
          </Dialog>
        </div>

      </div>

      <Divider />

      <div className='clientList'>
        <Toast ref={toast} />
        <div className="card">
          <DataTable value={fakeClients} selectionMode="single" selection={selectedClient} onSelectionChange={(e) => { setSelectedClient(e.value) }} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
            <Column field="name" header="Nome" />
            <Column field="cpf" header="CPF" />
            <Column field="birthDate" header="Data de Nascimento" />
            <Column field="gender" header="Gênero" />
          </DataTable>
        </div>
      </div>
    </div>
  );
};