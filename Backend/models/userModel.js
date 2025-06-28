import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean, default: false,
    },
    cartData: { type: Object, default: {} },

}, { minimize: false })
userSchema.pre("save", async function (next) {
    console.log("pre data", this);
    const user = this
    if (!user.isModified("password")) {
        next()
    }
    try {
        const saltRoun = await bcrypt.genSalt(10)
        const hashingPassword = await bcrypt.hash(user.password, saltRoun)
        user.password = hashingPassword
    } catch (error) {
        console.log(error);
    }

})



userSchema.methods.genrateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d"
            }

        )
    } catch (error) {
        console.log(error);
    }
}


userSchema.methods.comparepassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const userModel = new mongoose.model("User", userSchema);
export default userModel
