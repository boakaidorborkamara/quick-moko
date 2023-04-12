const express = require('express');
const router = express.Router();


// bring deposit controller codes into this file 
const depositController = require('../controllers/depositController');


//create new client on post
router.post('/api/v1/receive_loan', depositController.handleDeposit);


module.exports = router;