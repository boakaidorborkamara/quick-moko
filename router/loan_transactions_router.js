const express = require('express');
const router = express.Router();


router.get('/loan-transaction', (req,res)=>{
    res.render('../views/loan-transaction');
})


module.exports = router;