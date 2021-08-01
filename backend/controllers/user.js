const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cryptoJs = require('crypto-js');

exports.signup = (req, res, next) => {
    /* const hashMail = bcrypt.hash(req.body.email, 10); */
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: cryptoJs.HmacSHA512(req.body.email, 'RANDOM_KEY_SECRET').toString(),
        password: hash, // hash password
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    /* const hashMail = bcrypt.hash(req.body.email, 10); */
    User.findOne({ email: cryptoJs.HmacSHA512(req.body.email, 'RANDOM_KEY_SECRET').toString(), })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // compares the database password with the user password
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }  // add the token to the user id and expire in 24h
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};