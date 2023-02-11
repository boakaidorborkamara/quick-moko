const express = require('express');
const router = express.Router();


router.get('/loan-calculator', (req,res)=>{
    res.render('../views/loan-calculator');
});


module.exports = router; 