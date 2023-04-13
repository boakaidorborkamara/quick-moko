const express = require('express');

// Display home page 
const indexController = async (req,res)=>{
    res.render('../views/index');
}


module.exports = {
    indexController
}