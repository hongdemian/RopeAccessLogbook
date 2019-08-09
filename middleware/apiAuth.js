const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //get raw header token
  let authHeader =
    req.headers["x-access-token"] || req.headers["authorization"];
  if (authHeader) {
    //strip 'Bearer' and store token;
    const token = authHeader["Authorization"].split(" ")[1];
    console.log(token);

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is invalid"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};

module.exports = {
  verifyToken
};
