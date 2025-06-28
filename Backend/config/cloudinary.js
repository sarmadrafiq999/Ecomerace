import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const conectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // ✅ correct
        api_key: process.env.CLOUDINARY_API_KEY,        // ✅ correct
        api_secret: process.env.CLOUDINARY_API_SECRET   // ✅ correct
    });
};

export default conectCloudinary;
