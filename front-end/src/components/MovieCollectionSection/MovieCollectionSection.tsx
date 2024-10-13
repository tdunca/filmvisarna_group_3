import React, { useEffect, useState } from 'react';
import MovieComponent from '../MovieComponent/MovieComponent';
import Button from '../MovieComponent/FrontPageButton';

const MovieCollectionSection: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]); // Adjust type based on your Movie model
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterField, setFilterField] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string | null>(null);

  interface Movie {
  id: number;
  genre: string;
  year: number;

}

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movie');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

//    if (loading) return <div>Loading...</div>;
//    if (error) return <div>Error: {error}</div>;

 const handleFilter = (field: string | null, value: string | null) => {
    setFilterField(field);
    setFilterValue(value);
  };

  const filteredMovies = filterField && filterValue
    ? movies.filter((movie) => {
        const fieldValue = movie[filterField as keyof Movie];
        return fieldValue === filterValue;
      })
    : movies;

  return (
    <div>

		<section>
			<Button className="sortingButton" text="Alla Filmer" onClick={() => handleFilter(null, null)} />
        	<Button className="sortingButton" text="Barn & Familj" onClick={() => handleFilter('genre', 'Family')} />
        	<Button className="smallButton" text="Senaste" onClick={() => handleFilter('year', '2024')} />
			<Button className="sortingButton" text="Populärast" onClick={() => handleFilter('genre', 'Classics')} />
			<Button className="sortingButton" text="Klassiker" onClick={() => handleFilter('genre', 'Classics')} />

		{filteredMovies.map((movie) => (
           <MovieComponent key={movie.id} movie={movie} />

        ))}
      </section>
    </div>
  );
};

export default MovieCollectionSection;