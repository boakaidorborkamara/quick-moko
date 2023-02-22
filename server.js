const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();


// PORT 
const PORT = process.env.PORT || 3700;


// set the view engine to ejs
app.set('view engine', 'ejs');

// serve images, css, js, etc 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


// ROUTES 
const index_router = require('./router/index_router');
const registration_router = require('./router/registeration_router');
const login_router = require('./router/login_router');
const dashboard_router = require('./router/dashboard_router');
const loan_calculator_router = require('./router/loan_calculator_router');
const apply_for_loan_router = require('./router/apply_for_loan_router');
const loan_transaction_router = require('./router/loan_transactions_router');



app.use(index_router);
app.use(registration_router);
app.use(login_router);
app.use(dashboard_router);
app.use(loan_calculator_router);
app.use(apply_for_loan_router);
app.use(loan_transaction_router);


app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
})