require('dotenv').config();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const base64 = require('base-64');


// setup credential from MTN portal 
let baseUrl = "https://proxy.momoapi.mtn.com";
let api_key = process.env.API_KEY;
let api_user_id =process.env.API_USER;
let disbursement_primary_subscription_key = process.env.DISBURSEMENT_PRIMARY_SUBSCRIPTION_KEY;


// Implement creation of access token for request of resources 
let createDisbursementAccessToken = async ()=>{

    try{
        
        // generate base64 encoded string using API Key and API user id seperated by a colum
        let joined_string = `${api_key}:${api_user_id}`;
        let base64_string = base64.encode(joined_string);
        
        
        // make request to MTN server 
        await axios.post(`${baseUrl}/disbursement/token/`, {
            
          },{
            headers:{

                "Authorization": `Basic ${base64_string}`,
                "Ocp-Apim-Subscription-Key": `${disbursement_primary_subscription_key}`,
                "Content-Type":"application/json",
                "X-Target-Environment": "mtnliberia"
                
            }
        })
        .then(function (response) {

            let access_token_obj = response.data;
            console.log("FIRST", access_token_obj);
            return access_token_obj;

        })
        .catch(function (error) {
 
            console.log(error);
            return 1
            
        });

    }
    catch(err){
        console.log(err);
    }


}


// Implement creation of Oauth2Token for request of resources 
let deposit = async ()=>{
    

    let api_key = await createAPIkey();
    let cutomized_base64_string = `${x_refrence_id}:${api_key}`


    // make a post request to sandbox while providing all details needed for a sucessful request 
    axios.post(`${baseUrl}/disbursement/v2_0/deposit`, {

        "amount": "5",
        "currency": "EURO",
        "externalId": "45544G",
        "payee": {
          "partyIdType": "MSISDN",
          "partyId": "0880526256"
        },
        "payerMessage": "QuickMoko is here for you",
        "payeeNote": "QuickMoko gives quick cash"

      },{
        headers:{

            "Authorization": "base64 string here",
            "X-Reference-Id": x_refrence_id,
            "X-Target-Environment":"quickmoko.com",
            "Ocp-Apim-Subscription-Key": process.env.DISBURSEMENT_PRIMARY_KEY,
            
        }
    })
    .then(function (response) {
        console.log(response);

        // return 0 if reques was sucessful 
        if(response.data){
            return 0
        }
    })
    .catch(function (error) {
        console.log(error);
        // return 1 if request wasn't sucessful 
        return 1
    });


} 




module.exports = {
    createDisbursementAccessToken
};