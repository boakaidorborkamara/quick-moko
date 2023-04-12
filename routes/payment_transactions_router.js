const express = require('express');
const router = express.Router();


// bring controller codes into this file 
const paymentTransactionController = require('../controllers/paymentTransactionsController');


//create new loan transaction record on post
router.post('/api/v1/payment_transactions', paymentTransactionController.payment_transtion_create);


//get all loan transactions
router.get('/api/v1/payment_transactions', paymentTransactionController.payment_transaction_list);



module.exports = router;