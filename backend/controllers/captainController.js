const captainService = require('../services/captainService');
const captainModel = require('../models/captainModel');
const { validationResult } = require('express-validator');


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