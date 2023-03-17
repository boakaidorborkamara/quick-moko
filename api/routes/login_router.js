const express = require('express');
const router = express.Router();
let {logUserIn} = require('../controllers/loginController')


// Enable display of login form 
router.get('/login', (req,res)=>{
    res.render('../views/login');
});


//implement login on post
router.post('/login', logUserIn);


module.exports = router;