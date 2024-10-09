import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Cinema Website - Home</h1>
      <p>This is the home page</p>
      <div className="movie-item-test">
        <Link to="/movie-info">
          MovieObject
        </Link>
      </div>
    </div>
  );
};

export default Home;