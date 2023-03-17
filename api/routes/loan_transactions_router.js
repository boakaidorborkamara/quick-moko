const express = require('express');
const router = express.Router();


// bring controller codes into this file 
const loanTransactionController = require('../controllers/loanTransactionsController')


//create new loan transaction record on post
router.post('/api/v1/loan_transactions', loanTransactionController.loan_transtion_create);


//get all loan transactions
router.get('/api/v1/loan_transactions', loanTransactionController.loan_transaction_list);



//get all loan transactions
router.get('/api/v1/loan_transactions/:id', loanTransactionController.specific_user_loan_transactions);




module.exports = router;