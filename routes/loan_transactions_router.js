const express = require('express');
const router = express.Router();
let loanTransactionController = require('../controllers/loanTransactionsController');
let auth = require('../middleware/auth');


// Display loan transaction page 
router.get('/loan-transactions', auth.auth, loanTransactionController.loan_transaction_page);


// Get all loan transactions in json
router.get('/loan/transactions_list', loanTransactionController.loan_transaction_list);

 
// Get user specific loan transactions 
router.get('/loan/transactions/:id', loanTransactionController.specific_user_loan_transactions);


// Process user request for loan and add the transaction details to db
router.post('/loan/request', loanTransactionController.loan_transtion_create);




module.exports = router;