require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verifyToken
      next();
    } else {
      return res.status(403).json({ message: "UnAuthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(403).json({
      status: true,
      message: error.message,
    });
  }
};

module.exports = authenticateUser;
