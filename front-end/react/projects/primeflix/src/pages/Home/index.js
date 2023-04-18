import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

import api from '../../services/api';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: 'ae505c79ac6e602726dd10dcae3a0c69',
          language: 'pt-BR',
          page: 1,
        }
      });

      setMovies(response.data.results);
    };

    getMovies();
  }, []);

  return (
    <div className="movieList">
      {movies.map(movie => (
        <Link to={`/movie/${movie.id}`}>
          <article key={movie.id}>
            <h3>{movie.title}</h3>
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
          </article>
        </Link>
      ))}
    </div>
  );
}

export default Home;