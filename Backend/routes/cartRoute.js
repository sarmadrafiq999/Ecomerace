

import express from "express"
import { addToCart, getUserCart, updateCart } from "../controllers/cartControllers.js"
import authMiddleware from "../middleware/auth-middleware.js"




const cartRouter = express.Router()


cartRouter.post('/add', authMiddleware, addToCart)
cartRouter.post('/get', authMiddleware, getUserCart)
cartRouter.post('/update', authMiddleware, updateCart)

export default cartRouter