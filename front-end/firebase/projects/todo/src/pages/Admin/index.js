import { useState, useEffect } from 'react';

import './style.css';

import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default function Admin() {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState({});
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

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
        alert("Nenhuma alteração foi feita.");
        setTask('');
        setEdit({});
      } else {
        const docRef = doc(db, 'tasks', edit?.id);
        await updateDoc(docRef, {
          task: task,
        })
          .then(() => {
            alert("Tarefa atualizada com sucesso.");
            setTask('');
            setEdit({});
          })
          .catch(() => {
            alert("Erro ao atualizar a tarefa.");
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

  async function handleEditTask(item) {
    setEdit(item);
    setTask(item.task);
  }

  async function handleDeleteTask(id) {
    const docRef = doc(db, 'tasks', id);
    await deleteDoc(docRef)
      .then(() => {
        alert("Tarefa excluída com sucesso.")
      })
      .catch(() => {
        alert("Erro ao excluir tarefa.")
      });
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
          <p>{user.email}</p>
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
        {
          edit?.id ? (
            <div className="editBtnPlace">
              <div
                onClick={() => { setEdit({}); setTask(''); }}
                className='btnCancel'
              >X</div>
              <button type='submit'>Atualizar</button>
            </div>
          ) : (
            <div>
              <button type='submit'>Adicionar</button>
            </div>
          )
        }
      </form>

      <div className='tasksList'>
        {
          taskList?.map((item) => {
            return (
              <div key={item.id} className='task'>
                <span>{item.task}</span>
                <div className='btnHolder'>
                  <button
                    className='btnEdit'
                    onClick={() => { handleEditTask(item) }}
                  >Editar</button>
                  <button
                    className='btnDelete'
                    onClick={() => { handleDeleteTask(item.id) }}
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
