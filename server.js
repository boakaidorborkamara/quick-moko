require('dotenv').config();
const db = require('./config/db_config');
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors')
const app = express();


// PORT 
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs'); // set the view engine to ejs
app.use(express.static("public")); // serve images, css, js, etc 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors());


//ROUTES 
const index_router = require('./routes/index_router');
const register_router = require('./routes/register_router');
const login_router = require('./routes/login_router');
const dashboard_router = require('./routes/dashboard_router');
// const apply_for_loan_router = require('./routes/apply_for_loan_router');
// const view_loan_transaction_router = require('./routes/loan_transactions_router');
const verify_router = require('./routes/verify_router');


// JSON DATA ROUTES 
const client_routers = require('./routes/clients_router');
const loan_transactions_router = require('./routes/loan_transactions_router');
// const payment_transactions_router = require('./api/routes/payment_transactions_router');
// const vendors_router = require('./api/routes/vendor_router');
// const login_router = require('./api/routes/login_router');
// const deposit_router = require('./api/routes/deposit_router');


// VIEWS
app.use(index_router);
app.use(register_router);
app.use(login_router);
app.use(dashboard_router);
// app.use(loan_calculator_router);
// app.use(apply_for_loan_router);
// app.use(view_loan_transaction_router);

// JSON Data 
app.use(client_routers);
app.use(loan_transactions_router);
// app.use(payment_transactions_router);
// app.use(vendors_router);
// app.use(login_router);
// app.use(deposit_router);
app.use("/verify", verify_router);


app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
})