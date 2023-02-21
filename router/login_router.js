const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/login', (req,res)=>{
    res.render('../views/login');
});


router.post('/login', (req, res)=>{
    // res.send({"message":"Adding new soon...."});

    let data = req.body;
    console.log(data);

    let result = "";

    //send data to core api
    (async()=>{

      try{
        await axios.post('http://localhost:3000/api/v1/login', data)
        .then(function (response) {
          console.log(response.data);
          result = response.data;
          res.send(result);
        })
    
      }
      catch(err){
        console.log(err); 
        res.send(err);
      }
     
    })();
})


module.exports = router; 