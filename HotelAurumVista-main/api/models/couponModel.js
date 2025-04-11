const db = require('./db');
const crypto = require('crypto');

const generateCouponCode = () => {
  return crypto.randomBytes(8).toString('hex').toUpperCase();
};

const addCoupon = (userId, rewardId) => {
  return new Promise((resolve, reject) => {
    const couponCode = generateCouponCode();
    const query = 'INSERT INTO coupons (user_id, reward_id, coupon_code, created_at) VALUES (?, ?, ?, NOW())';
    db.query(query, [userId, rewardId, couponCode], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getUserCoupons = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT c.*, s.name, s.description, s.points 
      FROM coupons c 
      JOIN shop s ON c.reward_id = s.id 
      WHERE c.user_id = ? AND c.used = 0
      ORDER BY c.created_at DESC`;
    db.query(query, [userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const updateUserPoints = (userId, points) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET points = points - ? WHERE id = ? AND points >= ?';
    db.query(query, [points, userId, points], (err, result) => {
      if (err) {
        reject(err);
        console.error("Sikertelen levonás! ");
      } else {
        console.log("Sikeres levonás" + points);
      }
    });
  });
};

module.exports = { addCoupon, getUserCoupons, updateUserPoints };
