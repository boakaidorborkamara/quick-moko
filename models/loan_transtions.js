const { Sequelize, DataTypes, DATE } = require('sequelize');
const ClientsModel = require('./clients');


const LoanTransaction = (sequelize)=>{
    return sequelize.define('loan_transactions', {
      // Model attributes
      id: {
        type: Sequelize.UUID, //require UUID from orm
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      loan_amount: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      amount_to_payback: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      transaction_date: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      payback_status: {
        type: DataTypes.STRING,
        defaultValue: "Due Payment", 
        allowNull: false
      }, 
      due_date: {
        type: DataTypes.STRING, 
        allowNull: false
      },
    });
  
  }
  
  
module.exports = LoanTransaction;