import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExsist = await User.findOne({ email });

    if (!userExsist) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isMatch = await userExsist.comparepassword(password);
    const token = await userExsist.generateToken();

    if (isMatch) {
      res.status(200).json({
        success: true,
        message: "Login Successfully",
        token,
        userId: userExsist._id.toString(),
      });
    } else {
      return res.status(404).json({ success: false, message: "Invalid Password" });
    }

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExisted = await User.findOne({ email });
    if (userExisted) {
      return res.status(400).json({ message: "Use different email or phone" });
    }

    const userCreated = await User.create({ name, email, password });
    const token = await userCreated.generateToken();

    res.status(201).json({
      msg: "User created successfully",
      token,
      userId: userCreated._id.toString(),
    });
    console.log(req.body);
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExsist = await User.findOne({ email });

    if (!userExsist) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isMatch = await userExsist.comparepassword(password);
    const token = await userExsist.generateToken();

    if (!userExsist.isAdmin) {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    if (isMatch) {
      return res.status(200).json({
        msg: "Login Successfully",
        token,
        userId: userExsist._id.toString(),
      });
    } else {
      return res.status(404).json({ message: "Invalid Password" });
    }

  } catch (error) {
    console.error("Admin login error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
