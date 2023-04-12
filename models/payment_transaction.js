const { Sequelize, DataTypes, DATE } = require('sequelize');

const PaymentTransaction = (sequelize)=>{
    return sequelize.define('payment_transactions', {
      // Model attributes
      id: {
        type: Sequelize.UUID, //require UUID from orm
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING, 
        allowNull: false
      }
      // client_id: { //foreign_key
      //   type: DataTypes.STRING,
      //   allowNull: true
      // },
      // vendor_id: { //foreign_key
      //   type: DataTypes.STRING,
      //   allowNull: true
      // }
    });
  
  }
  
  
  module.exports = PaymentTransaction;