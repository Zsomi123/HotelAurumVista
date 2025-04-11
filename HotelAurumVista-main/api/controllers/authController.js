const bcrypt = require('bcryptjs');
const db = require('../models/db');

const getRegisterPage = (req, res) => {
  res.status(200).json({ message: 'Regisztrációs oldal betöltése kliensoldalon történik' });
};

const registerUser = (req, res) => {
  const { email, first_name, last_name, phone, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'A két jelszó nem egyezik meg!' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, existingUser) => {
    if (err) {
      console.error('Regisztrációs hiba:', err);
      return res.status(500).json({ error: 'Hiba történt a regisztráció során' });
    }

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Ez az email cím már foglalt!' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Jelszó hash-elési hiba:', err);
        return res.status(500).json({ error: 'Hiba történt a regisztráció során' });
      }

      db.query(
        'INSERT INTO users (email, first_name, last_name, phone_number, password) VALUES (?, ?, ?, ?, ?)',
        [email, first_name, last_name, phone, hashedPassword],
        (err) => {
          if (err) {
            console.error('Regisztrációs hiba:', err);
            return res.status(500).json({ error: 'Hiba történt a regisztráció során' });
          }

          res.status(201).json({ message: 'Sikeres regisztráció!', redirect: '/login' });
        }
      );
    });
  });
};

const getLoginPage = (req, res) => {
  res.status(200).json({ message: 'Bejelentkezési oldal betöltése kliensoldalon történik' });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, users) => {
    if (err) {
      console.error('Bejelentkezési hiba:', err);
      return res.status(500).json({ error: 'Hiba történt a bejelentkezés során' });
    }

    if (users.length === 0) {
      return res.status(401).json({ error: 'Hibás email vagy jelszó!' });
    }

    const user = users[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Jelszó ellenőrzési hiba:', err);
        return res.status(500).json({ error: 'Hiba történt a bejelentkezés során' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Hibás email vagy jelszó!' });
      }

      req.session.user = { 
        id: user.ID, 
        email: user.email, 
        first_name: user.first_name, 
        membership_level: user.membership_level // Rang hozzáadása
      };

      res.status(200).json({
        message: 'Sikeres bejelentkezés!',
        redirect: '/dashboard',
        user: { 
          id: user.ID, 
          email: user.email, 
          first_name: user.first_name, 
          membership_level: user.membership_level 
        }
      });
    });
  });
};

module.exports = { getRegisterPage, registerUser, getLoginPage, loginUser };