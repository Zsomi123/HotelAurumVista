const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'szalloda',
  port: 3306,
});


db.connect((err) => {
    if (err) {
        console.error('Hiba történt a MySQL kapcsolódáskor: ' + err.stack);
        return;
    }
    console.log('Adatbázis csatlakozás sikeres!');
});

module.exports = db;
