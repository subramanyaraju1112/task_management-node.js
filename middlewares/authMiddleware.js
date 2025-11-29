import jwt from "jsonwebtoken";
import User from "../models/auth.js";

const checkAuthentication = async (req, res, next) => {
  try {
    // check for Authorization Headers
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: "No Authorization Header" });
    }
    // check for JWT Token
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token Not Found" });
    }
    // verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await checkuserInDB(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication Failed", error: error.message });
  }
};

const checkuserInDB = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return user;
};

const userOnly = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access Denied! Users Only" });
  }
  next();
};

export { checkAuthentication, userOnly };
