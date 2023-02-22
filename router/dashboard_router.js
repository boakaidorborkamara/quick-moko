const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const jwtSecret = "9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c";


const {auth} = require('../middleware/auth')


router.get('/dashboard', auth, (req,res)=>{
    const token = req.cookies.jwt;
    res.render('../views/dashboard');
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          // return res.status(401).json({ message: "Not authorized" })
          console.log("Not authorized")
          res.redirect("/")
        } else {
          console.log("Decoded token", decodedToken)
          next()
        }
    })
})


module.exports = router;