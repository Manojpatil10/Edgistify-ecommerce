const userRegister = require('../model/userRegister');
const userProfile = require('../model/userProfile');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;

  userRegister.findOne({ username: username }).then((exist) => {
    if (!exist) {

      bcrypt.hash(password, saltRounds).then((hashPassword) => {

        const register = new userRegister({
          username: username,
          email: email,
          password: hashPassword
        })

        register.save().then((success) => {

          if (success) {
            console.log(success);
            console.log(success._id)

            const profile = new userProfile({
              refID: success._id
            })

            profile.save().then((done) => {
              return res.status(200).json({ message: 'registered successfully!' })
            }).catch((error) => {
              console.log(error)
              return res.status(500).json({ message: 'Server error. Please try again later.' })
            })
          }

        }).catch((error) => {
          res.status(401).json({ message: 'Registration was unsuccessful. Please try again.' })
        })
      }).catch((error) => {
        console.error(error);
        return res.status(500).json({ message: 'Error encrypting password.' });
      });


    } else {
      res.status(401).json({ message: 'Username already exist.' })
    }
  })
}