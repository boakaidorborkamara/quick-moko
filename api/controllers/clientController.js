const { response } = require('express');
const {Sequelize} = require('sequelize');
const {registrationSucessfulSmsNotification} = require('../helper/sendSMS');
const {generateRegisteredUserPassword} = require('../helper/generatePassword');


// include client model
const db = require('../../config/db_config').clients_table;


//contain information for response after user implement a specific CRUD action
let res_obj = {code: 0, message: "Ok"};


// Handle creation of client on POST
const client_create = async (req, res)=>{

    try{

        // get data from frontend
        let new_client_details = req.body; 

        //generate and add password to new client details
        console.log('running new client pass')
        // let new_client_password = await generateRegisteredUserPassword();
        // console.log(console.log("IN CLIENT CONTROLLER", new_client_password));
        new_client_details.password = new_client_password;
        console.log(new_client_details);

        // get NIN number from frontend 
        let NIN_number_from_frontend = new_client_details.NIN_number;


        //check in database if the user already exist
        let existing_client = await db.findOne({
            where: {NIN_number: NIN_number_from_frontend}
        });


        // notify user if the user already exist
        if(!existing_client){

            // Add new user if not exist 
            const client = await db.create(new_client_details);

            // modify response object
            res_obj.code = 0;
            res_obj.message = "Registration Successful";
            console.log(res_obj);

            // send registration sucessful sms Notification
            let new_user_contact = new_client_details.contact_number;
            let new_user_firstname = new_client_details.first_name;
            
 
            // format new user contact number 
            new_user_contact = new_user_contact.substring(1);
            console.log(new_user_contact);
            registrationSucessfulSmsNotification(new_user_contact, new_user_firstname);


            JSON.stringify(res_obj);
            res.status(201).send(res_obj); 
            return;    
        }
        else{

            // Notify that user exist
            res_obj.code = 1;
            res_obj.message = "User already exist, check your NIN Number!";
            console.log(res_obj)

            JSON.stringify(res_obj);
            res.status(403 ).send(res_obj); 
        }
        
    }
    catch(err){
        console.log(err);

        if(err){
             // modify response object
            res_obj.code = 1;
            res_obj.message = "We have encounter a server error";
            JSON.stringify(res_obj);
 
            res.status(500).send(res_obj); 
        }
    }

}
 

// // Handle diplay of client on GET
const client_list = async (req,res)=>{
    const clients = await db.findAll();
    res.status(200).send({code: 0, clients}); 
}


//Handle display of specific client on GET
const client_details = async (req, res)=>{

    // id for the client that detail you want to see 
    let client_id = req.params.id;
    console.log(client_id);
    let res_obj= {}
     
    // res.send({"msg": "Client details working"});


    //get client details using the client id
    let client_details = await db.findOne({
        where: {NIN_number: client_id}
    });

    console.log("Client Details", client_details);

    
    // const client = await db.findByPk(client_id);
    // check if id is invalid 
    if (!client_details) {

        // modify res obj 
        res_obj.code = 1;
        res_obj.message = "Client not valid";

        res.status(400).send(res_obj);

    } else {
        
        // modify res obj 
        res_obj.code = 0;
        res_obj.message = client_details;

        res.status(200).send(JSON.stringify(res_obj));
        return;
    }

    res.send(JSON.stringify(client_id));
}


// Handle edit of specific client details on PUT 
const client_edit = async (req, res)=>{

    // id for client who info we want to edit 
    let client_id = req.params.id;

    //new info for modification
    let new_info = req.body;
    console.log(new_info);


    await db.update(new_info,{
        where:{
            id:client_id
        }
    });


    // modify request obj 
    res_obj.code = 0;
    res_obj.message = "Client modified"

    res.status(200).send(JSON.stringify(res_obj));
}


//Handle delete of specific client on DELETE
const client_delete = async (req, res)=>{
    
    // id for person info we want to edit 
    let client_id = req.params.id;

    await db.destroy({
        where: {
            id: client_id
        }
    });

    // modify res_obj 
    res_obj.code = 0;
    res_obj.message = "Success, client deleted.";

    res.status(200).send(JSON.stringify(res_obj));
}


// export controllers 
module.exports = {
    client_create,
    client_list,
    client_details,
    client_edit,
    client_delete
}