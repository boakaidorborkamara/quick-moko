const express = require('express');
const { json } = require('sequelize');
const router = express.Router();
// const {generateOTP} = require('../api/helper/generateOTP');


router.get('/verify', (req,res)=>{
    console.log('Working');
    console.log(req.body);
    res.send(JSON.stringify({msg:"OTP working"}));
    // generateOTP();
});

router.post('/verify', (req,res)=>{
    console.log('Post Working');
    console.log(req.body);
    res.send(JSON.stringify({msg:"OTP working"}));
    // generateOTP();
});


module.exports = router; 