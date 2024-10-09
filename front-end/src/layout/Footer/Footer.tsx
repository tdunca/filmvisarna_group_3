import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <h1>Cinema Website Footer</h1>
      <div className="site-links">
        <Link to="/about-us">Om oss</Link>
        <Link to="/about-cinemas">Våra biografer</Link>
        <Link to="/contact-us">Kontakta oss</Link>
      </div>
      <div className="opening-hours"></div>
      <div className="address"></div>
      <div className="logo"></div>
      <div className="copyright"></div>
      <div className="social-media-links"></div>
    </footer>
  );
};

export default Footer;