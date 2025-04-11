const restaurantModel = require('../models/restaurantModel');

const getMenu = async (req, res) => {
  try {
    const restaurantMenu = await restaurantModel.getMenu();
    res.status(200).json({
      title: 'Kitchen',
      description: 'Kulináris élmények a legmagasabb színvonalon',
      details: 'Éttermünk a modern és klasszikus ízek találkozása.',
      image: '/images/restaurant.jpg',
      menuItems: restaurantMenu
    });
  } catch (err) {
    console.error('Hiba történt a menü lekérésekor:', err);
    res.status(500).json({ error: 'Hiba történt a menü lekérésekor' });
  }
};

module.exports = { getMenu };