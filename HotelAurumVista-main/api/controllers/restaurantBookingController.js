const restaurantBookingModel = require('../models/restaurantBookingModel');

const getTableBookingPage = (req, res) => {
  res.status(200).json({ message: 'Asztalfoglalási oldal betöltése kliensoldalon történik' });
};

const createTableBooking = async (req, res) => {
  try {
    const { name, phone_number, date, time, guests, special_requests } = req.body;

    const bookingData = {
      Name: name,
      Phone: phone_number,
      Date: date,
      Time: time,
      Guests: guests,
      Special_requests: special_requests
    };

    const bookingId = await restaurantBookingModel.createTableBooking(bookingData);
    res.status(201).json({ success: 'Asztalfoglalás sikeres!', bookingId });
  } catch (error) {
    console.error('Hiba történt az asztalfoglalás során:', error);
    res.status(500).json({ error: 'Hiba történt az asztalfoglalás során: ' + error.message });
  }
};


module.exports = { getTableBookingPage, createTableBooking };