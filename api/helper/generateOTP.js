const otpGenerator = require('otp-generator')


const generateOTP = ()=>{

    // configure otp
    const otp_lenght = 4;
    const otp_options = { upperCaseAlphabets: false, specialChars: false };


    // generate otp 
    let otp = otpGenerator.generate(otp_lenght, otp_options);


    return otp;

}



module.exports = {
    generateOTP
}
