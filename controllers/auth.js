import bcrypt from "bcrypt";
import User from "../models/auth.js";
import generateToken from "../utils/generateToken.js"

const handleSignupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });
    return res.status(201).json({ message: "Account Created Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Creating Account", error: error.message });
  }
};

const handleSigninUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }
    const findUser = await User.findOne({ email }).select("+password");
    if (!findUser) {
      return res.status(400).json({ message: "User doesn't exist, Sign-Up" });
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = generateToken(findUser);
    return res.status(200).json({
      message: "Login Successfull",
      token,
      user: {
        id: findUser._id,
        username: findUser.username,
        email: findUser.email,
        role: findUser.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};

export default { handleSignupUser, handleSigninUser };
