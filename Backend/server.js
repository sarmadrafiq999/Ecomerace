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
import reviewRouter from "./routes/reviewRoutes.js"

// App config
const app = express()
const port = process.env.PORT || 4000
connectdb()
conectCloudinary()

// ✅ Enable JSON parsing (this was missing)
app.use(express.json())

// ✅ CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",         // ✅ newly added
    "http://localhost:5174",         // existing
    "https://ecomerace-frontend.vercel.app",
    "https://ecomerace-admin.vercel.app",
    "https://ecomerace-admin-6ayqnyjtv-sarmad-rafiqs-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};
app.use(cors(corsOptions));


// ✅ Routes
app.get('/', (req, res) => {
  res.send("working")
})

app.use("/api/user", userRouter)
app.use("/api/product", productRouter)  
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/contact", contactRouter)
app.use("/api/newsletter", subscriberRoutes)
app.use("/api/reviews",reviewRouter)

// ✅ Server start
app.listen(port, () =>
  console.log("Server response : ", port)
)
