const { Sequelize, DataTypes, DATE, BOOLEAN } = require('sequelize');


// defines a new sequelize model 
const Client = (sequelize)=>{
  return sequelize.define('clients', {
    // Model attributes
    id: {
      type: Sequelize.UUID, //require UUID from orm
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middle_name: {
      type: DataTypes.STRING,  
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    otp_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pin_code: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    home_address: {
      type: DataTypes.STRING,
    },
    contact_number: {
      type: DataTypes.STRING,
    },
    position_at_job: {
      type: DataTypes.STRING,
    },
    salary_deposit_to_mobile_money: {
      type: DataTypes.BOOLEAN,
    },
    mobile_money_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monthly_salary: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
    },
    profile_image: {
      type: DataTypes.STRING,
      defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSNXj1w-ssziSYzpofb8u0Jjwzt4JzQ5PcsJ7FAlRDsevjCyjeVpsfc5hrad5-N6N0oU4&usqp=CAU",
      
    },
    national_id: {
      type: DataTypes.STRING
    },
    NIN_number: {
      type: DataTypes.STRING,
    },
    
    // employer's info 
    employer_name: {
      type: DataTypes.STRING, 
    },
    employer_address: {
      type: DataTypes.STRING,
    },
    hr_fullname: {
      type: DataTypes.STRING,
    },
    hr_home_address: {
      type: DataTypes.STRING,
    },
    hr_phone_number: {
      type: DataTypes.STRING,
    },
    employment_contract: {
      type: DataTypes.STRING,
    },
    employment_letter: {
      type: DataTypes.STRING,
    }, 
    
    // guarantor's info 
    guarantor_fullname: {
      type: DataTypes.STRING,
    },
    guarantor_date_of_birth: {
      type: DataTypes.STRING,
    },
    guarantor_home_address: {
      type: DataTypes.STRING,
    },
    guarantor_phone_number: {
      type: DataTypes.STRING,
    },
    guarantor_relationship_to_creditor: {
      type: DataTypes.STRING,
    },
    mou_from_guarantor: {
      type: DataTypes.STRING
    },
    guarantor_government_issued_id: {
      type: DataTypes.STRING
    },

    // extra info 
    accept_policy: {
      type: DataTypes.BOOLEAN
    },
    loan_limit: {
      type: DataTypes.STRING,
    },
    validation_process_complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    passed_validation: {
      type: DataTypes.BOOLEAN
    },
    password:{
      type:DataTypes.STRING
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }, 
  });

}


module.exports = Client;