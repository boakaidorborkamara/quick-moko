const express = require('express');
const router = express.Router();
let {logUserIn} = require('../controllers/loginController')


//implement login on post
router.post('/api/v1/login', logUserIn);


module.exports = router;