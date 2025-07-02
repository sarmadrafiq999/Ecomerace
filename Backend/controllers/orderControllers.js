// import { currency } from "../../admin/src/App.jsx";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

// Global var...
const currency = 'usd'
const deliveryCharge = 10

// gateway intialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing order using COD(cash on delivery) Method
const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, paymentMethod } = req.body
        const userId = req.userID;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod,
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// Placing order using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { items, amount, address } = req.body
        const userId = req.userID;
        const { origin } = req.headers
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency, // or 'usd'
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // convert dollars to cents
            },
            quantity: item.quantity
        }));

        // Add a separate line item for delivery charges
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharge * 100 // e.g., 10 USD = 1000 cents
            },
            quantity: 1
        });
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
            locale: 'auto',
        })
        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

// Verify Stripe
const verifyStripe = async (req, res) => {

    const userId = req.userID;
    const { orderId, success } = req.body

    try {

        if (success === "true" || success === true) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true })

        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })

        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }


}




//All orders data for the Admin pannal
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

//User Orders data for the frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.userID;
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}
//Update order status from the admin pannal
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status Updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}



export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe }