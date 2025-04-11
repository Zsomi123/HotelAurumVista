const db = require('../models/db');

const getDashboardStats = (req, res) => {
  const stats = {
    occupiedRooms: 0,
    todayArrivals: 0,
    restaurantBookings: 0,
    monthlyRevenue: 0,
  };

  // Foglalt szobák lekérdezése
  db.query("SELECT COUNT(*) as occupied FROM rooms_data WHERE Room_status = 'Occupied'", (err, result) => {
    if (err) return res.status(500).json({ error: 'Hiba a statisztikák lekérdezésekor' });
    stats.occupiedRooms = result[0].occupied;

    // Mai érkezések lekérdezése
    db.query("SELECT COUNT(*) as arrivals FROM bookings WHERE check_in_date = CURDATE()", (err, result) => {
      if (err) return res.status(500).json({ error: 'Hiba a statisztikák lekérdezésekor' });
      stats.todayArrivals = result[0].arrivals;

      // Éttermi foglalások lekérdezése
      db.query("SELECT COUNT(*) as bookings FROM restaurant_bookings WHERE Date = CURDATE()", (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba a statisztikák lekérdezésekor' });
        stats.restaurantBookings = result[0].bookings;

        // Havi bevétel lekérdezése
        db.query("SELECT SUM(total_amount) as revenue FROM bookings WHERE MONTH(booking_date) = MONTH(CURDATE())", (err, result) => {
          if (err) return res.status(500).json({ error: 'Hiba a statisztikák lekérdezésekor' });
          stats.monthlyRevenue = result[0].revenue || 0;

          res.status(200).json(stats);
        });
      });
    });
  });
};

const getRooms = (req, res) => {
  db.query("SELECT r.ID, r.name, rd.Room_number, rd.Room_status, r.price FROM rooms r LEFT JOIN rooms_data rd ON r.ID = rd.Room_type", (err, results) => {
    if (err) return res.status(500).json({ error: 'Hiba a szobák lekérdezésekor' });
    res.status(200).json(results);
  });
};

const addRoom = (req, res) => {
  const { roomNumber, roomType, price } = req.body;
  db.query("INSERT INTO rooms (name, price, description, description2, image_path) VALUES (?, ?, 'Új szoba', '{}', 'images/default.jpg')", 
    [roomType, price], (err, result) => {
      if (err) return res.status(500).json({ error: 'Hiba a szoba hozzáadásakor' });
      const roomId = result.insertId;
      db.query("INSERT INTO rooms_data (Room_type, Room_number, Room_status) VALUES (?, ?, 'Available')", 
        [roomId, roomNumber], (err) => {
          if (err) return res.status(500).json({ error: 'Hiba a szoba adatainak hozzáadásakor' });
          res.status(201).json({ message: 'Szoba sikeresen hozzáadva' });
        });
    });
};

const getMenu = (req, res) => {
  db.query("SELECT * FROM restaurant_menu", (err, results) => {
    if (err) return res.status(500).json({ error: 'Hiba az étlap lekérdezésekor' });
    res.status(200).json(results);
  });
};

const addMenuItem = (req, res) => {
  const { name, description, price, type } = req.body;
  db.query("INSERT INTO restaurant_menu (Name, Description, Price, Type) VALUES (?, ?, ?, ?)", 
    [name, description, price, type], (err) => {
      if (err) return res.status(500).json({ error: 'Hiba az étel hozzáadásakor' });
      res.status(201).json({ message: 'Étel sikeresen hozzáadva' });
    });
};

const getBookings = (req, res) => {
  db.query("SELECT * FROM bookings", (err, results) => {
    if (err) return res.status(500).json({ error: 'Hiba a foglalások lekérdezésekor' });
    res.status(200).json(results);
  });
};

const getRestaurantBookings = (req, res) => {
  db.query("SELECT * FROM restaurant_bookings", (err, results) => {
    if (err) return res.status(500).json({ error: 'Hiba az éttermi foglalások lekérdezésekor' });
    res.status(200).json(results);
  });
};

const updateRoom = (req, res) => {
  const { roomNumber, roomType, price, status } = req.body;
  db.query(
    "UPDATE rooms r JOIN rooms_data rd ON r.ID = rd.Room_type SET r.name = ?, r.price = ?, rd.Room_status = ? WHERE rd.Room_number = ?",
    [roomType, price, status, roomNumber],
    (err) => {
      if (err) return res.status(500).json({ error: 'Hiba a szoba szerkesztésekor' });
      res.status(200).json({ message: 'Szoba sikeresen frissítve' });
    }
  );
};

const deleteRoom = (req, res) => {
  const { roomNumber } = req.params;
  db.query("DELETE FROM rooms_data WHERE Room_number = ?", [roomNumber], (err) => {
    if (err) return res.status(500).json({ error: 'Hiba a szoba törlésekor' });
    db.query("DELETE FROM rooms WHERE ID NOT IN (SELECT Room_type FROM rooms_data)", (err) => {
      if (err) return res.status(500).json({ error: 'Hiba a szoba törlésekor' });
      res.status(200).json({ message: 'Szoba sikeresen törölve' });
    });
  });
};

const updateMenuItem = (req, res) => {
  const { id, name, description, price, type } = req.body;
  db.query(
    "UPDATE restaurant_menu SET Name = ?, Description = ?, Price = ?, Type = ? WHERE ID = ?",
    [name, description, price, type, id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Hiba az étel szerkesztésekor' });
      res.status(200).json({ message: 'Étel sikeresen frissítve' });
    }
  );
};

const deleteMenuItem = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM restaurant_menu WHERE ID = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: 'Hiba az étel törlésekor' });
    res.status(200).json({ message: 'Étel sikeresen törölve' });
  });
};

const deleteBooking = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM bookings WHERE booking_id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: 'Hiba a foglalás törlésekor' });
    res.status(200).json({ message: 'Foglalás sikeresen törölve' });
  });
};

const updateRestaurantBooking = (req, res) => {
  const { id, name, phone, date, time, guests, specialRequests } = req.body;
  db.query(
    "UPDATE restaurant_bookings SET Name = ?, Phone = ?, Date = ?, Time = ?, Guests = ?, Special_requests = ? WHERE ID = ?",
    [name, phone, date, time, guests, specialRequests, id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Hiba az éttermi foglalás szerkesztésekor' });
      res.status(200).json({ message: 'Éttermi foglalás sikeresen frissítve' });
    }
  );
};

const deleteRestaurantBooking = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM restaurant_bookings WHERE ID = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: 'Hiba az éttermi foglalás törlésekor' });
    res.status(200).json({ message: 'Éttermi foglalás sikeresen törölve' });
  });
};

module.exports = {
  getDashboardStats,
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom,
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getBookings,
  deleteBooking,
  getRestaurantBookings,
  updateRestaurantBooking,
  deleteRestaurantBooking,
};