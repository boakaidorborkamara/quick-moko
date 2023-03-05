const express = require('express');
const router = express.Router();
const axios = require('axios');
const { json } = require('express');
const jwt = require('jsonwebtoken');
const jwtSecret = '9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c';





// Display loan transaction page 
router.get('/loan-transaction', (req,res)=>{

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



            (async ()=>{
            

                console.log(decodedToken);
                await axios.get(`http://localhost:3000/api/v1/loan_transactions/${decodedToken.user_NIN_number}`)
                .then((response)=>{
                    user_loan_transactions = response.data.loan_transaction;
                    // console.log("RESULT", response_result);
                    // res.render('../views/dashboard');
                    // res.render('../views/dashboard', {user:response_result});

                })
                .catch((err)=>{
                    if(err){
                        console.log(err);
                    }
                })

                axios.get("http://localhost:3000/api/v1/clients/"+logged_in_user_id)
                .then((response)=>{
                    let response_result = response.data;
                    // console.log(response_result);
                    // res.render('../views/dashboard');
                    console.log("RESULT", user_loan_transactions);

                    res.render('../views/loan-transaction', {user:response_result, loan_transactions:user_loan_transactions});

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


    // res.render('../views/loan-transaction');
});



// Handle payment of loans by impelementing deposits of cash to user momo number
router.post('/request_loan', async (req,res)=>{

    let loan_info = req.body;
    // let currency = "";

    console.log(loan_info);
    // loan_amount = JSON.stringify(loan_amount);


    // Get logged in user unique info and add it to loan info object
    const token = req.cookies.jwt;
    
    let active_user = "";

    jwt.verify(token, jwtSecret, (err, decodedToken) => {

        if (!err) {
          console.log("Not authorized")
        //   res.redirect("/")
        
          console.log("Logged in user", decodedToken);
          loan_info.momo_number = decodedToken.user_momo_number;
          loan_info.NIN_number = decodedToken.user_NIN_number;

          console.log(loan_info);

        }
    })


    //Send Data to Backend
    try{

        await axios.post('http://localhost:3000/api/v1/receive_loan', loan_info)
        .then(function (response) {
        //   console.log(response.data);
          result = response.data;
        //   console.log( "core response", result);
        //   return res.send(result);
        });


        await axios.post('http://localhost:3000/api/v1/loan_transactions', result)
        .then(function (response) {
        //   console.log(response.data);
          result = response.data;
          console.log( "added to loan transaction record");
          return res.send(result);
        })

        // console.log( "core response OUTSITE", result);
 
    }
    catch(err){
        console.log(err); 
        res.send(err);
    }

});



async function upDateLoanTransactionModel(transaction){


     //Send Data to Backend
     try{

        await axios.post('http://localhost:3000/api/v1/loan_transactions', transaction)
        .then(function (response) {
          console.log(response.data);
          result = response.data;
          console.log( "core response", result);
          return res.send(result);
        })
 
    }
    catch(err){
        console.log(err); 
        res.send(err);
    }

}


// function getUserUniqueInfo(){

//     const token = req.cookies.jwt;
    
//     let active_user = "";

//     jwt.verify(token, jwtSecret, (err, decodedToken) => {

//         if (!err) {
//           console.log("Not authorized")
//         //   res.redirect("/")
        
//           console.log("Logged in user", decodedToken);
//         }
//     })
// }

module.exports = router;