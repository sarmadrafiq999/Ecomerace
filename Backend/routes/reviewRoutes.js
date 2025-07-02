import express from "express";

import { addReview, deleteReview, getAllReviews, getAverageRating, getLatestReviews } from "../controllers/reviewController.js";
// import { verifyToken } from "../middleware/auth.js";
import authMiddleware from "../middleware/auth-middleware.js";
import adminMiddleware from "../middleware/admin-middleware.js";

const reviewRouter = express.Router();

reviewRouter.post("/", authMiddleware, addReview);
reviewRouter.get("/average/:productId", getAverageRating);
reviewRouter.get("/latest/:productId", getLatestReviews);
reviewRouter.get("/all", getAllReviews);
reviewRouter.get("/admin/all", authMiddleware, adminMiddleware, getAllReviews);
reviewRouter.delete("/:id", authMiddleware, adminMiddleware, deleteReview);


export default reviewRouter;