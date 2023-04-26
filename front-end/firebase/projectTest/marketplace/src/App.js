import { useState, useEffect } from 'react';

import { db, auth } from './firebaseConnection';
import { doc, collection, addDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth';

import './App.css';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [idPost, setIdPost] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function reloadPosts() {
      onSnapshot(collection(db, "posts"), (snapshot) => {
        let listReloaded = [];

        snapshot.forEach((doc) => {
          listReloaded.push({
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            author: doc.data().author,
          })
        })

        setPosts(listReloaded);
      })
    }
    
    reloadPosts();
  }, []);

  

  async function registerUser() {
    if (email !== "" && password !== "") {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("Usuário cadastrado com sucesso!");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            alert("E-mail inválido!");
          } else if (error.code === "auth/weak-password") {
            alert("Senha fraca! Tente uma senha mais forte.");
          } else if (error.code === "auth/email-already-in-use") {
            alert("E-mail já cadastrado!");
          }
        })
    } else {
      alert("Preencha todos os campos!");
    }
  }

  async function createPost() {
    if (title !== "" && content !== "" && author !== "") {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        author,
      })
        .then(() => {
          alert("Postagem criada com sucesso!");
          setTitle("");
          setContent("");
          setAuthor("");
        })
        .catch((error) => {
          alert("Não foi possível criar a postagem.");
          console.log(error);
        })
    } else {
      alert("Preencha todos os campos!");
    }
  }

  async function editPost() {
    if (title !== "" && content !== "" && author !== "") {
      const docRef = doc(db, "posts", idPost);
      await updateDoc(docRef, {
        title,
        content,
        author,
      })
        .then(() => {
          alert("Postagem editada com sucesso!");
          setIdPost("");
          setTitle("");
          setContent("");
          setAuthor("");
        })
        .catch((error) => {
          alert("Informe uma ID de postagem válida!");
          console.log(error);
        });
    } else {
      alert("Preencha todos os campos!");
    }
  }

  async function getPosts() {
    const postRef = collection(db, "posts");
    await getDocs(postRef)
      .then((snapshot) => {
        let list = [];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            author: doc.data().author,
          })
        })

        setPosts(list);
      })
      .catch((error => {
        alert("Houve algum erro ao requisitar as postagens...")
        console.log(error);
      }));
  }

  async function deletePost(id) {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef)
      .then(() => {
        alert("Postagem deletada com sucesso!");
      })
      .catch((error) => {
        alert("Não foi possível deletar a postagem.");
        console.log(error);
      });
  }

  return (
    <div>
      <div className='container'>
        <div>
          <label>
            E-mail:
          </label>
          <input
            value={email}
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Informe seu e-mail'
          />
        </div>
        <div>
          <label>
            Senha:
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
        </div>
        <div className='buttonHolder'>
          <button>Entrar</button>
          <button onClick={registerUser}>Cadastrar</button>
        </div>
      </div>

      <div className="container">
        <p className="title">Criação de Postagem</p>
        <input
          size={30}
          type="text"
          placeholder="ID da Postagem"
          value={idPost}
          onChange={(e) => { setIdPost(e.target.value) }}
        />
        <input
          size={50}
          type="text"
          placeholder="Título da Postagem"
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        />
        <textarea
          placeholder="Conteúdo..."
          value={content}
          onChange={(e) => { setContent(e.target.value) }}
        />
        <input
          type="text"
          placeholder="Autor(a)"
          value={author}
          onChange={(e) => { setAuthor(e.target.value) }}
        />
        <div className='buttonHolder'>
          <button onClick={createPost}>Criar Postagem</button>
          <button onClick={editPost}>Editar Postagem</button>
          <button onClick={getPosts}>Recarregar Postagens</button>
        </div>
      </div>

      {posts.length > 0 &&
        <div className='lista'>
          {posts.map((post) => {
            return (
              <div key={post.id} className='post'>
                <div>
                  <p>ID: {post.id}</p>
                  <h1>{post.title}</h1>
                  <p>{post.content}</p>
                  <strong>{post.author}</strong>
                </div>
                <button onClick={() => deletePost(post.id)}>Deletar</button>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}

export default App;