const bcrypt = require('bcrypt');


//Encrypt user password
let hashUserPassword = async(password)=>{

    //implement configuration for hashing
    const saltRounds = 10;
    const myPlaintextPassword = password;

    // implement hashing store hash password in this variable 
    let hash_password = await bcrypt.hash(myPlaintextPassword, saltRounds);


    return hash_password;

}



module.exports = {hashUserPassword};