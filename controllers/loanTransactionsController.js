// include loan transtactions model
const {Sequelize} = require('sequelize');

// import loan transaction and clients_table from database model 
const db = require('../config/db_config').loan_transactions_table;
const client = require('../config/db_config').clients_table;
const loan_transaction_record = require('../config/db_config').loan_transactions_table;


const jwt = require("jsonwebtoken");
const jwtSecret = "9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c";


//contain information for response after user implement a specific CRUD action
let res_obj = {code: 0, message: "Ok"};



//////////////////////////////////////////////////////////////////////////////////////////////////



//displays loan transaction page 
const loan_transaction_page = async (req, res)=>{

    try{

        res.render('../views/loan-transaction');
        return
        res.send({"msg":"loan tranaction view loading"});

    }
    catch(err){

        console.log(err);

    }
}


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

    try{


        // get logged in user id 
        let logged_in_user_id = "";
        const token = req.cookies.jwt; 
        jwt.verify(token, jwtSecret, (err, decodedToken) => {

            logged_in_user_id = decodedToken.user_id;

        });


        // get loan transactions for logged in user 
        const loan_transaction = await db.findAll({
            where: {
              id: logged_in_user_id
            }
        });

        
        // send user response
        res.status(200).send({code: 0, loan_transaction});  
    
    }
    catch(err){

        console.log(err);
        // send user response
        res.status(500).send({code: 1, err}); 
    }
    
}


// Handle diplay of loan transaction record for current logged in user on GET
const specific_user_loan_transactions = async (req,res)=>{

    let user_id = req.params.id; 


    // get user transactions from db 
    const loan_transaction = await loan_transaction_record.findAll({
        where:{
            id:user_id
        }
    });


    // send user response
    res.status(200).send({code: 0, loan_transaction}); 
    
    
}



/////////////////////////////////////////////////////////////////////////////////////////////////////



// export controllers 
module.exports = {
    loan_transaction_page,
    loan_transtion_create,
    loan_transaction_list,
    specific_user_loan_transactions
}