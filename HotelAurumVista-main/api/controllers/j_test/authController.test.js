const request = require('supertest');
const bcrypt = require('bcryptjs');
const db = require('../../models/db');
const app = require('../../app'); // Feltételezve, hogy az Express alkalmazásod itt található

// Mock a db és bcrypt modulokat
jest.mock('../../models/db');
jest.mock('bcryptjs');

describe('Auth Controller Tests', () => {
  // Minden teszt előtt alaphelyzetbe állítjuk a mockokat
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    test('sikeres regisztráció esetén 201-es státuszkódot ad vissza', async () => {
      // Mock a db.query függvényt
      db.query.mockImplementation((query, params, callback) => {
        if (query.includes('SELECT')) {
          // Nincs létező felhasználó
          callback(null, []);
        } else {
          // Sikeres beszúrás
          callback(null);
        }
      });

      // Mock a bcrypt.hash függvényt
      bcrypt.hash.mockImplementation((password, salt, callback) => {
        callback(null, 'hashedPassword');
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          first_name: 'Test',
          last_name: 'User',
          phone: '123456789',
          password: 'password123',
          confirmPassword: 'password123'
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Sikeres regisztráció!');
      expect(db.query).toHaveBeenCalledTimes(2);
    });

    test('hibát ad vissza, ha a jelszavak nem egyeznek', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          first_name: 'Test',
          last_name: 'User',
          phone: '123456789',
          password: 'password123',
          confirmPassword: 'differentPassword'
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('A két jelszó nem egyezik meg!');
      expect(db.query).not.toHaveBeenCalled();
    });

    test('hibát ad vissza, ha az email már foglalt', async () => {
      // Mock a db.query függvényt, hogy létező felhasználót adjon vissza
      db.query.mockImplementation((query, params, callback) => {
        if (query.includes('SELECT')) {
          callback(null, [{ email: 'test@example.com' }]);
        }
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          first_name: 'Test',
          last_name: 'User',
          phone: '123456789',
          password: 'password123',
          confirmPassword: 'password123'
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Ez az email cím már foglalt!');
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('loginUser', () => {
    test('sikeres bejelentkezés esetén 200-as státuszkódot ad vissza', async () => {
      // Mock a db.query függvényt
      db.query.mockImplementation((query, params, callback) => {
        callback(null, [{
          ID: 1,
          email: 'test@example.com',
          first_name: 'Test',
          password: 'hashedPassword',
          membership_level: 'standard'
        }]);
      });

      // Mock a bcrypt.compare függvényt
      bcrypt.compare.mockImplementation((password, hash, callback) => {
        callback(null, true);
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Sikeres bejelentkezés!');
      expect(response.body.user).toBeDefined();
      expect(db.query).toHaveBeenCalledTimes(1);
    });

    test('hibát ad vissza, ha a felhasználó nem létezik', async () => {
      // Mock a db.query függvényt, hogy üres tömböt adjon vissza
      db.query.mockImplementation((query, params, callback) => {
        callback(null, []);
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('Hibás email vagy jelszó!');
      expect(db.query).toHaveBeenCalledTimes(1);
    });

    test('hibát ad vissza, ha a jelszó helytelen', async () => {
      // Mock a db.query függvényt
      db.query.mockImplementation((query, params, callback) => {
        callback(null, [{
          ID: 1,
          email: 'test@example.com',
          first_name: 'Test',
          password: 'hashedPassword',
          membership_level: 'standard'
        }]);
      });

      // Mock a bcrypt.compare függvényt, hogy hamisat adjon vissza
      bcrypt.compare.mockImplementation((password, hash, callback) => {
        callback(null, false);
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongPassword'
        });

      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('Hibás email vagy jelszó!');
      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    });
  });
});
