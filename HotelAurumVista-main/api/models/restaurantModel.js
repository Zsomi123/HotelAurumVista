const mysql = require('mysql2');
const db = require('../models/db');

const getMenu = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM restaurant_menu';
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { getMenu };
