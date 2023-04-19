import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './style.css';

import api from '../../services/api';

function Movie() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: 'ae505c79ac6e602726dd10dcae3a0c69',
          language: 'pt-BR'
        }
      })
        .then((response) => {
          console.log(response.data);
          setDetails(response.data)
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    loadMovie();
  }, []);

  if (loading) {
    return (
      <h2 className='loading'>
        Carregando os detalhes do filme...
      </h2>
    );
  }

  return (
    <div className="detailCard">
      <div>
        <img src={`https://image.tmdb.org/t/p/original${details.poster_path}`}/>
      </div>
      <div>
        <h2>{details.title}</h2>
        <p>{details.overview}</p>
        <strong>Avaliação: {details.vote_average}/10</strong>
        <p>Gêneros: 
          {}
        </p>
      </div>
    </div>
  );
}

export default Movie;