const jwt = require("jsonwebtoken")
const jwtSecret = "9c1bcf23c2cd0fb8e0563fdd63343ec4220750129ae617d703383d6cfcf60f1138d37c";


// Enable protection of specific routes 
let auth = (req, res, next) => {
  console.log("auth code working");
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // return res.status(401).json({ message: "Not authorized" })
        console.log("Not authorized")
        res.redirect("/")
      } else {
        // console.log("Decoded token", decodedToken)
        next()
      }
    })
  } else {
    return res
      .status(401)
      // .json({ message: "Not authorized, token not available" });
      console.log("Not authorized, token not available");
  }
}


module.exports = {auth}