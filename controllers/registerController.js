// Display the registration page 
function displayRegistrationPage(req,res){
    return res.render('../views/register');
}


// Add new user to database  
function RegisterUser(req,res){
    return res.send('Registering');
}


module.exports ={ 
    displayRegistrationPage,
    RegisterUser
}