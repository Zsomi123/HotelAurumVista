import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [rooms, setRooms] = useState([]);
  const [menu, setMenu] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [restaurantBookings, setRestaurantBookings] = useState([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [editModal, setEditModal] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/dashboard', { withCredentials: true });
      setIsAdmin(true);
      setStats(response.data);
      fetchRooms();
      fetchMenu();
      fetchBookings();
      fetchRestaurantBookings();
    } catch (error) {
      setIsAdmin(false);
      navigate('/login');
    }
  };

  const fetchRooms = async () => {
    const response = await axios.get('http://localhost:3000/api/admin/rooms', { withCredentials: true });
    setRooms(response.data);
  };

  const fetchMenu = async () => {
    const response = await axios.get('http://localhost:3000/api/admin/menu', { withCredentials: true });
    setMenu(response.data);
  };

  const fetchBookings = async () => {
    const response = await axios.get('http://localhost:3000/api/admin/bookings', { withCredentials: true });
    setBookings(response.data);
  };

  const fetchRestaurantBookings = async () => {
    const response = await axios.get('http://localhost:3000/api/admin/restaurant-bookings', { withCredentials: true });
    setRestaurantBookings(response.data);
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await axios.post('http://localhost:3000/api/admin/rooms', {
      roomNumber: formData.get('roomNumber'),
      roomType: formData.get('roomType'),
      price: formData.get('price'),
    }, { withCredentials: true });
    fetchRooms();
  };

  const handleEditRoom = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await axios.put('http://localhost:3000/api/admin/rooms', {
      roomNumber: editModal.Room_number,
      roomType: formData.get('roomType'),
      price: formData.get('price'),
      status: formData.get('status'),
    }, { withCredentials: true });
    setEditModal(null);
    fetchRooms();
  };

  const handleDeleteRoom = async (roomNumber) => {
    await axios.delete(`http://localhost:3000/api/admin/rooms/${roomNumber}`, { withCredentials: true });
    fetchRooms();
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await axios.post('http://localhost:3000/api/admin/menu', {
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      type: formData.get('type'),
    }, { withCredentials: true });
    fetchMenu();
  };

  const handleEditMenuItem = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await axios.put('http://localhost:3000/api/admin/menu', {
      id: editModal.ID,
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      type: formData.get('type'),
    }, { withCredentials: true });
    setEditModal(null);
    fetchMenu();
  };

  const handleDeleteMenuItem = async (id) => {
    await axios.delete(`http://localhost:3000/api/admin/menu/${id}`, { withCredentials: true });
    fetchMenu();
  };

  const handleDeleteBooking = async (id) => {
    await axios.delete(`http://localhost:3000/api/admin/bookings/${id}`, { withCredentials: true });
    fetchBookings();
  };

  const handleEditRestaurantBooking = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await axios.put('http://localhost:3000/api/admin/restaurant-bookings', {
      id: editModal.ID,
      name: formData.get('name'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      time: formData.get('time'),
      guests: formData.get('guests'),
      specialRequests: formData.get('specialRequests'),
    }, { withCredentials: true });
    setEditModal(null);
    fetchRestaurantBookings();
  };

  const handleDeleteRestaurantBooking = async (id) => {
    await axios.delete(`http://localhost:3000/api/admin/restaurant-bookings/${id}`, { withCredentials: true });
    fetchRestaurantBookings();
  };

  if (!isAdmin) {
    return <div>Átirányítás a bejelentkezéshez...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <nav className="nav flex-column">
          <button className={`nav-link ${activeSection === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveSection('dashboard')}>
            Áttekintés
          </button>
          <button className={`nav-link ${activeSection === 'rooms' ? 'active' : ''}`} onClick={() => setActiveSection('rooms')}>
            Szobák kezelése
          </button>
          <button className={`nav-link ${activeSection === 'menu' ? 'active' : ''}`} onClick={() => setActiveSection('menu')}>
            Étlap kezelése
          </button>
          <button className={`nav-link ${activeSection === 'bookings' ? 'active' : ''}`} onClick={() => setActiveSection('bookings')}>
            Foglalások
          </button>
          <button className={`nav-link ${activeSection === 'restaurant' ? 'active' : ''}`} onClick={() => setActiveSection('restaurant')}>
            Éttermi foglalások
          </button>
          <button className="nav-link" onClick={() => window.location.href = '/login'}>
            Kijelentkezés
          </button>
        </nav>
      </div>

      <div className="main-content">
        {activeSection === 'dashboard' && (
          <div>
            <h2>Üdvözöljük az admin felületen!</h2>
            <div className="row">
              <div className="col-md-3"><div className="dashboard-card"><h3>{stats.occupiedRooms}</h3><p>Foglalt szoba</p></div></div>
              <div className="col-md-3"><div className="dashboard-card"><h3>{stats.todayArrivals}</h3><p>Mai érkezés</p></div></div>
              <div className="col-md-3"><div className="dashboard-card"><h3>{stats.restaurantBookings}</h3><p>Asztalfoglalás</p></div></div>
              <div className="col-md-3"><div className="dashboard-card"><h3>{(stats.monthlyRevenue / 1000000).toFixed(1)}M</h3><p>Havi bevétel</p></div></div>
            </div>
          </div>
        )}

        {activeSection === 'rooms' && (
          <div>
            <h2>Szobák kezelése</h2>
            <form onSubmit={handleAddRoom}>
              <input name="roomNumber" placeholder="Szoba szám" required />
              <select name="roomType" required>
                <option value="Standard szoba">Standard</option>
                <option value="Superior szoba">Superior</option>
                <option value="Deluxe szoba">Deluxe</option>
                <option value="Luxus Suite">Suite</option>
              </select>
              <input name="price" type="number" placeholder="Ár/éj" required />
              <button type="submit">Új szoba</button>
            </form>
            <div className="dashboard-card">
              <table className="table">
                <thead>
                  <tr>
                    <th>Szoba szám</th>
                    <th>Típus</th>
                    <th>Állapot</th>
                    <th>Ár/éj</th>
                    <th>Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map(room => (
                    <tr key={room.Room_number}>
                      <td>{room.Room_number}</td>
                      <td>{room.name}</td>
                      <td>{room.Room_status}</td>
                      <td>{room.price} Ft</td>
                      <td>
                        <button className="btn btn-sm btn-gold me-2" onClick={() => setEditModal(room)}>Szerkesztés</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteRoom(room.Room_number)}>Törlés</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'menu' && (
          <div>
            <h2>Étlap kezelése</h2>
            <form onSubmit={handleAddMenuItem}>
              <input name="name" placeholder="Név" required />
              <input name="description" placeholder="Leírás" required />
              <input name="price" type="number" placeholder="Ár" required />
              <select name="type" required>
                <option value="Starters">Előételek</option>
                <option value="Mains">Főételek</option>
                <option value="Desserts">Desszertek</option>
                <option value="Drinks">Italok</option>
              </select>
              <button type="submit">Új étel</button>
            </form>
            <div className="dashboard-card">
              <table className="table">
                <thead>
                  <tr>
                    <th>Név</th>
                    <th>Leírás</th>
                    <th>Ár</th>
                    <th>Típus</th>
                    <th>Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {menu.map(item => (
                    <tr key={item.ID}>
                      <td>{item.Name}</td>
                      <td>{item.Description}</td>
                      <td>{item.Price} Ft</td>
                      <td>{item.Type}</td>
                      <td>
                        <button className="btn btn-sm btn-gold me-2" onClick={() => setEditModal(item)}>Szerkesztés</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteMenuItem(item.ID)}>Törlés</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'bookings' && (
          <div>
            <h2>Szobafoglalások</h2>
            <div className="dashboard-card">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Vendég</th>
                    <th>Szoba</th>
                    <th>Érkezés</th>
                    <th>Távozás</th>
                    <th>Státusz</th>
                    <th>Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.booking_id}>
                      <td>{booking.booking_id}</td>
                      <td>{booking.user_name}</td>
                      <td>{booking.room_id}</td>
                      <td>{booking.check_in_date}</td>
                      <td>{booking.check_out_date}</td>
                      <td>{booking.booking_status}</td>
                      <td>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteBooking(booking.booking_id)}>Törlés</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'restaurant' && (
          <div>
            <h2>Éttermi foglalások</h2>
            <div className="dashboard-card">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Név</th>
                    <th>Dátum</th>
                    <th>Időpont</th>
                    <th>Létszám</th>
                    <th>Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurantBookings.map(booking => (
                    <tr key={booking.ID}>
                      <td>{booking.ID}</td>
                      <td>{booking.Name}</td>
                      <td>{booking.Date}</td>
                      <td>{booking.Time}</td>
                      <td>{booking.Guests}</td>
                      <td>
                        <button className="btn btn-sm btn-gold me-2" onClick={() => setEditModal(booking)}>Szerkesztés</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteRestaurantBooking(booking.ID)}>Törlés</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {editModal && (
          <div className="modal">
            <div className="modal-content">
              {editModal.Room_number && (
                <form onSubmit={handleEditRoom}>
                  <h5>Szoba szerkesztése</h5>
                  <input name="roomNumber" defaultValue={editModal.Room_number} disabled />
                  <select name="roomType" defaultValue={editModal.name} required>
                    <option value="Standard szoba">Standard</option>
                    <option value="Superior szoba">Superior</option>
                    <option value="Deluxe szoba">Deluxe</option>
                    <option value="Luxus Suite">Suite</option>
                  </select>
                  <input name="price" type="number" defaultValue={editModal.price} required />
                  <select name="status" defaultValue={editModal.Room_status} required>
                    <option value="Available">Elérhető</option>
                    <option value="Occupied">Foglalt</option>
                    <option value="Cleaning">Takarítás</option>
                    <option value="Maintenance">Karbantartás</option>
                  </select>
                  <button type="submit" className="btn btn-gold">Mentés</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditModal(null)}>Mégse</button>
                </form>
              )}
              {editModal.Name && !editModal.Date && (
                <form onSubmit={handleEditMenuItem}>
                  <h5>Étel szerkesztése</h5>
                  <input name="name" defaultValue={editModal.Name} required />
                  <input name="description" defaultValue={editModal.Description} required />
                  <input name="price" type="number" defaultValue={editModal.Price} required />
                  <select name="type" defaultValue={editModal.Type} required>
                    <option value="Starters">Előételek</option>
                    <option value="Mains">Főételek</option>
                    <option value="Desserts">Desszertek</option>
                    <option value="Drinks">Italok</option>
                  </select>
                  <button type="submit" className="btn btn-gold">Mentés</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditModal(null)}>Mégse</button>
                </form>
              )}
              {editModal.Date && (
                <form onSubmit={handleEditRestaurantBooking}>
                  <h5>Éttermi foglalás szerkesztése</h5>
                  <input name="name" defaultValue={editModal.Name} required />
                  <input name="phone" defaultValue={editModal.Phone} required />
                  <input name="date" type="date" defaultValue={editModal.Date} required />
                  <input name="time" type="time" defaultValue={editModal.Time} required />
                  <input name="guests" type="number" defaultValue={editModal.Guests} required />
                  <input name="specialRequests" defaultValue={editModal.Special_requests} />
                  <button type="submit" className="btn btn-gold">Mentés</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditModal(null)}>Mégse</button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;