import React from 'react';
import './Header.css';
import Logo from '../../components/Logo/Logo';

const Header: React.FC = () => {
  return (
    <header>
      <h1>Cinema Website Header</h1>
      <Logo />
    </header>
  );
};

export default Header;