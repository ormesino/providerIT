import { useState, useEffect, useRef } from 'react';

import './style.css';
import 'primeicons/primeicons.css';
import Logo from '../../assets/logo.png';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';

import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default function Admin() {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState({});
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const toast = useRef(null);

  useEffect(() => {
    async function loadTasks() {
      const userDetail = localStorage.getItem('@detailUser');
      setUser(JSON.parse(userDetail));

      if (user) {
        const data = JSON.parse(userDetail);
        const taskRef = collection(db, 'tasks');
        const q = query(taskRef, orderBy('created', 'desc'), where("userUid", "==", data.uid));

        onSnapshot(q, (snapshot) => {
          let tasks = [];
          snapshot.forEach((doc) => {
            tasks.push({
              id: doc.id,
              task: doc.data().task,
              complete: doc.data().complete,
            });
          });
          setTaskList(tasks);
        });
      }
    }

    loadTasks();
  }, []);

  async function handleAddTask(e) {
    e.preventDefault();

    if (edit?.id) {
      if (edit.task === task) {
        toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'Você não alterou a tarefa.' });
        setTask('');
        setEdit({});
      } else {
        const docRef = doc(db, 'tasks', edit?.id);
        await updateDoc(docRef, {
          task: task,
        })
          .then(() => {
            toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Tarefa atualizada!' });
            setTask('');
            setEdit({});
          })
          .catch(() => {
            toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao atualizar tarefa.' });
            setTask('');
            setEdit({});
          })
      }
      return;
    }

    if (task !== '') {
      await addDoc(collection(db, 'tasks'), {
        task: task,
        complete: false,
        created: new Date(),
        userUid: user?.uid,
      })
        .then(() => {
          toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Tarefa adicionada!' });
          setTask('');
        })
        .catch((error) => {
          toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao adicionar tarefa.' });
        });
    } else {
      toast.current.show({ severity: 'warn', summary: 'Atenção!', detail: 'Informe o nome da tarefa.' });
    }
  }

  async function handleEditTask(item) {
    setEdit(item);
    setTask(item.task);
  }

  async function handleDeleteTask(id) {
    const docRef = doc(db, 'tasks', id);
    await deleteDoc(docRef)
      .then(() => {
        toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Tarefa excluída.' });
      })
      .catch(() => {
        toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao excluir tarefa.' });
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
          <p>{user.email}</p>
          <Button
            icon="pi pi-sign-out"
            className='p-button-danger'
            onClick={handleLogout}
          />  
        </div>
      </div>
      <form
        className='taskInput'
        onSubmit={handleAddTask}
      >
        <Toast ref={toast} />
        {
          edit?.id ? (
            <div className="p-inputgroup flex-1">
              <InputText
                placeholder="Informe o nome da tarefa"
                onChange={(e) => setTask(e.target.value)}
                value={task}
              />
              <Button
                icon="pi pi-times"
                className="p-button-danger"
                onClick={() => { setEdit({}); setTask(''); }}
              />
              <Button
                icon="pi pi-check"
              />
            </div>
          ) : (
            <div className="p-inputgroup flex-1">
              <InputText
                placeholder="Informe o nome da tarefa"
                onChange={(e) => setTask(e.target.value)}
                value={task}
              />
              <Button
                icon="pi pi-plus"
              />
            </div>
          )
        }
      </form>

      <Divider />

      <div className='tasksList'>
        <Toast ref={toast} />
        {
          taskList?.map((item) => {
            return (
              <div key={item.id} className='task'>
                <span>{item.task}</span>
                <div className='btnContainer'>
                  <Button
                    onClick={() => { handleEditTask(item) }}
                    icon="pi pi-pencil"
                    rounded
                    text
                  />
                  <Button
                    className='p-button-danger'
                    onClick={() => { handleDeleteTask(item.id) }}
                    icon="pi pi-trash"
                    rounded
                  />
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};
