import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import '../styles/style.css';

function BookTable() {
  const [formData, setFormData] = useState({
    name: '', phone_number: '', date: '', time: '', guests: '', special_requests: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/restaurant/bookings', formData);
      setMessage(response.data.success);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Hiba történt');
    }
  };

  return (
    <div className="booking-section mt-5 py-5">
      <div className="container">
        <div className="booking-container">
          <h2 className="text-center">Asztalfoglalás</h2>
          <p className="description text-center">
            Foglalja le asztalát exkluzív éttermünkbe, ahol a kulináris élmények és a kifinomult környezet találkozik
          </p>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Az Ön neve</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Telefonszám</label>
                  <input type="tel" className="form-control" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Dátum</label>
                  <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Időpont</label>
                  <select className="form-control" name="time" value={formData.time} onChange={handleChange} required>
                    <option value="">Válasszon időpontot</option>
                    {['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Vendégek száma</label>
              <select className="form-control" name="guests" value={formData.guests} onChange={handleChange} required>
                <option value="">Válasszon létszámot</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} fő</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label">Különleges kérés</label>
              <textarea className="form-control" rows="3" name="special_requests" value={formData.special_requests} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-gold w-100">Asztalfoglalás véglegesítése</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookTable;