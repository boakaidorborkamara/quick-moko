const express = require('express');
const router = express.Router();


router.get('/register', (req,res)=>{
    res.render('../views/register');
})


module.exports = router;