const userProfile = require('../model/userProfile');
const userRegister = require('../model/userRegister');

exports.profileLoader = (req, res, next) => {
  const userId = req.userId;

  userRegister.findOne({ _id: userId }).then((register) => {
    if (register) {
      userProfile.findOne({ refID: userId }).then((profile) => {
        res.status(200).json({username: register.username, profile});
      }).catch((error) => {
        console.log(error);
      });
    }
  });
};

exports.profileUpdate = (req, res, next) => {
  const id = req.userId;
  const { gender, dob } = req.body;
  const image = req.file ? req.file.path.replace("\\", "/") : "";

  const profileUrl = `http://localhost:8080/${image}`;

  userProfile.updateOne({ refID: id }, { $set: {
      Gender: gender,
      DOB: dob,
      profileImg: profileUrl
  }})
  .then((success) => {
      res.status(200).json({ message: 'Profile updated successfully!' });
  })
  .catch((error) => {
      res.status(500).json({ message: 'Error!, please try again' });
  });
};

exports.deleteAccount = (req, res, next) => {
  const { id } = req.params;

  userProfile.deleteOne({ refID: id }).then((isDelete) => {
    if (isDelete) {
      userRegister.deleteOne({ _id: id }).then((success) => {
        res.status(200).json({ message: 'Account deleted successfully' });
      }).catch((error) => {
        res.status(500).json({ message: 'Failed to delete account. Please try again.' });
      });
    }
  }).catch((err) => {
    res.status(500).json({ message: 'Failed to delete account. Please try again.' });
  });
};
