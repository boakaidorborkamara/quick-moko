const jwt = require("jsonwebtoken");
const jwtSecret = "9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c";

// include client model
const db = require('../config/db_config').clients_table;
const loan_transaction_record = require('../config/db_config').loan_transactions_table;




// displays user dashboard 
let displayDashboardPage = async (req,res)=>{


    try{

        // get logged in user 
        let logged_in_user_id = "";
        let token = req.cookies.jwt;
        jwt.verify(token, jwtSecret, (err, decodedToken) => {

            logged_in_user_id = decodedToken.user_id;

        });


        // get logged_in_user_info 
        let logged_in_user_profile = await db.findOne({
            where: {id: logged_in_user_id}
        });
    

        //get logged in user loan transaction records
        let logged_in_user_transactions = await loan_transaction_record.findAll({
            where: {clientId: logged_in_user_id}
        });


        // display dashboard with user info 
        res.render('../views/dashboard', {user:logged_in_user_profile.dataValues, loan_transactions:logged_in_user_transactions});


    }
    catch(err){
        console.log(err);
    }

}


module.exports = {
    displayDashboardPage
}