import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Booking from '../../pages/Booking/Booking';
import Home from '../../pages/Home/Home';
import MovieInfo from '../../pages/MovieInfo/MovieInfo';
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