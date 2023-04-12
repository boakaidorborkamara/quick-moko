const express = require('express');
const router = express.Router();


// bring controller codes into this file 
const employeesController = require('../controllers/employeeController');


//create new employee on post
router.post('/api/v1/employees', employeesController.employee_create);

//get all employees
router.get('/api/v1/employees', employeesController.employee_list);

//Handle display of details for specific employee on GET
router.get('/api/v1/employees/:id', employeesController.employee_details);

// Handle edit of specific employee details on PUT 
router.put('/api/v1/employees/:id', employeesController.employee_edit);

//Handle delete of specific employee on DELETE
router.delete('/api/v1/employees/:id', employeesController.employee_delete);



module.exports = router;