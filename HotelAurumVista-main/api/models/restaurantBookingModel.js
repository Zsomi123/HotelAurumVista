const db = require('./db');

const createTableBooking = (data) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO restaurant_bookings SET ?';
    db.query(query, data, (err, result) => {
      if (err) reject(err);
      else resolve(result.insertId);
    });
  });
};

module.exports = { createTableBooking };