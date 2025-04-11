// client/src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/variables.css';
import '../styles/style.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 style={{ color: '#C5B358' }}>Hotel Aurum Vista</h5>
            <p>Luxus és kényelem a város szívében</p>
          </div>
          <div className="col-md-4">
            <h5 style={{ color: '#C5B358' }}>Gyorslinkek</h5>
            <ul className="list-unstyled">
              <li><Link to="/rooms" style={{ color: 'white', textDecoration: 'none' }}>Szobák</Link></li>
              <li><Link to="/restaurant" style={{ color: 'white', textDecoration: 'none' }}>Étterem</Link></li>
              <li><Link to="/wellness" style={{ color: 'white', textDecoration: 'none' }}>Wellness</Link></li>
              <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Kapcsolat</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 style={{ color: '#C5B358' }}>Kövessen minket:</h5>
            <div className="social-icons">
              <a href="https://facebook.com/AurumVista" className="me-3" style={{ color: '#C5B358', textDecoration: 'none' }}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com/AurumVista" className="me-3" style={{ color: '#C5B358', textDecoration: 'none' }}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com/AurumVista" style={{ color: '#C5B358', textDecoration: 'none' }}>
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;