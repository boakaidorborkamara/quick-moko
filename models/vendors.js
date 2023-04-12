const { Sequelize, DataTypes, DATE } = require('sequelize');

const Vendor = (sequelize)=>{
    return sequelize.define('vendors', {
      // Model attributes
      id: {
        type: Sequelize.UUID, //require UUID from orm
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      logo: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING, 
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contact_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mobile_money_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
  }
  
  
 
  
  module.exports = Vendor;