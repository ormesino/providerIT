import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "./style.css"

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem("@primeflix");
    const favoritedMovies = JSON.parse(myList) || [];
    setMovies(favoritedMovies);
  }, []);

  function unfavorite(id) {
    let filteredMovies = movies.filter((movie) => {
      return (movie.id !== id);
    });
    localStorage.setItem("@primeflix", JSON.stringify(filteredMovies));
    setMovies(filteredMovies);
  }

  return (
    <div className='favorites'>
      <h1>Meus filmes favoritos</h1>
      <ul>
        {movies.length === 0 && <span className='warning'>Você não tem nenhum filme favoritado... 🤔</span>}
        {movies.map((movie) => {
          return (
              <li key={movie.id}>
                <span>{movie.title}</span>
                <div>
                  <Link to={`/movie/${movie.id}`}>Ver detalhes</Link>
                  <button onClick={() => unfavorite(movie.id)}>Desfavoritar</button>
                </div>
              </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favorites;