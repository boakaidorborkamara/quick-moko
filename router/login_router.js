const express = require('express');
const router = express.Router();
const axios = require('axios');
// const jwt = require('jsonwebtoken');
const jwtSecret = '9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c';



router.get('/login', (req,res)=>{
    res.render('../views/login');
});


router.post('/login', (req, res)=>{
    // res.send({"message":"Adding new soon...."});

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
          console.log(response.data);
          result = response.data;

          res.send(result);


          //new code

           //configure and create a sign token
          //  console.log('configuring and creating a sign token');
          //  const maxAge = 3 * 60 * 60; //token life span 
          //  const token =  jwt.sign(
          //      {user_momo_number: existing_user.mobile_money_number, user_NIN_number: existing_user.NIN_number  },
          //      jwtSecret,
          //      {
          //      expiresIn: maxAge, // 3hrs in sec
          //      }
          //  );

          //  console.log(token)

          //  // res.send({"msg":"User exist"});

          //  res.cookie("jwt", token, {
          //      httpOnly: true,
          //      maxAge: maxAge * 1000, // 3hrs in ms
          //  });

          //end

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