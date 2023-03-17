const {Sequelize} = require('sequelize');


// include employee model
const db = require('../../config/db_config').employee_table;


//contain information for response after user implement a specific CRUD action
let res_obj = {code: 0, message: "Ok"};


// Handle creation of employee on POST
const employee_create = async (req, res)=>{

    // data from frontend
    let new_employee_details = req.body;
    console.log(new_employee_details);

    // save data in db 
    const vendor = await db.create({
        first_name: new_employee_details.first_name,
        middle_name: new_employee_details.middle_name,
        last_name: new_employee_details.last_name, 
        position: new_employee_details.position,
        department: new_employee_details.department,
        cash_amount: new_employee_details.cash_amount,
        purpose: new_employee_details.purpose,
        logo: new_employee_details.log,
        mobile_money_number: new_employee_details.mobile_money_number
            
    }); 

    res.status(201).send({code: 0, message: "Employee added"});

}


// Handle diplay of employee on GET
const employee_list = async (req,res)=>{
    const employee = await db.findAll();
    res.status(200).send({code: 0, employee}); // send user response 
}


//Handle display of specific employee on GET
const employee_details = async (req, res)=>{

    // id for the employee that detail you want to see 
    let employee_id = req.params.id;
    console.log(employee_id);
     
    
    const employee = await db.findByPk(employee_id);
    // check if id is invalid 
    if (employee === null) {

        // modify res obj 
        res_obj.code = 1;
        res_obj.message = "Employee not valid";

        res.status(400).send(res_obj);

    } else {
        
        // modify res obj 
        res_obj.code = 0;
        res_obj.message = employee;

        res.status(200).send(JSON.stringify(res_obj));
    }

}


// Handle edit of specific employee details on PUT 
const employee_edit = async (req, res)=>{

    // id for employee info we want to edit 
    let employee_id = req.params.id;

    //new info for modification
    let new_info = req.body;
    console.log(new_info);


    await db.update(new_info,{
        where:{
            id:employee_id
        }
    });


    // modify request obj 
    res_obj.code = 0;
    res_obj.message = "Employee modified"

    res.status(200).send(JSON.stringify(res_obj));
}


//Handle delete of specific employee on DELETE
const employee_delete = async (req, res)=>{
    
    // id for employee info we want to edit 
    let employee_id = req.params.id;

    await db.destroy({
        where: {
            id: employee_id
        }
    });

    // modify res_obj 
    res_obj.code = 0;
    res_obj.message = "Success, employee deleted.";

    res.status(200).send(JSON.stringify(res_obj));
}


// export controllers 
module.exports = {
    employee_create,
    employee_list,
    employee_details,
    employee_edit,
    employee_delete
}