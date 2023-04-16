const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');


const signupRoutes = require('./signup');
const loginRoutes = require('./login');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// use the sign up and login routes
app.use(signupRoutes);
app.use(loginRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
