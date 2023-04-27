import { useState, useEffect } from 'react';

import './style.css';

import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';

export default function Admin() {
  const [user, setUser] = useState({});
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]); // eslint-disable-line

  useEffect(() => {
    async function loadTasks() {
      const userDetail = localStorage.getItem('@detailUser');
      setUser(JSON.parse(userDetail));

      if (user) {
        const data = JSON.parse(userDetail);
        const taskRef = collection(db, 'tasks');
        const q = query(taskRef, orderBy('created', 'desc'), where("userUid", "==", data.uid));

        const unsub = onSnapshot(q, (snapshot) => {
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
  }, []); // eslint-disable-line

  async function handleAddTask(e) {
    e.preventDefault();

    if (task !== '') {
      await addDoc(collection(db, 'tasks'), {
        task: task,
        complete: false,
        created: new Date(),
        userUid: user?.uid,
      })
        .then(() => {
          alert("Tarefa adicionada com sucesso.")
          setTask('');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Preencha o campo.');
    }
  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className='adminContainer'>
      <h1>ToDo</h1>
      <div className='adminWelcome'>
        <h3>Seja bem-vindo(a)</h3>

        <div className='adminInfo'>
          <p>Nome</p>
          <button
            className='signoutBtn'
            onClick={handleLogout}
          >Sair</button>
        </div>
      </div>
      <form
        className='taskInput'
        onSubmit={handleAddTask}
      >
        <input
          type="text"
          placeholder="Informe o nome da tarefa."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button>Adicionar</button>
      </form>

      <div className='tasksList'>
        {
          taskList?.map((item) => {
            return (
              <div key={item.id} className='task'>
                <span>{item.task}</span>
                <div className='btnHolder'>
                  <button className='btnEdit'>Editar</button>
                  <button
                    className='btnDelete'
                  >Excluir</button>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};
