const express = require('express');
const router = express.Router();


router.get('/login', (req,res)=>{
    res.render('../views/login');
});


router.post('/login', (req, res)=>{
    res.send({"message":"Adding new soon...."})
})

module.exports = router; 