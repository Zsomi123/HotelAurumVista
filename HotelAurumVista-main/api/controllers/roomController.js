const roomModel = require('../models/roomModel');

const getFeaturedRooms = async (req, res) => {
  try {
    const rooms = await roomModel.getRooms();

    rooms.forEach(room => {
      if (room.description2) {
        room.description2 = JSON.parse(room.description2);
      }
      room.formattedPrice = room.price.toLocaleString('hu-HU') + ' Ft';
    });

    const featuredRooms = rooms.slice(0, 3);
    res.status(200).json({ featuredRooms });
  } catch (err) {
    console.error('Hiba történt a szobák lekérésekor:', err);
    res.status(500).json({ error: 'Hiba történt a szobák lekérésekor' });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomModel.getRooms();
    res.status(200).json({ rooms });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Hiba történt' });
  }
};

module.exports = { getFeaturedRooms, getAllRooms };