import React from 'react';
import './Header.css';
import Logo from '../../components/Logo/Logo';

const Header: React.FC = () => {
  return (
    <header>
      <div className="schedule-button-container">
        <button>Idag</button>
        <button>Imorgon</button>
        <button>Senare</button>
      </div>
      <div className='logo-container'>
        <Logo />
      </div>
      <div className="search-login-container">
        <button>search</button>
        <button>login</button>
      </div>
    </header>
  );
};

export default Header;