const bcrypt = require('bcrypt');
const userRegister = require('../model/userRegister');

exports.updatePass = (req, res) => {
  const { email, newPassword } = req.body;
  const saltRounds = 10

  userRegister.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User Not exists" });
      }

      bcrypt
        .hash(newPassword, saltRounds)
        .then((hashPassword) => {
          userRegister.updateOne({ email }, { password: hashPassword })
            .then((isupdate) => {
              if (isupdate.acknowledged) {
                res.status(200).json({ message: "Password changed successfully" });
              }
            })
            .catch((error) => {
              console.log("Error updating password:", error);
              res.status(500).json({ message: "Failed to update password" });
            });
        })
        .catch((error) => {
          console.log("Error hashing password:", error);
          res.status(500).json({ message: "Failed to hash password" });
        });
    })
    .catch((error) => {
      console.log("Error finding user:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};
