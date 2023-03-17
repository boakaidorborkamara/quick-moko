const express = require('express');
const router = express.Router();


const indexController = require('../controllers/indexController')


//define route for the homepage
router.get('/', indexController)

  
module.exports = router;