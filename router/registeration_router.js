const express = require('express');
const axios = require('axios');
const router = express.Router();

// displays html registration form 
router.get('/register', (req,res)=>{
    res.render('../views/register');
});


// send data collected from form
router.post('/register', (req,res)=>{
    // res.render('../views/register');
    // console.log(req.body);

    let data = req.body;

    axios.post('http://localhost:3000/api/v1/clients', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });


    res.send(JSON.stringify({message: 'working'}));
})


module.exports = router;