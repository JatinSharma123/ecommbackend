const jwt = require("jsonwebtoken");
const JWT_KEY = "JATIN"
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_KEY, {
    expiresIn: "15d",
  });
};

module.exports = generateToken;
