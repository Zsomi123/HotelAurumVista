import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import Restaurant from './pages/Restaurant';
import Wellness from './pages/Wellness';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import BookTable from './pages/BookTable';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Routes>
        {/* Normál oldalak Header-rel és Footer-rel */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/restaurant" element={<Restaurant />} />
                <Route path="/wellness" element={<Wellness />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/book" element={<Booking />} />
                <Route path="/book-table" element={<BookTable />} />
              </Routes>
              <Footer />
            </>
          }
        />
        {/* Admin oldal Header és Footer nélkül */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;