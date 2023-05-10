import { useState, useEffect, useRef } from 'react';

import './style.css';
import Logo from '../../assets/logo.svg';

import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { addDoc, collection, doc, deleteDoc, updateDoc, getDoc, onSnapshot } from 'firebase/firestore';

export default function Admin() {
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [edit, setEdit] = useState({});
  const [selectedClient, setSelectedClient] = useState(null);
  const [client, setClient] = useState({});
  const [clientList, setClientList] = useState([]);
  const [filters, setFilters] = useState({
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    state: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const toast = useRef(null);

  let minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 120);
  let maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - 1);

  const gender = [
    'Feminino',
    'Masculino',
    'Personalizado'
  ];

  const pronouns = [
    'Ele/Dele',
    'Ela/Dela',
    'Elu/Delu',
  ];

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
      const clientRef = collection(db, 'clients');

      onSnapshot(clientRef, (snapshot) => {
        let clients = [];
        snapshot.forEach((doc) => {
          clients.push({
            birthDate: doc.data().birthDate,
            cep: doc.data().cep,
            city: doc.data().city,
            compl: doc.data().compl,
            cpf: doc.data().cpf,
            creator: doc.data().creator,
            gender: doc.data().gender,
            name: doc.data().name,
            neighborhood: doc.data().neighborhood,
            num: doc.data().num,
            optionalGender: doc.data().optionalGender,
            phone: doc.data().phone,
            pronoun: doc.data().pronoun,
            state: doc.data().state,
            street: doc.data().street,
            id: doc.id,
          });
        });
        setClientList(clients);
      });
    }

    loadUserName();
    loadClients();
  }, []);

  useEffect(() => {
    if (!visible) {
      setClient({});
    }
  }, [visible]);

  function checkName() {
    let name = client.name ? client.name : '';
    if (name.length > 0) {
      let fullName = name.split(' ');
      if (fullName.length < 2 || fullName[0].length < 3 || fullName[1].length < 3) {
        toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'Digite um nome válido.' });
        return setClient({ ...client, name: '' });
      }
    }
  }

  function validateCPF(e) {
    let cpf = e.target.value;
    if (cpf !== '') {
      cpf = cpf.replace(/\D/g, "");
      let soma = 0;
      let resto;

      if (cpf.length === 11 && cpf != "00000000000") {
        for (let i = 0; i < 9; i++) {
          soma += parseInt(cpf[i]) * (10 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10) resto = 0;
        if (resto != parseInt(cpf[9])) {
          toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'Digite um CPF válido.' });
          return setClient({ ...client, cpf: '' });
        }

        soma = 0;
        for (let i = 0; i < 10; i++) {
          soma += parseInt(cpf[i]) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10) resto = 0;
        if (resto != parseInt(cpf[10])) {
          toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'Digite um CPF válido.' });
          return setClient({ ...client, cpf: '' });
        }

        return setClient({ ...client, cpf });
      } else {
        toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'Digite um CPF válido.' });
        return setClient({ ...client, cpf: '' });
      }
    }
  }

  function getCEP(e) {
    if (e.target.value.length === 9 && e.target.value !== '') {
      let cep = e.target.value.replace(/-/g, "");
      let url = `https://viacep.com.br/ws/${cep}/json/`;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.logradouro === undefined || cep.length !== 8) {
            throw new Error;
          }
          return setClient({ ...client, cep, street: data.logradouro, neighborhood: data.bairro, city: data.localidade, state: data.uf })
        })
        .catch(() => {
          toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'CEP não encontrado.' })
          return setClient({ ...client, cep: '', street: '', neighborhood: '', city: '', state: '' });
        });
    } else {
      return setClient({ ...client, cep: '', street: '', neighborhood: '', city: '', state: '' });
    }
  }

  function clearForm() {
    setClient({});
  }

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
      ...client,
      createdAt: new Date(),
      creator: user.uid,
    })
      .then(() => {
        toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Cliente adicionado!' });
        return setClient({});
      })
      .catch(() => {
        toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao adicionar o cliente.' });
      });
  }

  function headerTable() {
    return (
      <div className="inputArea">
        <span className="p-float-label">
          <InputText
            value={client.name ?? ''}
            onChange={(e) => setClient({ ...client, name: e.target.value })}
            onBlur={checkName}
            keyfilter={/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g}
            size={40}
            required
          />
          <label>Nome</label>
        </span>
        <span className="p-float-label">
          <Calendar
            dateFormat="dd/mm/yy"
            value={client.birthDate}
            onChange={(e) => setClient({ ...client, birthDate: e.value })}
            readOnlyInput
            minDate={minDate}
            maxDate={maxDate}
          />
          <label>Data de Nascimento</label>
        </span>
        <Button
          label="Adicionar"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
      </div>
    );
  }

  function rowButtons(rowData) {
    return (
      <div className="rowButtons">
        <Button
          type="button"
          icon="pi pi-pencil"
          rounded
          onClick={() => handleEditClient(rowData)}
        />
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-secondary"
          rounded onClick={() => handleDeleteClient(rowData)}
        />
      </div>
    );
  };

  async function handleEditClient(item) {
    setEdit(item);
    setClient(item);
    setVisible(true);
  }

  async function handleDeleteClient(rowData) {
    setConfirmDelete(true);
    setSelectedClient(rowData);
  }

  async function handleConfirmDeleteClient() {
    setConfirmDelete(false);
    const docRef = doc(db, 'clients', selectedClient.id);
    await deleteDoc(docRef)
      .then(() => {
        toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Cliente excluído.' });
      })
      .catch(() => {
        toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao excluir o cliente.' });
      });
    setSelectedClient(null);
  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className='adminContainer'>
      <Toast ref={toast} />
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

      <Dialog header="Cadastro do Cliente" visible={visible} onHide={() => setVisible(false)}
        style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
        <form
          className='dialogBox'
          onSubmit={(e) => handleAddClient(e)}
        >
          <div className='inputBox'>
            <span className="p-float-label">
              <InputText
                value={client.name ?? ''}
                onChange={(e) => setClient({ ...client, name: e.target.value })}
                onBlur={checkName}
                keyfilter={/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g}
                size={40}
                required
              />
              <label>Nome Completo</label>
            </span>
            <span className="p-float-label">
              <Calendar
                dateFormat="dd/mm/yy"
                value={client.birthDate}
                onChange={(e) => setClient({ ...client, birthDate: e.target.value })}
                readOnlyInput
                style={{ width: "8rem" }}
                minDate={minDate}
                maxDate={maxDate}
              />
              <label>Nascimento</label>
            </span>
            <span className="p-float-label">
              <InputMask
                value={client.phone}
                mask='(99) 99999-9999'
                onChange={(e) => setClient({ ...client, phone: e.target.value })}
                size={11}
                required
              />
              <label>Telefone</label>
            </span>
          </div>

          <div className='inputBox'>
            <span className="p-float-label">
              <Dropdown
                value={client.gender}
                onChange={(e) => setClient({ ...client, gender: e.target.value, pronoun: '', optionalGender: '' })}
                options={gender}
                style={{ width: "12rem" }}
              />
              <label>Sexo</label>
            </span>
            <span className="p-float-label">
              <InputMask
                mask="999.999.999-99"
                value={client.cpf}
                onBlur={(e) => validateCPF(e)}
                size={11}
                required
              />
              <label>CPF</label>
            </span>
            <span className="p-float-label">
              <InputMask
                mask="99999-999"
                value={client.cep}
                onBlur={(e) => getCEP(e)}
                size={7} required
              />
              <label>CEP</label>
            </span>
          </div>

          {client.gender === 'Personalizado' && (
            <div className='inputBox'>
              <div className="card flex justify-content-center">
                <span className="p-float-label">
                  <Dropdown
                    value={client.pronoun}
                    onChange={(e) => setClient({ ...client, pronoun: e.target.value })}
                    options={pronouns}
                    required
                    style={{ width: '9rem' }}
                  />
                  <label>Pronome</label>
                </span>
              </div>
              <span className="p-float-label">
                <InputText
                  value={client.optionalGender ?? ''}
                  onChange={(e) => setClient({ ...client, optionalGender: e.target.value })}
                  size={15}
                />
                <label>Gênero (opcional)</label>
              </span>
            </div>
          )
          }

          <div className='inputBox'>
            <span className="p-float-label">
              <InputText
                value={client.street ?? ''}
                size={30}
                readOnly
              />
              <label>Rua</label>
            </span>
            <span className="p-float-label">
              <InputText
                value={client.num ?? ''}
                onChange={(e) => setClient({ ...client, num: e.target.value })}
                size={2}
                keyfilter={'int'}
                required
              />
              <label>Núm.</label>
            </span>
            <span className="p-float-label">
              <InputText
                value={client.compl ?? ''}
                onChange={(e) => setClient({ ...client, compl: e.target.value })}
                size={20}
              />
              <label>Complemento</label>
            </span>
          </div>

          <div className='inputBox'>
            <span className="p-float-label">
              <InputText
                value={client.neighborhood ?? ''}
                readOnly
              />
              <label>Bairro</label>
            </span>
            <span className="p-float-label">
              <InputText
                value={client.city ?? ''}
                readOnly
              />
              <label>Cidade</label>
            </span>
            <span className="p-float-label">
              <InputText
                value={client.state ?? ''}
                size={1}
                readOnly
              />
              <label>UF</label>
            </span>
          </div>

          <div className='inputBox' style={{paddingTop: '3rem'}}>
            <Button
              label="Adicionar"
              icon="pi pi-plus"
            />
            <Button
              type='button'
              label="Limpar Campos"
              icon="pi pi-times"
              className='p-button-danger'
              onClick={clearForm}
            />
          </div>
        </form>
      </Dialog>

      <Divider />

      <div className='clientList'>
        <div className="card">
          <DataTable
            value={clientList}
            dataKey="id"
            filters={filters}
            filterDisplay="row"
            onSelectionChange={(e) => { setSelectedClient(e.value) }}
            globalFilterFields={['name', 'phone', 'state']}
            emptyMessage="Clientes não encontrados."
            header={headerTable()}
            stripedRows
            removableSort
            style={{ width: '100%' }}
          >
            <Column sortable field="name" header="Cliente" filter style={{ maxWidth: '18rem', minWidth: '12rem' }} />
            <Column sortable field="phone" header="Telefone" filter style={{ maxWidth: '13rem', minWidth: '12rem' }} />
            <Column sortable field="state" header="Estado" filter style={{ maxWidth: '9rem', minWidth: '7rem' }} />
            <Column body={rowButtons} />
          </DataTable>
        </div>
      </div>

      <Dialog visible={confirmDelete} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmação" modal onHide={() => setConfirmDelete(false)}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>
            Você tem certeza que deseja excluir esse cliente?
          </span>
          <Button label="Não" icon="pi pi-times" outlined onClick={() => setConfirmDelete(false)} />
          <Button label="Sim" icon="pi pi-check" severity="danger" onClick={() => handleConfirmDeleteClient()} />
        </div>
      </Dialog>

    </div>
  );
};



