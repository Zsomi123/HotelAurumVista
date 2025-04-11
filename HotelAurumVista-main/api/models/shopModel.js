const mysql = require('mysql2');
const db = require('../models/db');

const getShop = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM shop';
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { getShop };
