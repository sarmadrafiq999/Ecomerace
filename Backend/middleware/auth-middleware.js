import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: Token not provided",
        });
    }

    try {
        const jwtToken = token.replace(/^Bearer\s+/i, "").trim();
        console.log("Received JWT:", jwtToken);

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const user = await User.findOne({ email: isVerified.email }).select({
            password: 0,
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        req.token = token;
        req.userID = user._id;

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token",
        });
    }
};

export default authMiddleware;
