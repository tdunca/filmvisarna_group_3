import React from 'react';
import { Link } from 'react-router-dom';
// import './Footer.css';
import Logo from '../../components/Logo/Logo';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row text-light">
          <div className="col-md-3">
            <h5>Om oss</h5>
            <ul className="list-unstyled">
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

          <div className="col md-3">
            <h5>Öppettider</h5>
            <ul className="list-unstyled">
              <li>Måndag - Torsdag: 08:00 - 01:00</li>
              <li>Fredag - Lördag: 08:00 - 03:00</li>
              <li>Söndag: 10:00 - 01:00</li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5>Adress:</h5>
            <p>Smågatan 5, Småstad</p>
          </div>

          <div className="col-md-3 text-center">
            <h5>Sociala medier</h5>
            <div className="social-media-links">
              <a title="facebook" href="#">
                <i className="bi bi-facebook"></i>
              </a>
              <a title="instagram" href="#">
                <i className="bi bi-instagram"></i>
              </a>
              <a title="twitter" href="#">
                <i className="bi bi-twitter"></i>
              </a>
              <a title="youtube" href="#">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          {/* <div className="row justify-content-center mt-4">
            <div className="col-md-12 text-center">
              <Logo />
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
