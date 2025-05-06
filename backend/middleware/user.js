import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../config";

function userMiddleware(req, res, next) {
  const token = req.body.token;

  const decoded = jwt.verify(token, JWT_USER_PASSWORD);

  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    res.status(403).json({
      msg: " you are not signed in",
    });
  }
}

module.exports = {
  userMiddleware: userMiddleware,
};
