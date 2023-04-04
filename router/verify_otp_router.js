const express = require('express');
const router = express.Router();
const {generateOTP} = require('../api/helper/generateOTP');


router.get('/verify_otp', (req,res)=>{
    console.log('Working');
    console.log(req.body);
    res.send({msg:"OTP working"});
    // generateOTP();
});


module.exports = router; 