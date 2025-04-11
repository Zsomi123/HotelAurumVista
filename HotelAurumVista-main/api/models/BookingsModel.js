const mysql = require('mysql2');
const db = require('./db');

const getActiveBookingsForUser = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT b.*, r.name as roomName 
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      WHERE b.user_id = ? AND b.booking_status = 'Active'
      ORDER BY b.check_in_date ASC`;
    
    db.query(query, [userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const getBookingHistoryForUser = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT b.*, r.name as roomName 
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      WHERE b.user_id = ? AND b.booking_status = 'Completed'
      ORDER BY b.check_out_date DESC`;
    
    db.query(query, [userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { getActiveBookingsForUser, getBookingHistoryForUser };