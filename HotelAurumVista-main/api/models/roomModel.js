const mysql = require('mysql2');
const db = require('../models/db');

const getRooms = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM rooms';
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        const formattedResults = results.map(room => {
          room.formattedPrice = formatPrice(room.price);
          return room;
        });
        resolve(formattedResults);
      }
    });
  });
};

const getRoomById = (roomId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM rooms WHERE ID = ?';
    db.query(query, [roomId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const getAvailableRooms = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT DISTINCT r.* FROM rooms r JOIN rooms_data rd ON r.ID = rd.Room_type WHERE rd.Room_status = true';
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        const formattedResults = results.map(room => {
          room.formattedPrice = formatPrice(room.price);
          return room;
        });
        resolve(formattedResults);
      }
    });
  });
};

const formatPrice = (price) => {
  return price.toLocaleString('hu-HU') + ' Ft';
};

module.exports = { getRooms, getRoomById, getAvailableRooms  };
