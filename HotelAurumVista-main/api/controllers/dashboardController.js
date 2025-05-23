const BookingsModel = require('../models/BookingsModel');
const shopController = require('./shopController');
const couponModel = require('../models/couponModel');

const getDashboard = (req, res) => {
  const user = req.user; // Auth middleware-ből
  if (!user) {
    return res.status(401).json({ error: 'Bejelentkezés szükséges' });
  }

  BookingsModel.getActiveBookingsForUser(user.id, (err, activeBookings) => {
    if (err) {
      console.error('Dashboard error:', err);
      return res.status(500).json({ error: 'Hiba történt az adatok betöltésekor' });
    }

    BookingsModel.getBookingHistoryForUser(user.id, (err, bookingHistory) => {
      if (err) {
        console.error('Dashboard error:', err);
        return res.status(500).json({ error: 'Hiba történt az adatok betöltésekor' });
      }

      shopController.getRewards(req, res, (err, rewards) => {
        if (err) {
          console.error('Dashboard error:', err);
          return res.status(500).json({ error: 'Hiba történt az adatok betöltésekor' });
        }

        couponModel.getUserCoupons(user.id, (err, userCoupons) => {
          if (err) {
            console.error('Dashboard error:', err);
            return res.status(500).json({ error: 'Hiba történt az adatok betöltésekor' });
          }

          const formattedActiveBookings = activeBookings.map(booking => ({
            id: booking.id,
            roomName: booking.roomName,
            checkIn: new Date(booking.check_in_date).toLocaleDateString('hu-HU'),
            checkOut: new Date(booking.check_out_date).toLocaleDateString('hu-HU')
          }));

          const formattedBookingHistory = bookingHistory.map(booking => ({
            roomName: booking.roomName,
            dates: `${new Date(booking.check_in_date).toLocaleDateString('hu-HU')} - ${new Date(booking.check_out_date).toLocaleDateString('hu-HU')}`,
            pointsEarned: Math.floor(booking.total_amount * 0.1)
          }));

          res.status(200).json({
            user: {
              id: user.id,
              name: user.name,
              membershipLevel: user.membershipLevel || 'Alap',
              points: user.points,
              totalBookings: activeBookings.length + bookingHistory.length
            },
            activeBookings: formattedActiveBookings,
            bookingHistory: formattedBookingHistory,
            rewards,
            userCoupons
          });
        });
      });
    });
  });
};

module.exports = { getDashboard };