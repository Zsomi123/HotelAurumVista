import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import '../styles/style.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', formData, { withCredentials: true });
      if (response.data.message) {
        alert(response.data.message);
        navigate(response.data.redirect || '/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Hiba történt a bejelentkezés során');
    }
  };

  return (
    <div className="hero-section" style={{ backgroundImage: "url('/images/rooms.jpg')" }}>
      <div className="container d-flex align-items-center justify-content-center" style={{ height: '90vh' }}>
        <div className="row justify-content-center w-100">
          <div className="col-md-6">
            <div className="card bg-dark p-5">
              <h2 className="text-center mb-4" style={{ color: '#C5B358' }}>Bejelentkezés</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email cím"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Jelszó"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-gold w-100">Bejelentkezés</button>
                <p className="text-center mt-3" style={{ color: '#C5B358' }}>
                  Nincs fiókod? <a href="/register" style={{ color: 'white' }}>Regisztrálj</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;