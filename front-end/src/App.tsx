import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Footer from './layout/Footer/Footer'
import Header from './layout/Header/Header'
import Main from './layout/Main/Main'

const App: React.FC = () => {

  return (
    <div className='app'>
      <Router>
        <Header />
        <Main />
        <Footer />
      </Router>
    </div>
  );
};

export default App
