const express = require('express');
const app = express();


// PORT 
const PORT = process.env.PORT || 3600;


// set the view engine to ejs
app.set('view engine', 'ejs');

// serve images, css, js, etc 
app.use(express.static("public"));


// ROUTES 
const index_router = require('./router/index_router');
const registration_router = require('./router/registeration_router');
const login_router = require('./router/login_router');

app.use(index_router);
app.use(registration_router);
app.use(login_router);


app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
})