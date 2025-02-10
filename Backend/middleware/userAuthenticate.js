const JWT = require("jsonwebtoken");
exports.userAuthenticate = (req, res, next) => {
  const mytoken = req.body.ID;

  const secret = process.env.SECRET_KEY;
  const user = JWT.verify(mytoken, secret);

  req.userId = user.id; 
  next();
};



