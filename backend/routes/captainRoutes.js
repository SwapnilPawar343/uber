const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { body } = require("express-validator");
const captainController = require("../controllers/captainController");
const { authCaptain } = require("../middlewares/authMiddleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body('fullname.firstname')
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),
    body('password')
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body('vehicle.color')
      .isLength({ min: 2 })
      .withMessage("Color must be at least 3 characters long"),
    body('vehicle.plate')
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body('vehicle.capacity')
      .isInt({ min: 1 })
      .withMessage("Capacity must be a at least 1"),
    body('vehicle.vehicleType')
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Vehicle type must be either car, motorcycle or auto"),
  ],
  captainController.registerCaptain
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  captainController.loginCaptain
);
router.get('/profile',authCaptain,captainController.getCaptainProfile);
router.get('/logout',authCaptain,captainController.logoutCaptain);
module.exports = router;
