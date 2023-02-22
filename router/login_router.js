const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwtSecret = '9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c';



// Enable display of login form 
router.get('/login', (req,res)=>{
    res.render('../views/login');
});


////////////////////////////////////////////////////////////////////////


//Enable collection of user login info while also allowing them to login
router.post('/login', (req, res)=>{

    // frontend data 
    let data = req.body;
    console.log(data);


    //store result after submission here
    let result = "";


    //send data to core api
    (async()=>{

      try{
        await axios.post('http://localhost:3000/api/v1/login', data)
        .then(function (response) {

          // store data from response
          result = response.data;


          // Check if user user credential was correct
          console.log(result)
          if(result.code === 0){

            //configure and create a sign token
            const maxAge = 3 * 60 * 60; //token life span 
            const token =  jwt.sign(
                {user_momo_number: result.existing_user.mobile_money_number, user_NIN_number: result.existing_user.NIN_number  },
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


            // add page redirection link to result object 
            result["redirectURL"] = "/dashboard";

            //send updated object
            res.send(result);
            return;
          }


          //Send error messages
          res.send(result);

        })
    
      }
      catch(error){

        res.status(400).json({
          message: "An error occurred",
          error: error.message,
        });

      }
     
    })();


})


module.exports = router; 