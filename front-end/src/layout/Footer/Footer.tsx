import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <h1>Cinema Website Footer</h1>
      <div className="site-links"></div>
      <div className="opening-hours"></div>
      <div className="address"></div>
      <div className="logo"></div>
      <div className="copyright"></div>
      <div className="social-media-links"></div>
    </footer>
  );
};

export default Footer;