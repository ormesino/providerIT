import { Link } from 'react-router-dom';

import './style.css'

function CardMovie(props) {
  const colorChange = (stars) => {
    if(stars >= 8) {
      return "green";
    } else if (stars >= 6) {
      return "orange";
    } else {
      return "red";
    };
  }

  return (
    <Link className="link" to={`/movie/${props.id}`}>
      <div className="movie">
        <img src={`https://image.tmdb.org/t/p/original${props.poster}`} alt={props.title} />
        <div className="movieInfo">
          <p>{props.title}</p>
          <span className={colorChange(props.stars)}>{props.stars}</span>
        </div>
      </div>
    </Link>
  );
}

export default CardMovie;