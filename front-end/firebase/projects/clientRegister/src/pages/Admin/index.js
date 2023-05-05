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
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from 'primereact/dropdown';

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

  const pronouns = [
    { name: 'Ele/Dele' },
    { name: 'Ela/Dela' },
    { name: 'Elu/Delu' },
  ];

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
    async function loadUserName() {
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
    }

    async function loadClients() {
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

    loadUserName();
    loadClients();
  }, []);

  useEffect(() => {
    if(!visible) {
      setClient({});
    }
  }, [visible]);

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
      .catch(() => {
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
        <span className="p-float-label">
          <InputText
            value={client.name || ''}
            onChange={(e) => setClient({ ...client, name: e.target.value })}
          />
          <label htmlFor="nome">Nome</label>
        </span>
        <span className="p-float-label">
          <Calendar
            dateFormat="dd/mm/yy"
            value={client.birthDate}
            onChange={(e) => setClient({ ...client, birthDate: e.target.value })}
            readOnlyInput
          />
          <label htmlFor="nome">Data de Nascimento</label>
        </span>
        <Button
          label="Adicionar"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
      </div>

      <Dialog header="Cadastro do Cliente" visible={visible} onHide={() => setVisible(false)}
        style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
        <form className='dialogBox'>
          <div>
            <span className="p-float-label">
              <InputText
                value={client.name || ''}
                onChange={(e) => setClient({ ...client, name: e.target.value })}
                // onchange="checkName()"
                size="30"
                required
              />
              <label htmlFor="nome">Nome</label>
            </span>
            <span className="p-float-label">
              <Calendar
                dateFormat="dd/mm/yy"
                value={client.birthDate}
                onChange={(e) => setClient({ ...client, birthDate: e.value })}
                readOnlyInput
              />
              <label htmlFor="nome">Data de Nascimento</label>
            </span>
          </div>


          <div className='radioContainer'>
            <div className='radioOption'>
              <RadioButton inputId="gender1" name="gender" value="Feminino" onChange={(e) => setClient({ ...client, gender: e.value })} checked={client.gender === 'Feminino'} />
              <label htmlFor="gender1" className="ml-2">Feminino</label>
            </div>
            <div className='radioOption'>
              <RadioButton inputId="gender2" name="gender" value="Masculino" onChange={(e) => setClient({ ...client, gender: e.value })} checked={client.gender === 'Masculino'} />
              <label htmlFor="gender2" className="ml-2">Masculino</label>
            </div>
            <div className='radioOption'>
              <RadioButton inputId="gender3" name="gender" value="Personalizado" onChange={(e) => setClient({ ...client, gender: e.value })} checked={client.gender === 'Personalizado'} />
              <label htmlFor="gender3" className="ml-2">Personalizado</label>
            </div>
          </div>

          {client.gender === 'Personalizado' && (
            <div>
              <div className="card flex justify-content-center">
                <span className="p-float-label">
                  <Dropdown inputId="pronome" value={client.pronouns} onChange={(e) => setClient({ ...client, pronouns: e.value })} options={pronouns} optionLabel="name" className="selectPronoun" />
                  <label htmlFor="pronome">Seu pronome</label>
                </span>
              </div>
              <span className="p-float-label">
                <InputText size="15" id="genero" />
                <label htmlFor="genero">Gênero (opcional)</label>
              </span>
            </div>
          )
          }

          <div>
            <span className="p-float-label">
              <InputMask mask="999.999.999-99" value={client.cpf} /* onChange={formatCPF} */ onChange={(e) => setClient({ ...client, cpf: e.target.value })} size="14" id="cpf" required />
              <label htmlFor="cpf">CPF</label>
            </span>
            <span className="p-float-label">
              <InputMask mask="99999-999" /* onChange={getCEP} */ size="10" id="cep" required />
              <label htmlFor="cep">CEP</label>
            </span>
          </div>

          <div>
            <span className="p-float-label">
              <InputText id="rua" disabled />
              <label htmlFor="rua">Rua</label>
            </span>
            <span className="p-float-label">
              <InputText size={5} id="num" required />
              <label htmlFor="num">Núm.</label>
            </span>
            <span className="p-float-label">
              <InputText size={10} id="complemento" />
              <label htmlFor="complemento">Complemento</label>
            </span>
          </div>

          <div>
            <span className="p-float-label">
              <InputText id="bairro" disabled />
              <label htmlFor="bairro">Bairro</label>
            </span>
            <span className="p-float-label">
              <InputText id="cidade" disabled />
              <label htmlFor="cidade">Cidade</label>
            </span>
            <span className="p-float-label">
              <InputText size={1} id="estado" disabled />
              <label htmlFor="estado">UF</label>
            </span>
          </div>

          <div align="center">
            <Button label="Adicionar" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Button type='button' label="Limpar Campos" icon="pi pi-times" onClick={() => clearForm()} />
          </div>
        </form>
      </Dialog>

      <Divider />

      <div className='clientList'>
        <Toast ref={toast} />
        <div className="card">
          <DataTable value={fakeClients}
            selectionMode="single"
            selection={selectedClient}
            onSelectionChange={(e) => { setSelectedClient(e.value) }}
            dataKey="id"
            tableStyle={{ minWidth: '50rem' }}
            stripedRows
          >
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