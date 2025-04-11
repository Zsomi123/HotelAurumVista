const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const app = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'naontitkos',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Bejelentkezés szükséges' });
  }
  req.user = req.session.user;
  next();
};

const checkAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.membership_level !== 'Adminisztrátor') {
    return res.status(403).json({ error: 'Csak adminisztrátorok férhetnek hozzá!' });
  }
  next();
};

const roomController = require('./api/controllers/roomController');
const authController = require('./api/controllers/authController');
const restaurantController = require('./api/controllers/restaurantController');
const wellnessController = require('./api/controllers/wellnessController');
const contactController = require('./api/controllers/contactController');
const dashboardController = require('./api/controllers/dashboardController');
const bookingController = require('./api/controllers/bookingController');
const restaurantBookingController = require('./api/controllers/restaurantBookingController');
const shopController = require('./api/controllers/shopController');
const adminController = require('./api/controllers/adminController');

// Admin útvonalak (checkAdmin middleware-rel)
app.get('/api/admin/dashboard', checkAuth, checkAdmin, adminController.getDashboardStats);
app.get('/api/admin/rooms', checkAuth, checkAdmin, adminController.getRooms);
app.post('/api/admin/rooms', checkAuth, checkAdmin, adminController.addRoom);
app.put('/api/admin/rooms', checkAuth, checkAdmin, adminController.updateRoom);
app.delete('/api/admin/rooms/:roomNumber', checkAuth, checkAdmin, adminController.deleteRoom);
app.get('/api/admin/menu', checkAuth, checkAdmin, adminController.getMenu);
app.post('/api/admin/menu', checkAuth, checkAdmin, adminController.addMenuItem);
app.put('/api/admin/menu', checkAuth, checkAdmin, adminController.updateMenuItem);
app.delete('/api/admin/menu/:id', checkAuth, checkAdmin, adminController.deleteMenuItem);
app.get('/api/admin/bookings', checkAuth, checkAdmin, adminController.getBookings);
app.delete('/api/admin/bookings/:id', checkAuth, checkAdmin, adminController.deleteBooking);
app.get('/api/admin/restaurant-bookings', checkAuth, checkAdmin, adminController.getRestaurantBookings);
app.put('/api/admin/restaurant-bookings', checkAuth, checkAdmin, adminController.updateRestaurantBooking);
app.delete('/api/admin/restaurant-bookings/:id', checkAuth, checkAdmin, adminController.deleteRestaurantBooking);

// Szobák
app.get('/api/rooms/featured', roomController.getFeaturedRooms); // Kiemelt szobák
app.get('/api/rooms', roomController.getAllRooms); // Összes szoba

// Authentikáció
app.get('/api/register', authController.getRegisterPage);
app.post('/api/register', authController.registerUser);
app.get('/api/login', authController.getLoginPage);
app.post('/api/login', authController.loginUser);

// Étterem
app.get('/api/restaurant/menu', restaurantController.getMenu);

// Wellness
app.get('/api/wellness', wellnessController.getWellness);

// Kapcsolat
app.get('/api/contact', contactController.getContact);
app.post('/api/contact', contactController.createContactMessage);

// Dashboard (védett útvonal)
app.get('/api/dashboard', checkAuth, dashboardController.getDashboard);

// Szobafoglalás
app.get('/api/bookings/rooms', bookingController.getAvailableRooms);
app.post('/api/bookings', bookingController.createBooking);

// Asztalfoglalás
app.get('/api/restaurant/bookings', restaurantBookingController.getTableBookingPage);
app.post('/api/restaurant/bookings', restaurantBookingController.createTableBooking);

// Jutalmak
app.get('/api/rewards', shopController.getRewards); // Hozzáadott GET rewards végpont
app.post('/api/rewards/redeem', checkAuth, shopController.redeemReward);

// Szerver indítása
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});