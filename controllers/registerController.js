const bcrypt = require('bcrypt');
const {sendregistrationSucessfulSms} = require('../helpers/sendSMS');
const {hashUserPassword} = require('../helpers/hashUserPassword');

// include client model from db
const db = require('../config/db_config').clients_table;

//object will be modified and send to frontend
let res_obj = {code: 0, message: "Ok"};



// Display the registration page 
const displayRegistrationPage = async (req,res)=>{
    return res.render('../views/register');
}


// Add new user to database  
const RegisterUser = async (req,res)=>{
    // return res.send({'Registering'});

    try{ 

        // get new user info from frontend
        let new_client_details = req.body; 
        console.log(new_client_details);
 
        // console.log("GENERATING OTP", generateOTP);
        

        //encrypt user password or pin
        const plain_password = new_client_details.pin_code;
        const hashed_password = await hashUserPassword(plain_password);
        new_client_details.pin_code = hashed_password;
        console.log(new_client_details);


        // get user mobile money number from frontend 
        let frontend_mobile_money_number = new_client_details.mobile_money_number;
        console.log("frontend momo", frontend_mobile_money_number);


        //check in database if user to be added already exist
        let existing_client = await db.findOne({
            where: {mobile_money_number: frontend_mobile_money_number}
        });


        if(!existing_client){

            // Add new user 
            const client = await db.create(new_client_details);


            // modify response object
            res_obj.code = 0;
            res_obj.message = "Registration Successful";


            // send an SMS telling user that thier registration was successful
            let new_user_contact = new_client_details.mobile_money_number;
            let new_user_firstname = new_client_details.first_name;
            // sendregistrationSucessfulSms(new_user_contact, new_user_firstname);


            JSON.stringify(res_obj);
            res.status(201).send(res_obj); 


            return;  

        }
        else{

            // Notify that user exist
            res_obj.code = 1;
            res_obj.message = "User already exist!";
            console.log(res_obj)

            JSON.stringify(res_obj);
            res.status(403 ).send(res_obj); 
        }
        
    }
    catch(err){
        console.log(err);

        if(err){
             // modify response object
            res_obj.code = 1;
            res_obj.message = "We have encounter a server error";
            JSON.stringify(res_obj);
 
            res.status(500).send(res_obj); 
        }
    }
}


module.exports ={ 
    displayRegistrationPage,
    RegisterUser
}