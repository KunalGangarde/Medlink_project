const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user');

router.post('/', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Authentication failed'
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Authentication failed'
          });
        }
        if (result) {
          const token = jwt.sign({
            email: user.email,
            userId: user._id
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h"
          }
          );
          return res.status(200).json({
            message: 'Authentication successful',
            token: token
          });
        }
        res.status(401).json({
          message: 'Authentication failed'
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
