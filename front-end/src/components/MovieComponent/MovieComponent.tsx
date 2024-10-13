import React from 'react';
import { Link } from 'react-router-dom';

interface MovieProps {
  movie: {
	id: string; //vi måste lägga till ett id på varje film för att komma till rätt info-page. Title funkar inte pga mellanslag kmr bli strul med react-dom
    title: string;
	poster: string;
	genre: [string];

  };
}

const MovieComponent: React.FC<MovieProps> = ({ movie }) => {
  return (
    <article>
		<Link to={`/movie-info/${movie.id}`}>
			<img>{movie.poster} </img>
			<h2>{movie.title}</h2>
			{movie.genre && <p>{movie.genre}</p>}
		</Link>

    </article>
  );
};

export default MovieComponent;
