import User from "../models/userModel.js"



// token function
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExsist = await User.findOne({ email });

        if (!userExsist) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        const isMatch = await userExsist.comparepassword(password);
        const token = await userExsist.genrateToken();

        if (isMatch) {
            res.status(200).json({
                success: true,
                message: "Login Successfully",
                token,
                userId: userExsist._id.toString()
            });
        } else {
            return res.status(404).json({ success: false, message: "Invalid Password" });
        }

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


// Login user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // Email check
        const userExsisted = await User.findOne({ email })
        if (userExsisted) {
            return res.status(400).json({ message: "Use deffernt phone or email" })
        }
        const userCreated = await User.create({
            name,
            email,
            password,
        })
        const token = await userCreated.genrateToken()

        res.status(201).json({
            msg: "User created successfully",
            token,
            userId: userCreated._id.toString()
        })
        console.log(req.body);
    } catch (error) {
        console.log(error);

    }
}
// Admin login
const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userExsist = await User.findOne({ email });
        if (!userExsist) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        const isMatch = await userExsist.comparepassword(password);
        const token = await userExsist.genrateToken();

        if (!userExsist.admin) {
            return res.status(403).json({ message: "Access denied. Not an admin." });
        }

        if (isMatch) {
            return res.status(200).json({
                msg: "Login Successfully",
                token,
                userId: userExsist._id.toString()
            });
        } else {
            return res.status(404).json({ message: "Invalid Password" });
        }

    } catch (error) {
        console.error("Admin login error:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


export { loginUser, registerUser, adminLogin }