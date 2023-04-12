const express = require('express');
const router = express.Router();


// bring controller codes into this file 
const vendorController = require('../controllers/vendorsController')


//create new vendor on post
router.post('/api/v1/vendors', vendorController.vendor_create);


//get all vendors
router.get('/api/v1/vendors', vendorController.vendor_list);


//Handle display of details for specific vendor on GET
router.get('/api/v1/vendors/:id', vendorController.vendor_details);


// Handle edit of specific vendor details on PUT 
router.put('/api/v1/vendors/:id', vendorController.vendor_edit);


//Handle delete of specific vendor on DELETE
router.delete('/api/v1/vendors/:id', vendorController.vendor_delete);



module.exports = router;