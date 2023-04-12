const generator = require('generate-password');
const bcrypt = require('bcrypt');


// Generates a new password for each registered user 
let generateRegisteredUserPassword = async()=>{

    // generate new password 
    let generated_password = await generator.generate({
        length: 10,
        numbers: true
    });

    console.log("GENERATED PASSWORD", generated_password);
    
    // hash generated passwords 
    let hash_password = encryptGeneratedPassword(generated_password);

    return hash_password;
 
}


/////////////////////////////////////////////////////////////////////////////////////////


//Encrypt generated password
let encryptGeneratedPassword = async(password)=>{

    //implement configuration for hashing
    const saltRounds = 10;
    const myPlaintextPassword = password;

    // implement hashing store hash password in this variable 
    let hash_password = await bcrypt.hash(myPlaintextPassword, saltRounds);


    return hash_password;

}



module.exports = {generateRegisteredUserPassword};