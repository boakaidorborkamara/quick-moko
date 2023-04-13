const {generateOTP} = require('../helpers/generateOTP');
const {sendOtpSms} = require('../helpers/sendSMS')


// send user an otp code to verify their mobile money number
const sendOtpController = async (req, res)=>{

    // generate a new otp 
    let generated_otp =  generateOTP();


    // user phone nuber 
    let {phone} = req.body;


    //send sms to user phone number with otp
    sendOtpSms(phone, generated_otp);


    // res.send(JSON.stringify({otp:generated_otp}));
    res.status(200).json({code:0, msg:"OTP generated", otp:generated_otp})

}



module.exports = {
    sendOtpController
}