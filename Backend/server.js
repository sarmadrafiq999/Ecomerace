
import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectdb from "./config/mongodb.js"
import conectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoutes.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoutes.js"
import contactRouter from "./routes/contactRoute.js"
import subscriberRoutes from "./routes/subscriberRoutes.js";


// App config
const app = express()
const port = process.env.PORT || 4000
connectdb()
conectCloudinary()

// middlewares
app.use(express.json())
app.use(cors({
    origin: "https://ecomerace-frontend.vercel.app",
    credentials: true
}));

// Api end points
app.get('/', (req, res) => {
    res.send("working")
})

app.use("/api/user", userRouter)

// ------Product Route-------
app.use("/api/product", productRouter)

// Cart Here
app.use("/api/cart", cartRouter)

// Orders Route is Here************
app.use("/api/order", orderRouter)
// ----------contact
app.use("/api/contact", contactRouter)

// ----------subscribe
app.use("/api/newsletter", subscriberRoutes);


//  server start
app.listen(port, () =>
    console.log("Server response : ", port)
)
