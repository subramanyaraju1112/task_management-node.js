import jwt from "jsonwebtoken";
import User from "../models/auth.js";

const checkAuthentication = async (req, res, next) => {
  try {
    // check for Authorization Headers
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res.status(401).json({ message: "No Header Provider" });
    }
    // check for JWT Token
    const token = authorizationHeader.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token Not Found" });
    }
    // verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const userExists = checkuserInDB(req.user.id);
    if (!userExists) {
      return res.status(401).json({ message: "User Not Found" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unauthorized", error: error.message });
  }
};

const checkuserInDB = async (userId) => {
  try {
    const user = await User.findById({ userId });
    console.log("Check User", user);
    return true;
  } catch (error) {
    return false;
  }
};

const userOnly = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access Denied! Users Only" });
  }
  next();
};

export default { checkAuthentication, userOnly };
