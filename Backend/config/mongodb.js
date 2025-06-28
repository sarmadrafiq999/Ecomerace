import mongoose from "mongoose";

//
const connectdb = async (params) => {
    mongoose.connection.on("connected", () => {
        console.log("DB Conected");
})

await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}
export default connectdb;