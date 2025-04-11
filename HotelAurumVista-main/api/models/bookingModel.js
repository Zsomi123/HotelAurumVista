const db = require('./db');

const createBooking = (bookingData) => {
  return new Promise((resolve, reject) => {
    const {
      user_id, room_id, check_in_date, check_out_date, 
      additional_services, phone_number, special_requests, 
      user_email, user_name, payment_status, 
      payment_method, total_amount
    } = bookingData;

    db.query('START TRANSACTION;', (err) => {
      if (err) {
        return reject(err);
      }

      console.log(`Trying to find room with type: ${room_id} and status: Available`);

      db.query(
        "SELECT Room_number FROM rooms_data WHERE room_type = ? AND Room_status = 'Available' LIMIT 1;",
        [room_id],
        (err, results) => {
          if (err) {
            return db.query('ROLLBACK;', () => reject(err));
          }

          console.log('SQL query results:', results);

          const room_number = results[0]?.Room_number;
          if (!room_number) {
            return db.query('ROLLBACK;', () => reject(new Error('No available room found.')));
          }

          db.query(
            "UPDATE rooms_data SET Room_status = 'Occupied' WHERE room_number = ?;",
            [room_number],
            (err) => {
              if (err) {
                return db.query('ROLLBACK;', () => reject(err));
              }

              const query = `
                INSERT INTO bookings (
                  user_id, room_id, check_in_date, check_out_date, 
                  additional_services, phone_number, special_requests, 
                  user_email, user_name, payment_status, 
                  payment_method, total_amount
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
              `;

              const values = [
                user_id, room_number, check_in_date, check_out_date,
                additional_services, phone_number, special_requests, 
                user_email, user_name, payment_status,
                payment_method, total_amount
              ];

              db.query(query, values, (err, results) => {
                if (err) {
                  return db.query('ROLLBACK;', () => reject(err));
                }

                db.query('COMMIT;', (err) => {
                  if (err) {
                    return db.query('ROLLBACK;', () => reject(err));
                  }
                  resolve(results.insertId);
                });
              });
            }
          );
        }
      );
    });
  });
};

module.exports = { createBooking };
