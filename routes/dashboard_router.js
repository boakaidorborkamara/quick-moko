const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');


//CONTROLLER
let dashboardController = require("../controllers/dashboardController");


router.get('/dashboard', auth,  dashboardController.displayDashboardPage);


module.exports = router;