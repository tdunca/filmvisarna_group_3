import React from 'react';
import { Link } from 'react-router-dom';

interface MovieProps {
  movie: {
	_id: string;
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
