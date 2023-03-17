require('dotenv').config();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const base64 = require('base-64');


let baseUrl = "https://sandbox.momodeveloper.mtn.com";
let x_refrence_id  = "075423d5-e6fb-487f-b856-bd1e80565d17";
let disbursement_primary_subscription_key = process.env.DISBURSEMENT_PRIMARY_KEY;
console.log(x_refrence_id);

 
// Implement creation of new api user 
let createAPIuser = async ()=>{

    // make a post request to sandbox while providing all details needed for a sucessful request 
    axios.post(`${baseUrl}/v1_0/apiuser`, {
        "providerCallbackHost": "quickmoko.com"
      },{
        headers:{
            "X-Reference-Id": x_refrence_id,
            "Ocp-Apim-Subscription-Key": dis,
            "Content-Type":"application/json"
            
        }
    })
    .then(function (response) {
        console.log(response.status);
        console.log(response.statusText)

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


// Validates if API user was actually created 
let validateAPIuser = async ()=>{

    // make a post request to sandbox while providing all details needed for a sucessful request 
    axios.get(`${baseUrl}/v1_0/apiuser/${x_refrence_id}`,{
        headers:{
            "X-Reference-Id": x_refrence_id,
            "Ocp-Apim-Subscription-Key": disbursement_primary_subscription_key
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
        console.log(error);
        return 1
    });
}


// Implement creation of api key for api user in the sandbox 
let createAPIkey = async ()=>{


    let generated_api_key = "";

    try{
        
        // make a post request to sandbox while providing all details needed for a sucessful request 
       generated_api_key = await axios.post(`${baseUrl}/v1_0/apiuser/${x_refrence_id}/apikey`, {},
        {
            headers:{
                "Ocp-Apim-Subscription-Key": disbursement_primary_subscription_key
            }
        })
        .then((response)=> {
            // console.log(response.data);
            // return response;
            // console.log("apikey in .then", generated_api_key);
            // return  "generated_api_key"
            return response.data
            // return "generated api key1"
        })
        .catch(function (error) {
            console.log(error);
            // return 1 if request wasn't sucessful 
            return error
        });

        // console.log("generated_api_key");
        return "generated api key"
    
    }
    catch(err){
        console.log(err);
    }
    
}


// Implement creation of access token for request of resources 
let createAccessToken = async (user_api_key)=>{

    try{

        let api_key = user_api_key;
        console.log("API KEY", api_key);
        let customized_plain_string = `${x_refrence_id}:${api_key}`;
        let base64_string = base64.encode(customized_plain_string);

        console.log("base64 string", base64_string);
        
        // make a post request to sandbox while providing all details needed for a sucessful request 
        axios.post(`${baseUrl}/v1_0/apiuser/${x_refrence_id}/apikey`, {
            
          },{
            headers:{

                "Authorization": base64_string,
                "Ocp-Apim-Subscription-Key": disbursement_primary_subscription_key,
                
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
    catch(err){
        console.log(err);
    }


}


// Implement creation of Oauth2Token for request of resources 
let createOauth2Token = async ()=>{

    let api_key = await createAPIkey();
    let cutomized_base64_string = `${x_refrence_id}:${api_key}`
    
    // make a post request to sandbox while providing all details needed for a sucessful request 
    axios.post(`${baseUrl}/disbursement/oauth2/token/`, {
        
      },{
        headers:{

            "Authorization": "base64 string here",
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


// Implement creation of Oauth2Token for request of resources 
let depositCash = async ()=>{
    

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



// Short term solution for generating access token 
let tempGenerateAcessToken = async ()=>{

    try{
        
        // make a post request to sandbox while providing all details needed for a sucessful request 
       generated_api_key = await axios.post(`${baseUrl}/v1_0/apiuser/${x_refrence_id}/apikey`, {},
        {
            headers:{
                "Ocp-Apim-Subscription-Key": disbursement_primary_subscription_key
            }
        })
        .then((response)=> {
            let generated_api_key = response.data.apiKey;
            console.log(generated_api_key);

            // create access token after generating api key 
            createAccessToken(generated_api_key);
            
        })
        .catch(function (error) {
            console.log(error);
            // return 1 if request wasn't sucessful 
            return error
        });

        // console.log("generated_api_key");
        return "generated api key"
    
    }
    catch(err){
        console.log(err);
    }
    
}


module.exports = {
    createAPIuser,
    validateAPIuser,
    createAPIkey,
    createAccessToken,
    tempGenerateAcessToken
};