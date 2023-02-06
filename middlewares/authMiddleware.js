const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const JWT_KEY = "JATIN"
const protect = asyncHandler(async (req, resp, next) => {


  try {
    const token = req.header('auth-token');

    const data = jwt.verify(token, JWT_KEY);
    console.log(data);
    req.user = await User.findById(data.id).select("-password");

    next();
  } catch (error) {

    return resp.status(401).send({ error: "Please authenticate the user" });


  }

});
module.exports = { protect };
