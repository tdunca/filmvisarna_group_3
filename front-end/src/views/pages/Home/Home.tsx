import React from 'react';
import './Home.css';
import MovieCollectionSection  from '../../..//components/MovieCollectionSection/MovieCollectionSection';

const Home: React.FC = () => {
  return (
    <div>
        <h1>Welcome to the Cinema Website - Home</h1>
        <p>This is the home page</p>
				<section>
					<h2>På bio idag</h2>
				</section>
				<section>
					<h2>Våra filmer</h2>
					<MovieCollectionSection />
				</section>
    </div>
  );
};

export default Home;