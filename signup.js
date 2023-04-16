const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const User = require('./user'); // assuming the User model is defined in the user.js file

app.use(bodyParser.urlencoded({ extended: true }));

const signup = express.Router();
signup.post('/signup', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // validate the form fields
  if (!email || !password || !confirmPassword) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ error: 'Passwords do not match' });
    return;
  }

  // create a new user and save it to the database
  const user = new User({ email, password });
  try {
    await user.save();
    console.log('New user:', user);
    res.redirect('/index2'); // redirect to index2 page after user is created
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving the user' });
  }
});

module.exports = signup;
