// client/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  // Feltételezzük, hogy a user állapota később egy globális state-ből jön (pl. Redux vagy Context)
  const user = null; // Ideiglenesen null, később autentikációval frissítjük

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/images/logo.png" alt="aurumvista" className="me-2" height="40" />
          <span className="nav-link fw-bold">Hotel Aurum Vista</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/rooms">Szobák</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/restaurant">Étterem</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wellness">Wellness</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Kapcsolat</Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Vezérlőpult</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">Kijelentkezés</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Bejelentkezés</Link>
              </li>
            )}
          </ul>
          <div className="d-flex">
            <Link className="btn btn-outline-gold me-2" to="/book-table">Asztalfoglalás</Link>
            <Link className="btn btn-outline-gold" to="/book">Szobafoglalás</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;