const userModel = require("../models/userModel");
const express = require("express");
const router = express.Router();
const userService = require("../services/userServices");
const { validationResult } = require("express-validator");
const { hash } = require("bcrypt");
const BlacklistToken = require("../models/blacklistToken");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname,  email, password } = req.body;
  const isUserAlready = await userModel.findOne({ email });
  if (isUserAlready) { 
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname : fullname.lastname,
    email,
    password: hashedPassword,
  });
  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({email}).select('+password');
  if (!user) {
    return res.status(401).json({ message: "Invalid email or Password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or Password" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token,)
  res.status(200).json({ token, user });
}
module.exports.getUserProfile = async (req, res, next) => {
  const user = await userModel.findById(req.user._id).select('-password');
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user });
}
module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers['authorization'].split(' ')[1];
  await BlacklistToken.create({ token });
  res.status(200).json({ message: "Logout successfully" });
}