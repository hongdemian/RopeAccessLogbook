const jwt = require("jsonwebtoken");

exports.loginRequired = (req, res, next) => {
  //get raw header token
  let authHeader =
    req.headers["x-access-token"] || req.headers["authorization"];
  if (authHeader) {
    //strip 'Bearer' and store token;
    const token = authHeader["Authorization"].split(" ")[1];
    console.log(token);

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (decoded) {
        req.decoded = decoded;
        next();
      } else {
        return res.json({
          success: false,
          message: "Token is invalid"
        });
      }
    });
  } else {
    return res.json({
      status: 401,
      success: false,
      message: "Auth token is not supplied"
    });
  }
};

exports.ensureCorrectUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({ status: 401, message: "Unathorized" });
      }
    });
  } catch (e) {
    console.log(e);
  }
};
