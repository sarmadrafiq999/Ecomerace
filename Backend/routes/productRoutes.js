import express from "express"
import { addProduct, productList, removeProduct, singleProduct } from "../controllers/productController.js"
import upload from "../middleware/multer.js"
import adminMiddleware from "../middleware/admin-middleware.js"
import authMiddleware from "../middleware/auth-middleware.js"


const productRouter = express.Router()

productRouter.post('/add', authMiddleware, adminMiddleware, upload.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 },]), addProduct)
productRouter.post('/remove', authMiddleware, adminMiddleware, removeProduct)
productRouter.post('/single', singleProduct)
productRouter.get('/list', productList)

export default productRouter