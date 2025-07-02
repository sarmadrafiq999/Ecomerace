import Review from "../models/Review.js";


const addReview = async (req, res) => {
    try {
        const { productId, rating, message } = req.body;

        // ✅ Use req.user._id instead of req.user.id
        const userId = req.user._id;

        console.log("Saving Review For:", {
            userId,
            productId,
            rating,
            message
        });

        // ✅ Ensure all required fields are provided
        if (!rating || !message || !productId) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }

        const newReview = new Review({
            user: userId,
            productId,
            rating,
            message
        });

        await newReview.save();

        res.status(201).json({
            success: true,
            message: "Review added successfully"
        });

    } catch (error) {
        console.error("Error while adding review:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// Get Average Rating
const getAverageRating = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId });

        if (reviews.length === 0) {
            return res.status(200).json({ avgRating: 0, count: 0 });
        }

        const avgRating =
            reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

        res.status(200).json({ avgRating, count: reviews.length });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Latest Reviews
const getLatestReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate("user", "name");

        res.status(200).json(reviews);
        console.log("Latest Populated Reviews:", reviews);

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Get All Reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .sort({ createdAt: -1 })
            .populate("user", "name")
            .populate("productId", "name")
        res.status(200).json(reviews);
        console.log("All  Reviews:", reviews);

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

// Delete a review by ID (admin only)
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Review.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export {
    addReview,
    getAverageRating,
    getLatestReviews,
    getAllReviews,
    deleteReview
};
