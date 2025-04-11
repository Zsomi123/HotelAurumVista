import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import '../styles/style.css';

function Index() {
  const [featuredRooms, setFeaturedRooms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/rooms/featured')
      .then(response => {
        setFeaturedRooms(response.data.featuredRooms);
      })
      .catch(error => {
        console.error('Hiba a szobák lekérésekor:', error);
      });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <video autoPlay muted loop id="background-video">
          <source src="/images/hero.mp4" type="video/mp4" />
        </video>
        <div className="container h-100 d-flex align-items-center">
          {/* Itt lehetne egy booking-form komponens, ha később átültetjük */}
        </div>
      </div>

      {/* Szobák szekció */}
      <div id="rooms" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: '#C5B358' }}>Szobáink</h2>
          <div className="row g-4">
            {featuredRooms.map(room => (
              <div className="col-md-4" key={room.ID}>
                <div className="card room-card">
                  <img
                    src={room.image_path}
                    className="card-img-top"
                    alt={room.name}
                    style={{ maxHeight: '400px', maxWidth: '600px' }}
                  />
                  <div className="card-body" style={{ height: '180px' }}>
                    <h5 className="card-title">{room.name}</h5>
                    <p className="card-text" style={{ color: 'black' }}>{room.description}</p>
                    <p className="card-text">
                      <small className="text-muted">{room.formattedPrice} / éj</small>
                    </p>
                    <a href="book" className="btn btn-gold" style={{ marginTop: 'auto', marginBottom: '10px' }}>
                      Foglalás
                    </a>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-md-12 d-flex justify-content-center">
              <a href="/rooms" className="btn btn-gold">További szobáink</a>
            </div>
          </div>
        </div>
      </div>

      {/* Étterem szekció */}
      <div id="restaurant" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 style={{ color: '#fffff' }}>Aurum Vista Étterem</h2>
              <p className="lead">Kulináris élmények a legmagasabb színvonalon</p>
              <p>Éttermünk a modern és klasszikus ízek találkozása, ahol séfjeink a legjobb alapanyagokból készítik el az ételeket.</p>
              <a href="/book-table" className="btn btn-gold">Asztalfoglalás</a>
            </div>
            <div className="col-md-6">
              <img src="/images/restaurant.jpg" className="img-fluid rounded" alt="Étterem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;