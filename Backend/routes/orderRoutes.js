

import express from "express"
import { allOrders, placeOrder, placeOrderStripe, updateStatus, userOrders, verifyStripe } from "../controllers/orderControllers.js"
import adminMiddleware from "../middleware/admin-middleware.js"
import authMiddleware from "../middleware/auth-middleware.js"
// import userModel from "../models/userModel.js"

const orderRouter = express.Router()
// Admin Features
orderRouter.post('/list', authMiddleware, adminMiddleware, allOrders)
orderRouter.post('/status',authMiddleware, adminMiddleware, updateStatus)

// payment Features
orderRouter.post('/place', authMiddleware, placeOrder)
orderRouter.post('/stripe', authMiddleware, placeOrderStripe)
// User Features
orderRouter.post('/userorders', authMiddleware, userOrders)
// verify payment
orderRouter.post('/verifyStripe',authMiddleware,verifyStripe)

export default orderRouter