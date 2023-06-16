import { useEffect, useState } from 'react';
import './style.css';

import api from '../../services/api';

import CardMovie from '../../components/CardMovie';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: 'ae505c79ac6e602726dd10dcae3a0c69',
          language: 'pt-BR',
          page: 1
        }
      });

      setMovies(response.data.results);
      setLoading(false);
    };

    getMovies();
  }, []);

  if (loading) {
    return (
      <h2 className='loading'>
        Carregando os filmes...⏳
      </h2>
    );
  }

  return (
    <div className="list">
      {movies.length > 0 && movies.map(movie => {
        return (
          <CardMovie key={movie.id} id={movie.id} title={movie.title} poster={movie.poster_path} stars={movie.vote_average} />
        );
      })}
    </div>
  );
}

export default Home;