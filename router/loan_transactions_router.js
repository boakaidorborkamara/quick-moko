const express = require('express');
const router = express.Router();
const axios = require('axios');
const { json } = require('express');

// Display loan transaction page 
router.get('/loan-transaction', (req,res)=>{
    res.render('../views/loan-transaction');
});

// Handle payment of loans by impelementing deposits of cash to user momo number
router.post('/request_loan', async (req,res)=>{

    let loan_amount = req.body;
    // let currency = "";

    console.log(loan_amount);
    // loan_amount = JSON.stringify(loan_amount);


    try{

        await axios.post('http://localhost:3000/api/v1/receive_loan', loan_amount)
        .then(function (response) {
          console.log(response.data);
          result = response.data;
          console.log( "core response", result);
        //   return res.send(result);
        })
 
    }
    catch(err){
        console.log(err); 
        res.send(err);
    }


    //Communicate with core api to initiate payment
    // console.log("laon amount", loan_amount);
    res.send({"msg":"Getting result from backend on frontend app"});
});



module.exports = router;