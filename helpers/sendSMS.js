const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
 


//Send sms notification after a user sucessfully registers
const sendregistrationSucessfulSms = async (receipt_number, receipt_name)=>{

    try{


      // format phone number
      let phone_code = 231;
      let formatted_phone_number = `${phone_code}${receipt_number.substring(1)}`;

      // message id
      let message_id = uuidv4(); 

      //set content for new message
      let message_content = `Welcome ${receipt_name}! Thanks for registering with QuickMoko. Login to get access to instant loans.`;


      // configure message obj 
      let new_message_info = {
          senderName: "QuickMoko",
          messages: [
            {
              to: formatted_phone_number,
              body: message_content,
              extMessageId: message_id
            } 
          ]
      }


      // send new sms to user
      // await axios.post('https://developer.lonotalk.com/api/v1/sms', new_message_info, {
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded',
      //       'apiKey': process.env.SMS_SERVER_API_KEY
      //     }
      // })
      // .then(function (response) {
      //     let data = response.data;
      //     console.log(data);
      // })
      // .catch(function (error) {
      //     console.log(error);
      // });


      return 0;

    }
    catch(err){
      console.log(err);
      return 1;
    }
}
 


//Send OTP via sms when users enter their MoMo number
const sendOtpSms = async (receipt_number, otp)=>{

  try{

    // format phone number
    let phone_code = 231;
    let formatted_phone_number = `${phone_code}${receipt_number.substring(1)}`;


    // message id
    let message_id = uuidv4(); 

    //content for new message
    let message_content = `Your OTP to verify your number is ${otp}.`;


    // configure new message
    let new_message_info = {
        senderName: "QuickMoko",
        messages: [
          {
            to: formatted_phone_number,
            body: message_content,
            extMessageId: message_id
          }
        ]
    }

    //send new message to user with OTP
    // await axios.post('https://developer.lonotalk.com/api/v1/sms', new_message_info, {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       'apiKey': process.env.SMS_SERVER_API_KEY
    //     }
    // })
    // .then(function (response) {
    //     let data = response.data;
    //     console.log(data);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
    
    return 0;
  }
  catch(err){
    console.log(err);
    return 1
  }

  
}






module.exports = {
    sendregistrationSucessfulSms,
    sendOtpSms
}