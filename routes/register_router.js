const express = require('express');
const axios = require('axios');
const router = express.Router();
const registerController = require('../controllers/registerController');

// display registration page
router.get('/register', registerController.displayRegistrationPage);


// add new user to database
router.post('/register', registerController.RegisterUser);


module.exports = router;