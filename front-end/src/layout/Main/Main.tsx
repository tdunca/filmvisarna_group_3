import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Booking from '../../views/pages/Booking/Booking';
import Home from '../../views/pages/Home/Home';
import MovieInfo from '../../views/pages/MovieInfo/MovieInfo';
import './Main.css';

const Main: React.FC = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/movieInfo" element={<MovieInfo />} />
      </Routes>
    </main>
  );
};

export default Main;