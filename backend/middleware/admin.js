import jwt from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config";

function adminMiddleware(req, res, next) {
  const token = req.body.token;

  const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

  if (decoded) {
    req.adminId = decoded.id;
    next();
  } else {
    res.status(403).json({
      msg: " you are not signed in",
    });
  }
}

module.exports = {
  adminMiddleware: adminMiddleware,
};
