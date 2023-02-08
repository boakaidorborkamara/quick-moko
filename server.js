const express = require('express');


// PORT 
const PORT = process.env.PORT || 3000;

const app = express();


app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
})