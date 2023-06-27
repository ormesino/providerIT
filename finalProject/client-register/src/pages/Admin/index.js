import { useEffect, useRef, useState } from 'react';

import Logo from '../../assets/logo.svg';
import './style.css';

import 'primeicons/primeicons.css';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

import api from '../../services/api';

import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';

export default function Admin() {
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [edit, setEdit] = useState({});
  const [deletedClient, setDeletedClient] = useState(null);
  const [selectedClient, setSelectedClient] = useState({});
  const [client, setClient] = useState({});
  const [clientList, setClientList] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState(null);
  const baseURL = "http://localhost:8080/clients/";

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      phone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      birthDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      strDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      state: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    setGlobalFilterValue('');
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

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

  async function loadClients() {
    const response = await api.get(baseURL);
    setClientList(response.data);
  }

  useEffect(() => {
    initFilters();
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

      if (cpf.length === 11 && cpf !== "00000000000") {
        for (let i = 0; i < 9; i++) {
          soma += parseInt(cpf[i]) * (10 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10) resto = 0;
        if (resto !== parseInt(cpf[9])) {
          toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'Digite um CPF válido.' });
          return setClient({ ...client, cpf: '' });
        }

        soma = 0;
        for (let i = 0; i < 10; i++) {
          soma += parseInt(cpf[i]) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10) resto = 0;
        if (resto !== parseInt(cpf[10])) {
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
            throw new Error();
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

  const formatDate = (value) => {
    return value;
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.strDate);
  };

  const dateFilterTemplate = (options) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" mask="99/99/9999" />;
  };

  function clearForm() {
    setClient({});
  }

  async function handleAddClient(e) {
    e.preventDefault();

    if (edit?.id) {
      if (edit.client === client) {
        toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'Você não modificou os dados do cliente.' });
        setClient({});
        setEdit({});
      } else {
        await api.put(`/${edit.id}`, {
          ...client,
        })
          .then(() => {
            toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Dados do cliente atualizados!' });

            setEdit({});
            setClient({});
            loadClients();
          })
          .catch((error) => {
            toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao atualizar os dados do cliente.' });

            setEdit({});
            setClient({});
            loadClients();
          })
      }
      return;
    }

    await api.post("", {
      ...client,
    })
      .then(() => {
        toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Cliente adicionado!' });
        return setClient({});
      })
      .catch(() => {
        toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao adicionar o cliente.' });
      });
  }

  const clearFilter = () => {
    initFilters();
  };

  function headerTable() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3>Lista de Clientes</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Button type="button" icon="pi pi-filter-slash" label="Limpar Filtros" onClick={clearFilter} style={{ padding: '16px' }} />
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText value={globalFilterValue} size={24} onChange={onGlobalFilterChange} placeholder="Procurar por palavra-chave" />
          </span>
        </div>
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
    setEdit({ ...item });
    setClient({ ...item });
    setVisible(true);
  }

  async function handleDeleteClient(rowData) {
    setConfirmDelete(true);
    setDeletedClient(rowData);
  }

  async function handleConfirmDeleteClient() {
    setConfirmDelete(false);
    await api.delete(`/${deletedClient.id}`)
      .then(() => {
        toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Cliente excluído.' });
      })
      .catch(() => {
        toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao excluir o cliente.' });
      });

    loadClients();
    setDeletedClient(null);
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

      <div className="inputArea">
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span className="p-float-label">
            <InputText
              value={selectedClient.name || ''}
              size={40}
              disabled
              required
            />
            <label>Nome</label>
          </span>
          <span className="p-float-label">
            <Calendar
              dateFormat="dd/mm/yy"
              value={new Date(selectedClient.birthDate)}
              readOnlyInput
              disabled
            />
            <label>Data de Nascimento</label>
          </span>
        </div>

        <Button
          label="Cadastrar Cliente"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
          style={{ padding: '16px' }}
        />
      </div>

      <Dialog header="Cadastro do Cliente" visible={visible} onHide={() => {
        setVisible(false)
        setEdit({})
      }
      }
        style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
        <form
          className='dialogBox'
          onSubmit={(e) => {
            handleAddClient(e)
            setVisible(false)
          }}
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
                value={new Date(client.birthDate)}
                onChange={(e) => {
                  setClient({ ...client, birthDate: e.value.getTime(), strDate: e.value.toLocaleDateString('en-GB') })
                }}
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

          <div className='inputBox' style={{ paddingTop: '3rem' }}>
            {
              edit?.id ? (
                <Button
                  type='submit'
                  label="Atualizar"
                  icon="pi pi-check"
                />
              ) : (
                <Button
                  type='submit'
                  label="Cadastrar"
                  icon="pi pi-plus"
                />
              )
            }
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
            onSelectionChange={(e) => { setSelectedClient(e.value) }}
            selection={true}
            selectionMode='single'
            globalFilterFields={['name', 'phone', 'state']}
            emptyMessage="Clientes não encontrados."
            header={headerTable}
            stripedRows
            filterDisplay="menu"
            removableSort
            style={{ width: '100%' }}
          >
            <Column sortable field="name" header="Cliente" filter style={{ minWidth: '20rem' }} />
            <Column sortable field="strDate" header="Nascimento" filterField='strDate' dataType="date" body={dateBodyTemplate} filter filterElement={dateFilterTemplate} style={{ minWidth: '5rem' }} />
            <Column sortable field="phone" header="Telefone" filter style={{ minWidth: '5rem' }} />
            <Column sortable field="state" header="Estado" filter />
            <Column body={rowButtons} />
          </DataTable>
        </div>
      </div>

      <Dialog visible={confirmDelete} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmação" modal onHide={() => setConfirmDelete(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span>
            Você tem certeza que deseja excluir esse cliente?
          </span>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', margin: '1rem 0 0 0' }}>
            <Button label="Não" icon="pi pi-times" outlined onClick={() => setConfirmDelete(false)} />
            <Button label="Sim" icon="pi pi-check" severity="danger" onClick={() => handleConfirmDeleteClient()} />
          </div>
        </div>
      </Dialog>

    </div>
  );
};