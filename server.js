// routes/user.js
const express = require('express');
const router = express.Router();
const db = require('../database'); // Assuming you have a database connection

// POST /api/users
router.post('/', (req, res) => {
  const { name, email, password, phone, address } = req.body;

  // Validate user inputs

  // Execute SQL query to insert a new user into the database
  const query = 'INSERT INTO User (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)';
  const values = [name, email, password, phone, address];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

    res.status(201).json({ message: 'User created successfully' });
  });
});

module.exports = router;
