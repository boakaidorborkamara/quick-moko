const {Sequelize} = require('sequelize');


// include vendor model
const db = require('../../config/db_config').vendors_table;


//contain information for response after user implement a specific CRUD action
let res_obj = {code: 0, message: "Ok"};


// Handle creation of vendor on POST
const vendor_create = async (req, res)=>{

    // data from frontend
    let new_vendor_details = req.body;
    console.log(new_vendor_details);

    // save data in db 
    const vendor = await db.create({
        name:new_vendor_details.name,
        logo: new_vendor_details.logo, 
        address: new_vendor_details.address ,
        email: new_vendor_details.email, 
        contact_number: new_vendor_details.contact_number,
        mobile_money_number: new_vendor_details.mobile_money_number,
        password: new_vendor_details.password ,
            
    }); 

    res.status(201).send({code: 0, message: "Loan transaction record added"});

}


// Handle diplay of vendors on GET
const vendor_list = async (req,res)=>{
    const vendor = await db.findAll();
    res.status(200).send({code: 0, vendor}); // send user response 
}


//Handle display of specific vendor on GET
const vendor_details = async (req, res)=>{

    // id for the vendor that detail you want to see 
    let vendor_id = req.params.id;
    console.log(vendor_id);
     
    
    const vendor = await db.findByPk(vendor_id);
    // check if id is invalid 
    if (vendor === null) {

        // modify res obj 
        res_obj.code = 1;
        res_obj.message = "Vendor not valid";

        res.status(400).send(res_obj);

    } else {
        
        // modify res obj 
        res_obj.code = 0;
        res_obj.message = vendor;

        res.status(200).send(JSON.stringify(res_obj));
    }

}


// Handle edit of specific vendor details on PUT 
const vendor_edit = async (req, res)=>{

    // id for vendor info we want to edit 
    let vendor_id = req.params.id;

    //new info for modification
    let new_info = req.body;
    console.log(new_info);


    await db.update(new_info,{
        where:{
            id:vendor_id
        }
    });


    // modify request obj 
    res_obj.code = 0;
    res_obj.message = "Vendor modified"

    res.status(200).send(JSON.stringify(res_obj));
}


//Handle delete of specific vendor on DELETE
const vendor_delete = async (req, res)=>{
    
    // id for vendor info we want to edit 
    let vendor_id = req.params.id;

    await db.destroy({
        where: {
            id: vendor_id
        }
    });

    // modify res_obj 
    res_obj.code = 0;
    res_obj.message = "Success, vendor deleted.";

    res.status(200).send(JSON.stringify(res_obj));
}


// export controllers 
module.exports = {
    vendor_create,
    vendor_list,
    vendor_details,
    vendor_edit,
    vendor_delete
}