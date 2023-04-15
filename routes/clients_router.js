const express = require('express');
const router = express.Router();


// bring controller codes into this file 
const clientsController = require('../controllers/clientController')


//create new client on post
router.post('/clients', clientsController.client_create);

//get all clients
router.get('/clients', clientsController.client_list);

//Handle display of details for specific client on GET
router.get('/clients/:id', clientsController.client_details);

// Handle edit of specific client details on PUT 
router.put('/clients/:id', clientsController.client_edit);

//Handle delete of specific client on DELETE
router.delete('/clients/:id', clientsController.client_delete);



module.exports = router;