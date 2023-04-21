const jwt = require("jsonwebtoken")
const jwtSecret = "9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c";


// Enable protection of specific routes 
let auth = async (req, res, next) => {

  try{

    // get cookies from request obj 
    const token = req.cookies.jwt;

    // check if cookies exist 
    if (token) {

      // validate cookies and see if is real 
      jwt.verify(token, jwtSecret, (err, decodedToken) => {

        if (err) {
          // stop user from accessing protected route if cookies is invalid 
          res.redirect("/");
        } else {
          next()
        }

      })

    } else {

      res.redirect("/");

    }
  
  }
  catch(err){

    if(err){
      console.log(err);
    }

  }

}


// Enable protection of specific routes 
let getLoggedInUserCredential = async (req, res) => {

  try{

    // get cookies from request obj 
    const token = req.cookies.jwt;
    console.log(token);

    // check if cookies exist 
    if (token) {

      // validate cookies and see if is real 
      jwt.verify(token, jwtSecret, (err, decodedToken) => {

        if (err) {
          // stop user from accessing protected route if cookies is invalid 
          res.redirect("/");
        } else {

          let logged_in_user_id = decodedToken.user_id;
          return 1;

        }

      })

    } else {

      res.redirect("/");

    }

    return 0;
  
  }
  catch(err){

    if(err){
      console.log(err);
    }

  }

}



module.exports = {
  auth,
  getLoggedInUserCredential
}