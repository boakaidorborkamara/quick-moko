const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require("jsonwebtoken")
const jwtSecret = "9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c";


const {auth} = require('../middleware/auth')


router.get('/dashboard',  (req,res)=>{
    const token = req.cookies.jwt;
    
    let dynamic_login_in_user_id = "";

    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          console.log("Not authorized")
          res.redirect("/")
          return
        } else {
          console.log("Logged in user", decodedToken);

            //start

            let logged_in_user_id = decodedToken.user_NIN_number;

            axios.get("http://localhost:3000/api/v1/clients/"+logged_in_user_id)
            .then((response)=>{
                let response_result = response.data;
                console.log(response_result);
                // res.render('../views/dashboard');
                res.render('../views/dashboard', {user:response_result});

            })
            .catch((err)=>{
                if(err){
                    console.log(err);
                }
            })


          //end
        }
    })

    
})


module.exports = router;