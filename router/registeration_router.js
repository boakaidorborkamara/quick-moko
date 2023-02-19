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
    // data = JSON.stringify(data);
    // console.log(data);

    let result = "";

    (async()=>{
      try{
        await axios.post('https://quickmokoapi.glitch.me/api/v1/clients', data)
        .then(function (response) {
          console.log("RESPONSE", response.data);
          result = response.data
        })
        .catch(function (error) {
          console.log(error);
        });


       res.send(JSON.stringify(result));
      }
      catch(error){
        console.log(error);
      }
    })();
})


module.exports = router;