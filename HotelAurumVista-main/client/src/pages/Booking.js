import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import '../styles/style.css';

function Booking() {
  const [formData, setFormData] = useState({
    user_name: '', user_email: '', phone_number: '', check_in: '', check_out: '',
    guests: '', pay_method: '', room_id: '', special_requests: '', additional_services: ''
  });
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/bookings/rooms')
      .then(response => setRooms(response.data.rooms))
      .catch(error => setMessage('Hiba történt a szobák betöltésekor'));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/bookings', formData);
      setMessage(response.data.success);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Hiba történt');
    }
  };

  return (
    <div className="booking-section mt-5 py-5">
      <div className="container">
        <div className="booking-container">
          <h2 className="text-center">Szobafoglalás</h2>
          <p className="description text-center">
            Foglaljon szobát nálunk, és élvezze a modern komfortot, a nyugodt környezetet és a figyelmes kiszolgálást.
          </p>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Teljes név</label>
                  <input type="text" className="form-control" name="user_name" value={formData.user_name} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Email címe:</label>
                  <input type="email" className="form-control" name="user_email" value={formData.user_email} onChange={handleChange} required />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Telefonszám</label>
              <input type="tel" className="form-control" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Bejelentkezés dátuma:</label>
                  <input type="date" name="check_in" className="form-control" value={formData.check_in} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Kijelentkezés dátuma:</label>
                  <input type="date" name="check_out" className="form-control" value={formData.check_out} onChange={handleChange} required />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Vendégek száma</label>
                  <select className="form-control" name="guests" value={formData.guests} onChange={handleChange} required>
                    <option value="">Válasszon létszámot</option>
                    {[...Array(8)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} fő</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Fizetési mód</label>
                  <select className="form-control" name="pay_method" value={formData.pay_method} onChange={handleChange} required>
                    <option value="">Válasszon fizetési módot</option>
                    <option value="Credit Card">Bank kártya</option>
                    <option value="Bank Transfer">Banki átutalás</option>
                    <option value="Cash">Kézpénz</option>
                    <option value="Paypal">Paypal</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Válasszon szobát:</label>
              <select className="form-control" name="room_id" value={formData.room_id} onChange={handleChange} required>
                <option value="">Válasszon szobát</option>
                {rooms.map(room => (
                  <option key={room.ID} value={room.ID}>{room.name} - {room.price} Ft/éj</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label">Különleges kérés</label>
              <textarea className="form-control" rows="3" name="special_requests" value={formData.special_requests} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="form-label">Egyéb szolgáltatások (opcionális):</label>
              <textarea className="form-control" rows="3" name="additional_services" value={formData.additional_services} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-gold w-100">Szobafoglalás véglegesítése</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking;