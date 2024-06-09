const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("hello", name, email, password);
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exists!");
  }
  const hashpassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashpassword });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const authController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //console.log(user.password);
  console.log(user);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("hello");
    return res.status(401).send({
      success: false,
      message: "Invlid username or password",
    });
  }
  console.log("hello logged in successfully  ");
  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("user Not Found!");
  }
});

module.exports = {
  authController,
  getUserProfile,
  registerUser,
  updateUserProfile,
};
