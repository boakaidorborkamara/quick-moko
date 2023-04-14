const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwtSecret = '9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c';
const loginController = require('../controllers/loginController');




////////////////////////////////////////////////////////////////////////


// Enable display of login form 
router.get('/login', loginController.displayLoginPage);


//Enable collection of user login info while also allowing them to login
router.post('/login', loginController.logUserIn);


module.exports = router; 