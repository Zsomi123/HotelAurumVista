import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import '../styles/style.css';

function Wellness() {
  const [wellness, setWellness] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/wellness')
      .then((response) => {
        setWellness(response.data);
      })
      .catch((error) => {
        console.error('Hiba a wellness adatok lekérésekor:', error);
      });
  }, []);

  return (
    <div className="wellness-page">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="mb-4">{wellness.title}</h2>
            <p>{wellness.description}</p>
            <p>{wellness.details}</p>

            {/* Opening Hours */}
            {wellness.openingHours && (
              <div className="mt-5">
                <h3 className="h4 mb-3">Nyitvatartás</h3>
                <p>
                  <strong>Hétköznap:</strong> {wellness.openingHours.weekdays}<br />
                  <strong>Hétvége:</strong> {wellness.openingHours.weekends}
                </p>
              </div>
            )}

            {/* Pricing */}
            {wellness.pricing && (
              <div className="mt-5">
                <h3 className="h4 mb-3">Áraink</h3>
                <p><strong>Felnőtt napi belépő:</strong> {wellness.pricing.adult}</p>
                <p><strong>Diák napi belépő:</strong> {wellness.pricing.student}</p>
                <p><strong>Nyugdíjas napi belépő:</strong> {wellness.pricing.retiree}</p>
                <p><strong>Masszázs:</strong> {wellness.pricing.massage}</p>
              </div>
            )}
          </div>

          <div className="col-md-6">
            <img
              src={wellness.image}
              alt="Wellness élmény"
              className="img-fluid rounded shadow"
            />
            <p className="mt-2">Lazuljon el gyönyörű környezetben!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wellness;
