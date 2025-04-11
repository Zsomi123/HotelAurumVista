import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import '../styles/style.css';

function Contact() {
  const [contact, setContact] = useState({
    address: 'Budapest, Dembinszky u. 29, 1071',
    phone: '+36 1 555 7890',
    email: 'info@luxushotel.hu'
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/contact')
      .then(response => {
        setContact(response.data);
      })
      .catch(error => {
        console.error('Hiba a kapcsolat adatok lekérésekor:', error);
      });
  }, []);

  return (
    <div className="contact-page">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="mb-4">Kapcsolat</h2>
            <p>
              Szállodánk a város szívében található, könnyen megközelíthető helyen. Bármilyen kérdése, kérése van, forduljon hozzánk bizalommal az alábbi elérhetőségeken, vagy látogasson el hozzánk személyesen.
            </p>
            
            <div className="mt-5">
              <h3 className="h4 mb-3">Elérhetőségeink</h3>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <strong>Cím:</strong> {contact.address}
                </li>
                <li className="mb-3">
                  <strong>Telefon:</strong> {contact.phone}
                </li>
                <li className="mb-3">
                  <strong>Email:</strong> {contact.email}
                </li>
              </ul>
            </div>
            
            <div className="mt-5">
              <h3 className="h4 mb-3">Nyitvatartás</h3>
              <p>
                <strong>Recepció:</strong> 0-24 óra, minden nap<br />
                <strong>Étterem:</strong> 7:00 - 23:00, minden nap<br />
                <strong>Wellness részleg:</strong> 8:00 - 21:00, minden nap<br />
                <strong>Szobaszerviz:</strong> 0-24 óra, minden nap<br />
                <em>Ünnepnapokon is teljes körű szolgáltatással várjuk vendégeinket.</em>
              </p>
            </div>
          </div>
          
          <div className="col-md-6">
            <img
              src="/images/hotel-reception.png"
              alt="Szálloda recepció"
              className="img-fluid rounded shadow mb-4"
            />
            <p className="mt-2">
              Elegáns szállodánk, ahol munkatársaink készséggel állnak rendelkezésére.
            </p>
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col-12">
            <h3 className="mb-4" style={{ color: '#C5B358' }}>Megközelítés</h3>
            
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card bg-dark mb-4">
                  <div className="card-body">
                    <h4 style={{ color: 'var(--gold)' }}>Tömegközlekedéssel</h4>
                    <ul className="list-unstyled">
                      <li className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>2-es metró</span>
                          <span>5 perc séta</span>
                        </div>
                        <div className="description">Keleti pályaudvar megálló, onnan rövid sétával elérhető szállodánk</div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>74-es trolibusz</span>
                          <span>1 perc séta</span>
                        </div>
                        <div className="description">Dembinszky utca megálló, közvetlenül a szálloda előtt</div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>7-es busz</span>
                          <span>3 perc séta</span>
                        </div>
                        <div className="description">Rottenbiller utca megálló, rövid sétával elérhető</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card bg-dark mb-4">
                  <div className="card-body">
                    <h4 style={{ color: 'var(--gold)' }}>Autóval és egyéb módon</h4>
                    <ul className="list-unstyled">
                      <li className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>Parkolás</span>
                          <span>4.000 Ft/nap</span>
                        </div>
                        <div className="description">Vendégeink számára mélygarázst biztosítunk a szálloda alatt</div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>Reptéri transzfer</span>
                          <span>12.000 Ft/út</span>
                        </div>
                        <div className="description">A Liszt Ferenc Nemzetközi Repülőtérről transzfert biztosítunk előzetes egyeztetés alapján</div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>Taxi</span>
                          <span>~3.000 Ft</span>
                        </div>
                        <div className="description">A belvárosból rövid taxiúttal elérhető szállodánk, recepciónk szívesen rendel taxit</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="col-12">
            <div className="card bg-dark">
              <div className="card-body">
                <h4 style={{ color: 'var(--gold)' }}>Térképen</h4>
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1009.8454435213646!2d19.084231086098995!3d47.49062478930785!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc3ff4187591%3A0x53b972bd1dc5e44b!2sOltalom%20Karitat%C3%ADv%20Egyes%C3%BClet!5e0!3m2!1shu!2shu!4v1744141111639!5m2!1shu!2shu"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="mt-3"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
