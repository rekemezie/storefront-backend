const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function (req, res, next) {
  // Gather the jwt access token from the request header
  try {
      const token = req.headers.authorization.split(" ")[1];
      var decode = jwt.verify(token, process.env.JWT_KEY);
      req.result = decode; // store the new request in a results variable
      next(); // continue if token is valid
  } catch {
      return res.status(401).json({message: 'Token not correct'});
  }
}