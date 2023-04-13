const express = require('express');
const { json } = require('sequelize');
const router = express.Router();
const verifyController = require('../controllers/verifyController');


// verify user mobile money number by sending an OTP 
router.post('/otp', verifyController.sendOtpController); 


module.exports = router; 