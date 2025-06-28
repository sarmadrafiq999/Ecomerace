import userModel from "../models/userModel.js"




// add prodss... to cart
const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;

        console.log("Incoming Body:", req.body);
        console.log("UserID:", req.userID);

        if (!itemId || !size) {
            return res.status(400).json({ success: false, message: "Missing itemId or size" });
        }

        const userId = req.userID;
        const userData = await userModel.findById(userId);

        if (!userData) {
            console.log("User not found for ID:", userId);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        userData.cartData = cartData;
        console.log("🟡 Final cartData before saving:", cartData);
        userData.markModified('cartData');
        await userData.save();

        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        console.log("Add to cart ERROR:");
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// add prodss... to cart
const updateCart = async (req, res) => {

    try {
        const { itemId, size, quantity } = req.body
        const userId = req.userID;

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: " cart updated" })


    } catch (error) {
        console.log("Product add ERR", error);
        res.json({ success: false, message: error.message })

    }

}
// add prodss... to cart
const getUserCart = async (req, res) => {
    try {

        const userId = req.userID;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        res.json({ success: true, cartData })


    } catch (error) {
        console.log("Product add ERR", error);
        res.json({ success: false, message: error.message })

    }
}


export { addToCart, updateCart, getUserCart }