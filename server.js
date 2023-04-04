require('dotenv').config();
const db = require('./config/db_config');
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors')
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
// app.use(cors());



// VIEW ROUTES 
const index_router = require('./router/index_router');
const registration_router = require('./router/registeration_router');
// const login_router = require('./router/login_router');
const dashboard_router = require('./router/dashboard_router');
const loan_calculator_router = require('./router/loan_calculator_router');
const apply_for_loan_router = require('./router/apply_for_loan_router');
const view_loan_transaction_router = require('./router/loan_transactions_router');
const verify_otp_router = require('./router/verify_otp_router');


// JSON DATA ROUTES 
const index_routers = require('./api/routes/index_router');
const client_routers = require('./api/routes/clients_router');
const loan_transactions_router = require('./api/routes/loan_transactions_router');
const payment_transactions_router = require('./api/routes/payment_transactions_router');
const vendors_router = require('./api/routes/vendor_router');
const login_router = require('./api/routes/login_router');
const deposit_router = require('./api/routes/deposit_router');


// VIEWS
app.use(index_router);
app.use(registration_router);
app.use(login_router);
app.use(dashboard_router);
app.use(loan_calculator_router);
app.use(apply_for_loan_router);
app.use(view_loan_transaction_router);

// JSON Data 
app.use(client_routers);
app.use(loan_transactions_router);
app.use(payment_transactions_router);
app.use(vendors_router);
// app.use(login_router);
app.use(deposit_router);
// app.use(verify_otp_router);


app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
})