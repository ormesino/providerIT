import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import './style.css';

import api from '../../services/api';

function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();
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
          setDetails(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate('*', { replace: true });
          return;
        });
    };

    loadMovie();
  }, [navigate, id]);

  function favoriteMovie() {
    const myList = localStorage.getItem("@primeflix");

    let favoritedMovies = JSON.parse(myList) || [];
    const hasMovie = favoritedMovies.some((saved) => saved.id === details.id);

    if (hasMovie) {
      toast.warn("Filme já favoritado. 😥");
      return;
    }

    favoritedMovies.push(details);
    localStorage.setItem("@primeflix", JSON.stringify(favoritedMovies));
    toast.success("Filme favoritado com sucesso! 🎉");
  }

  if (loading) {
    return (
      <h2 className="loading">
        Carregando os detalhes do filme...⏳
      </h2>
    );
  }

  return (
    <div className="movieCard">
      <h1>{details.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`} alt={details.title}/>
      <h3>Sinopse</h3>
      <span>{details.overview}</span>
      <strong>Avaliação: {details.vote_average.toFixed(1)}/10</strong>
      <div className="movieButtons">
        <button onClick={favoriteMovie}>Favoritar</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${details.title} trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Movie;