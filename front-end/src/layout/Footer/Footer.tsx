import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row text-light">
          <div className="col-md-3">
            <h5>Om oss</h5>
            <ul className="footer-omoss">
              <li>
                <Link to="/about-us">Om oss</Link>
              </li>
              <li>
                <Link to="/contact-us">Kontakta oss</Link>
              </li>
              <li>
                <Link to="/about-cinemas">Våra biografer</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
