const {Sequelize} = require('sequelize');


// include loan transtactions model
const db = require('../../config/db_config').payment_transactions_table;


//contain information for response after user implement a specific CRUD action
let res_obj = {code: 0, message: "Ok"};


// Handle creation of payment transaction on POST
const payment_transtion_create = async (req, res)=>{

    // data from frontend
    let new_payment_transaction_details = req.body;
    console.log(new_payment_transaction_details);

    // save data in db 
    const payment_transaction = await db.create({
              amount: new_payment_transaction_details.amount
    }); 

    res.status(201).send({code: 0, message: "Payment transaction record added"});

}


// Handle diplay of payment transaction record on GET
const payment_transaction_list = async (req,res)=>{
    const payment_transaction = await db.findAll();
    res.status(200).send({code: 0, payment_transaction}); // send user response 
}


// export controllers 
module.exports = {
    payment_transtion_create,
    payment_transaction_list
}