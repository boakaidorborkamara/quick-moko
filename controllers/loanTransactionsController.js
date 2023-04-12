const {Sequelize} = require('sequelize');


// include loan transtactions model
const db = require('../../config/db_config').loan_transactions_table;
const client = require('../../config/db_config').clients_table;
const loan_transaction_record = require('../../config/db_config').loan_transactions_table;




//contain information for response after user implement a specific CRUD action
let res_obj = {code: 0, message: "Ok"};


// Handle creation of loan transaction on POST
const loan_transtion_create = async (req, res)=>{

    try{

        //start

        // data from frontend
        console.log("LOAN TRANSACTION RECORD")
        let new_loan_transaction_details = req.body;
        // console.log(new_loan_transaction_details);

        let logged_in_user_NIN_number = new_loan_transaction_details.transaction_info.NIN_number;
        console.log("ssss NIN", logged_in_user_NIN_number);

        //get logged in user id
        let logged_in_user = await client.findOne(
            { where: { NIN_number: logged_in_user_NIN_number } }
        );

        // console.log("LOGGED IN USER" , logged_in_user);
        if(logged_in_user){
            console.log("MY ID", logged_in_user.id);
            // add logged in user ID to new loan transaction
            let logged_in_user_id = logged_in_user.id;
            new_loan_transaction_details.transaction_info.clientId = logged_in_user_id;
            console.log("NEW MODEL", new_loan_transaction_details);

             // save data in db 
            const client = await db.create(new_loan_transaction_details.transaction_info); 
            console.log("ADDED TO DB")
        }

        // save data in db 
        // const client = await db.create(new_loan_transaction_details.transaction_info); 
        // console.log("ADDED TO DB")

        res.status(201).send({code: 0, message: "Loan transaction record added"});

        //end
        
    }
    catch(err){
        console.log(err);
    }

}


// Handle diplay of loan transaction record on GET
const loan_transaction_list = async (req,res)=>{
    const loan_transaction = await db.findAll();
    res.status(200).send({code: 0, loan_transaction}); // send user response 
}


// Handle diplay of loan transaction record for current logged in user on GET
const specific_user_loan_transactions = async (req,res)=>{

    let id = req.params.id; 

    console.log("ID", id);

    const active_user = await client.findOne({
        where: {NIN_number: id}
    });

    let active_user_id = active_user.dataValues.id;
    // console.log(active_user_id)

    // console.log("ACTIVE USERS ID", active_user.dataValues.id);


    const loan_transaction = await loan_transaction_record.findAll({
        where: {clientId: active_user_id}
    });
    res.status(200).send({code: 0, loan_transaction}); // send user response 
}


// export controllers 
module.exports = {
    loan_transtion_create,
    loan_transaction_list,
    specific_user_loan_transactions
}