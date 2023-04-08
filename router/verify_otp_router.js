const express = require('express');
const { json } = require('sequelize');
const router = express.Router();
const {generateOTP} = require('../api/helper/generateOTP');
const {sendOtpSms} = require('../api/helper/sendSMS');



router.get('/verify', (req,res)=>{
    console.log('OTP Working');
    console.log(req.body);

    let generated_otp =  generateOTP();
    let {phone} = req.body;
    console.log("PHONE", phone);
    res.send(JSON.stringify({msg:"OTP working"}));

});

router.post('/verify', (req,res)=>{
    console.log('OTP Working');
    console.log(req.body);

    let generated_otp =  generateOTP();
    let {phone} = req.body;

    sendOtpSms(phone, generated_otp);

    res.send(JSON.stringify({msg:"OTP working"}));
    
});


module.exports = router; 