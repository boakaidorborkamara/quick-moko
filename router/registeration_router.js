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
    console.log(data);

    let result = "";

    (async()=>{

      try{
        console.log("Async fnx running");
        console.log("Async fnx running in try peri");

        await axios.post('http://localhost:3000/api/v1/clients', data)
        .then(function (response) {
          console.log(response.data);
          result = response.data;
          res.send(result);
        })
        


        // result = await axios.post('https://quickmokoapi.glitch.me/api/v1/clients', data);
        // console.log(result);
  
        // res.send(result);
      }
      catch(err){
        console.log(err); 
        res.send(err);
      }
     
    })();
})


module.exports = router;