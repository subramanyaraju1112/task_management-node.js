import User from "../models/auth.js";

const handleSignupUser = async (req, res) => {
  try {
    const { username, email, password, role = "user" } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist!" });
    } else {
      await User.create({ username, email, password, role: "user" });
      return res.status(201).json({ message: "Account Created Successfully!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Creating Account", error: error.message });
  }
};

export default handleSignupUser;
