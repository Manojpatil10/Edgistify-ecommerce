const userRegister = require('../model/userRegister');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const generateToken = (user) => {
    const payload = { id: user._id, email: user.email };
    const secret = process.env.SECRET_KEY;
    const options = { expiresIn: '30d' };

    return JWT.sign(payload, secret, options);
  };

  userRegister.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed: User not found' });
      }

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ message: 'Authentication failed: Incorrect password' });
        }

        const token = generateToken(user._id);
        const username = user.username

        console.log(token)
        console.log(username)

        res.status(200).json({ message: 'Login successful', token, username });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'An error occurred during login' });
    });
}