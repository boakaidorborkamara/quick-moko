const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require("jsonwebtoken")
const jwtSecret = "9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c";


const {auth} = require('../middleware/auth')


router.get('/dashboard',  async (req,res)=>{

    // current host 
    let host = req.headers.host;

    const token = req.cookies.jwt;
    
    let dynamic_login_in_user_id = "";

    let user_loan_transactions = "";

    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          console.log("Not authorized")
          res.redirect("/")
          return
        } else {
          console.log("Logged in user", decodedToken);

            //start
            let logged_in_user_id = decodedToken.user_id;

            let url =  `//${host}/api/v1/loan_transactions/${decodedToken.user_id}`;
            console.log(url);

            (async ()=>{
            

                console.log(decodedToken);

                // get loan transactions 
                await axios.get(url)
                .then((response)=>{

                    user_loan_transactions = response.data;
                    
                })
                .catch((err)=>{
                    if(err){
                        console.log(err);
                    }
                })


                // get logged in user details 
                axios.get(`//${host}/api/v1/clients/${logged_in_user_id}`)
                .then((response)=>{

                    let response_result = response;
                    res.render('../views/dashboard', {user:response_result.data, loan_transactions:user_loan_transactions});

                })
                .catch((err)=>{
                    if(err){
                        console.log(err);
                    }
                })


              //end
            })();
        }
    })

    
})


module.exports = router;