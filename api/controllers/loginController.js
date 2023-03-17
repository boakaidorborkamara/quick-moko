const express = require('express');
const { json } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = '9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c';

/////////////////////////////////////////////////////////////


// include client model or db
const db = require('../../config/db_config').clients_table;


/////////////////////////////////////////////////////////////


//configure response object
let res_obj = {code: 0, message:"modify message"};


/////////////////////////////////////////////////////////////


//Implement login for existing user
let logUserIn = async (req, res)=>{

    // extract login credentials from request body 
    const {momo_number, password} = req.body;


    // Validate if user provided both momo number and password 
    if(!momo_number || !password){
        res_obj.code = 1;
        res_obj.message = "Momo Number and Passwords are required"
        res.status(400).send(JSON.stringify(res_obj));

    }


    // move on to logging user in if values for both fieds were provided
    try{

        //check in database if the user already exist
        let existing_user = await db.findOne({
            where: {mobile_money_number: momo_number}
        });


        if(!existing_user){
            res_obj.code = 1;
            res_obj.message = "Momo number or password is incorrect";
            // res_obj = JSON.stringify(res_obj);
            res.send(res_obj);
        }
        else{

            // check if password is correct by comparing given password with hashed password
            bcrypt.compare(password, existing_user.password)
            .then(function (result) {
                
                console.log(result);

                // checks if result is true, means the passwords are the same
                if(result) {
                    res.status(201).json({
                        code: 0,
                        message: "User successfully Logged in",
                        existing_user
                    });
                } else {
                //   res.status(400).json({code:1,  message: "Login not succesful" });
                  res.send({code:1,  message: "Password incorrect." })
                }
            });

            // res.send({"msg":"User exist"});
            
        }
    }
    catch(err){
        console.log(err)
    }

}


//////////////////////////////////////////////////////////////

module.exports = {logUserIn}