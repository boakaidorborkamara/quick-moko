const {Sequelize} = require('sequelize');
const DataTypes = require('sequelize').DataTypes;


// import models 
const ClientsModel = require('../api/models/clients');
const LoanTransactionsModel = require('../api/models/loan_transtions');
const PaymentTransactionsModel = require('../api/models/payment_transaction');
const VendorsModel = require('../api/models/vendors');


//create a new instance of sequelize and connect to database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'quickmokoDB.db'
});

//Verify if database connection was successfully created
(async function (){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();


//create database tables from models
let clients_table = ClientsModel(sequelize);
let loan_transactions_table = LoanTransactionsModel(sequelize);
let payment_transactions_table = PaymentTransactionsModel(sequelize);
let vendors_table = VendorsModel(sequelize);





// SEQUELIZE ASSOCIATION starts >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Create one to many relationship with foreign key stored in loan_transaction table
clients_table.hasMany(loan_transactions_table);
loan_transactions_table.belongsTo(clients_table);


//Create one to many relationship with foreign key stored in payment_transaction table
clients_table.hasMany(payment_transactions_table);
payment_transactions_table.belongsTo(clients_table);


//Create one to many relationship with foreign key stored in payment_transaction table
vendors_table.hasMany(payment_transactions_table);
payment_transactions_table.belongsTo(vendors_table);

// SEQUELIZE ASSOCIATION ends >>>>>>>>>>>>>>>>>>>>>>>>>>>>>







// synchronize all of the above models  
(async ()=>{
    await sequelize.sync();
    console.log("All models were synchronized successfully.");

})();




module.exports = {
  clients_table,
  loan_transactions_table,
  payment_transactions_table,
  vendors_table,
}





