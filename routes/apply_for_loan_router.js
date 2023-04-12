const express = require('express');
const router = express.Router();


router.get('/apply', (req,res)=>{
    res.render('../views/apply_for_loan');
});


module.exports = router; 