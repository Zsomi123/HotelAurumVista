const express = require('express');
// const session = require('express-session');
// const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware beállítások
app.use(express.json());

// Egyszerűsített route a teszteléshez
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test route works' });
});

// Egyéb beállítások és route-ok...

module.exports = app;
