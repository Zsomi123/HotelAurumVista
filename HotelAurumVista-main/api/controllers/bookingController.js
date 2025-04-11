const bookingModel = require('../models/bookingModel');
const roomModel = require('../models/roomModel');
const moment = require('moment');

const getAvailableRooms = async (req, res) => {
  try {
    const rooms = await roomModel.getAvailableRooms();
    res.status(200).json({ rooms });
  } catch (error) {
    console.error('Hiba történt a szobák betöltése során:', error);
    res.status(500).json({ error: 'Hiba történt a szobák betöltése során' });
  }
};

const createBooking = async (req, res) => {
  try {
    const { room_id, check_in, check_out, additional_services, phone_number, special_requests, user_email, user_name, guests, pay_method } = req.body;
    const user = req.user;

    let userId = user ? user.id : null;

    if (!room_id) {
      return res.status(400).json({ error: 'Kérlek válassz szobát!' });
    }

    const checkInDate = moment(check_in);
    const checkOutDate = moment(check_out);

    if (checkInDate.isBefore(moment(), 'day')) {
      return res.status(400).json({ error: 'A bejelentkezés dátuma nem lehet a mai nap előtt!' });
    }
    if (checkOutDate.isBefore(checkInDate, 'day')) {
      return res.status(400).json({ error: 'A kijelentkezés dátuma nem lehet a bejelentkezés előtt!' });
    }

    const room = await roomModel.getRoomById(room_id);
    const totalAmount = calculateTotalAmount(room.price, check_in, check_out);

    const bookingData = {
      user_id: userId,
      room_id,
      check_in_date: check_in,
      check_out_date: check_out,
      additional_services,
      phone_number,
      special_requests,
      user_email,
      user_name,
      payment_status: 'Pending',
      payment_method: pay_method,
      total_amount: totalAmount
    };

    const bookingId = await bookingModel.createBooking(bookingData);
    res.status(201).json({ success: 'A foglalás sikeres!', bookingId });
  } catch (error) {
    console.error('Hiba történt a foglalás során:', error);
    res.status(500).json({ error: error.message || 'Hiba történt a foglalás során' });
  }
};

const calculateTotalAmount = (pricePerNight, checkInDate, checkOutDate) => {
  const checkIn = moment(checkInDate);
  const checkOut = moment(checkOutDate);
  const days = checkOut.diff(checkIn, 'days');
  if (days < 1) throw new Error('A kijelentkezés dátuma nem lehet a bejelentkezés előtt vagy ugyanazon a napon!');
  return days * pricePerNight;
};

module.exports = { getAvailableRooms, createBooking };