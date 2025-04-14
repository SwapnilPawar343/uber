const captainService = require('../services/captainService');
const captainModel = require('../models/captainModel');
const { validationResult } = require('express-validator');
const blackListToken = require('../models/blacklistToken');


module.exports.registerCaptain = async (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { fullname, email, password, vehicle } = req.body;
  const isCaptainAlreadyExist = await captainModel.findOne({ email });
  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exists" });
  }
  const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        email,
        password: hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity, 
        vehicleType:vehicle.vehicleType
        
    });
    
    const token = await captain.generateAuthToken();
    res.status(201).json({token, captain });


}
module.exports.loginCaptain = async (req, res, next) => {
  const error= validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select('+password');
  if (!captain) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = await captain.generateAuthToken();
  res.cookie("token", token, )
  res.status(200).json({ token, captain });
}
module.exports.getCaptainProfile = async (req, res, next) => {
 const  captain=req.captain;
  
  res.status(200).json({ captain });
}
module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  const blackListedToken = await blackListToken.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
}