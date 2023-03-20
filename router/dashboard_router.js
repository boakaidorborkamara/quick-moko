const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require("jsonwebtoken")
const jwtSecret = "9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c";


const {auth} = require('../middleware/auth')


router.get('/dashboard',  async (req,res)=>{

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
            let logged_in_user_id = decodedToken.user_NIN_number;

            let url =  `//${host}/api/v1/loan_transactions/${decodedToken.user_NIN_number}`;
            console.log(url);

            (async ()=>{
            

                console.log(decodedToken);

                // get loan transactions 
                await axios.get(url)
                .then((response)=>{
                    console.log("FIRST AXIOS WORKING")
                    user_loan_transactions = response.data;
                    console.log(user_loan_transactions);
                    // console.log("RESULT", response_result);
                    // res.render('../views/dashboard');
                    // res.render('../views/dashboard', {user:response_result});

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
                    console.log("USER", response_result.data.message);
                    // res.render('../views/dashboard');
                    // console.log("RESULT", user_loan_transactions);

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