import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import '../styles/style.css';

function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/rooms')
      .then(response => {
        setRooms(response.data.rooms);
      })
      .catch(error => {
        console.error('Hiba a szobák lekérésekor:', error);
      });
  }, []);

  return (
    <div className="py-5">
      <div className="container">
        <h2 className="text-center mb-5" style={{ color: '#C5B358' }}>Szobáink</h2>
        {rooms.length === 0 ? (
          <p className="text-center">Nincsenek elérhető szobák.</p>
        ) : (
          <div className="row g-4">
            {rooms.map(room => (
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
                    <p className="card-text">{room.description}</p>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Rooms;