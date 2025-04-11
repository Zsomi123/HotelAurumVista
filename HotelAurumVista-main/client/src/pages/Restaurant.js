import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import '../styles/style.css';
import { Link } from 'react-router-dom'; // Add this for navigation

function Restaurant() {
  const [restaurant, setRestaurant] = useState({ menuItems: [] });

  useEffect(() => {
    axios.get('http://localhost:3000/api/restaurant/menu')
      .then(response => {
        setRestaurant(response.data);
      })
      .catch(error => {
        console.error('Hiba az étterem adatok lekérésekor:', error);
      });
  }, []);

  const starters = restaurant.menuItems.filter(item => item.Type === 'Starters');
  const mains = restaurant.menuItems.filter(item => item.Type === 'Mains');
  const desserts = restaurant.menuItems.filter(item => item.Type === 'Desserts');
  const drinks = restaurant.menuItems.filter(item => item.Type === 'Drinks');

  return (
    <div className="restaurant-page">
      <div className="container py-5"> {/* Add padding for better spacing */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="mb-4">Gasztronómiai Élmények</h2>
            <p>
              Éttermünk a modern és hagyományos magyar konyha tökéletes harmóniáját kínálja. Séfünk gondosan válogatott, friss helyi alapanyagokból alkotja meg kifinomult, művészi fogásait, amelyek egyszerre kényeztetik az érzékeket és tisztelegnek a magyar gasztronómiai hagyományok előtt.
            </p>
            <div className="mt-5">
              <h3 className="h4 mb-3">Nyitvatartás</h3>
              <p>
                <strong>Reggeli:</strong> 7:00 - 10:30<br />
                <strong>Ebéd:</strong> 12:00 - 15:00<br />
                <strong>Vacsora:</strong> 18:00 - 22:00<br />
                <em>Hétvégén és ünnepnapokon rugalmasan alkalmazkodunk vendégeink igényeihez.</em>
              </p>
            </div>
            <div className="mt-5">
              <h3 className="h4 mb-3">Asztalfoglalás</h3>
              <p>
                Foglaljon asztalt nálunk, és élvezze a felejthetetlen kulináris élményt!
              </p>
              <Link to="/book-table" className="btn btn-gold">Asztalfoglalás</Link>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src="/images/restaurant.jpg"
              alt="Elegáns étterem belső tér"
              className="img-fluid rounded shadow"
            />
            <p className="mt-2">
              Fedezze fel éttermünk kifinomult hangulatát!
            </p>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <h3 className="mb-4" style={{ color: '#C5B358' }}>Étlapunk</h3>
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card bg-dark mb-4">
                  <div className="card-body">
                    <h4 style={{ color: 'var(--gold)' }}>Előételek</h4>
                    <ul className="list-unstyled">
                      {starters.length > 0 ? (
                        starters.map(item => (
                          <li className="mb-3" key={item.Name}>
                            <div className="d-flex justify-content-between">
                              <span>{item.Name}</span>
                              <span>{item.Price}</span>
                            </div>
                            <div className="description">{item.Description}</div>
                          </li>
                        ))
                      ) : (
                        <li>Nincsenek előételek.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-dark mb-4">
                  <div className="card-body">
                    <h4 style={{ color: 'var(--gold)' }}>Főételek</h4>
                    <ul className="list-unstyled">
                      {mains.length > 0 ? (
                        mains.map(item => (
                          <li className="mb-3" key={item.Name}>
                            <div className="d-flex justify-content-between">
                              <span>{item.Name}</span>
                              <span>{item.Price}</span>
                            </div>
                            <div className="description">{item.Description}</div>
                          </li>
                        ))
                      ) : (
                        <li>Nincsenek főételek.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-dark mb-4">
                  <div className="card-body">
                    <h4 style={{ color: 'var(--gold)' }}>Desszertek</h4>
                    <ul className="list-unstyled">
                      {desserts.length > 0 ? (
                        desserts.map(item => (
                          <li className="mb-3" key={item.Name}>
                            <div className="d-flex justify-content-between">
                              <span>{item.Name}</span>
                              <span>{item.Price}</span>
                            </div>
                            <div className="description">{item.Description}</div>
                          </li>
                        ))
                      ) : (
                        <li>Nincsenek desszertek.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card bg-dark mb-4">
                  <div className="card-body">
                    <h4 style={{ color: 'var(--gold)' }}>Italok</h4>
                    <ul className="list-unstyled">
                      {drinks.length > 0 ? (
                        drinks.map(item => (
                          <li className="mb-3" key={item.Name}>
                            <div className="d-flex justify-content-between">
                              <span>{item.Name}</span>
                              <span>{item.Price}</span>
                            </div>
                            <div className="description">{item.Description}</div>
                          </li>
                        ))
                      ) : (
                        <li>Nincsenek italok.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;