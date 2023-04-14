const express = require('express');
const { json } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = '9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c';

// include client model or db
const db = require('../config/db_config').clients_table;

//configure response object
let res_obj = {code: 0, message:"modify message"};


/////////////////////////////////////////////////////////////


// displays login page 
const displayLoginPage = async (req, res)=>{

    res.render('../views/login');

}


//Log existing user in
let logUserIn = async (req, res)=>{

    // extract login credentials from request body 
    const {mobile_money_number, pin_code} = req.body;


    // Validate if user provided both mobile money number and password 
    if(!mobile_money_number || !pin_code){
        res_obj.code = 1;
        res_obj.message = "Mobile Money Number and PIN are required"
        res.status(400).send(JSON.stringify(res_obj));
    }


    // move on to logging user in if values for both fieds were provided
    try{

        //check in database if the user already exist
        let existing_user = await db.findOne({
            where: {mobile_money_number: mobile_money_number}
        });


        if(!existing_user){
            res_obj.code = 1;
            res_obj.message = "Momo number or PIN is incorrect";
            res.send(res_obj);
        }
        else{

            // check if password or pin is correct by comparing given password with hashed password
            bcrypt.compare(pin_code, existing_user.dataValues.pin_code)
            .then(function (result) {
                
                // checks if result is true, means the passwords are the same
                if(result) {

                    //configure and create a sign token
                    const maxAge = 3 * 60 * 60; //token life span 
                    const token =  jwt.sign(
                        {user_mobile_money_number: existing_user.mobile_money_number, user_NIN_number: existing_user.NIN_number  },
                        jwtSecret,
                        {
                        expiresIn: maxAge, // 3hrs in sec
                        }
                    );


                    //  configure and send cookie to client 
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 3hrs in ms
                    });


                    res.status(201).json({
                        code: 0,
                        message: "User successfully Logged in",
                        redirectURL : "/",
                        // redirectURL : "/dashboard",
                        existing_user
                    });


                } else {

                    res.send({code:1,  message: "Password incorrect." });

                }
            })
            .catch((err)=>{

                if(err){

                    console.log(err);
                    res.status(400).json({

                        message: "An error occurred",
                        error: err.message,

                    });

                }

            })

            
        }
    }
    catch(err){
        console.log(err)
    }

}




module.exports = {
    displayLoginPage,
    logUserIn
}