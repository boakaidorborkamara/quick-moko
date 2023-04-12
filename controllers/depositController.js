const {createAPIuser,validateAPIuser,tempGenerateAcessToken,createAccessToken} = require('../helper/implementPayments');

const handleDeposit = async (req, res)=>{
    try{

        let transaction_info = req.body;
        console.log(transaction_info)
        // await createAPIuser();
        // await validateAPIuser();
        // let api_key = await tempGenerateAcessToken ();
        // console.log("api key in controller", api_key);
        res.send({code: 0, message:"Successful", transaction_info});
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {
    handleDeposit
}