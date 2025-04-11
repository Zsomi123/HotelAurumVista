const db = require('../models/db');

const getContact = (req, res) => {
  const contactData = {
    address: '1234 Budapest, Példa utca 1.',
    phone: '+36 1 234 5678',
    email: 'info@hotelAurumvista.com'
  };
  res.status(200).json(contactData);
};

const createContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Minden mező kitöltése kötelező!' });
  }

  try {
    await db.query('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
    res.status(201).json({ message: 'Üzenet sikeresen elküldve!' });
  } catch (err) {
    console.error('Hiba az üzenet mentésekor:', err);
    res.status(500).json({ error: 'Hiba történt az üzenet küldésekor' });
  }
};

module.exports = { getContact, createContactMessage };