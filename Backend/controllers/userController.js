import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

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

// Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OWNER_EMAIL,
        pass: process.env.OWNER_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.OWNER_EMAIL,
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
    });

    res.json({ message: "Reset link sent to email." });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    res.status(500).json({ message: "Failed to send reset email", error: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // 1. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. Find the user
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 3. Assign the new password (plain), hash will be handled by mongoose hook
    user.password = newPassword;
    await user.save();

    // 4. Respond to client
    res.json({ message: "Password reset successfully" });

  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(400).json({ message: "Invalid or expired token", error: error.message });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  forgotPassword,
  resetPassword
};
