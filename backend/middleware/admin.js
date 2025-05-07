const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "You are not signed in",
    });
  }
}

module.exports = { adminMiddleware };

// "title" :"java" ,
// "description":"learning Java",
// "imageUrl":"https://img30jfijf",
// "price": 2999

// 681a5df292175e245ef19ff2

// 681b002e47b58e1266cc62ee - pyhton
