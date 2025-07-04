
import cloudinary from "cloudinary"
import productModel from "../models/productModel.js"
// function for adding prod
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subcategory, sizes, bestseller } = req.body

        const image1 = req.files?.image1?.[0] || null;
        const image2 = req.files?.image2?.[0] || null;
        const image3 = req.files?.image3?.[0] || null;
        const image4 = req.files?.image4?.[0] || null;

        const images = [image1, image2, image3, image4].filter((items) => items !== null)
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )
        const productData = {
            name, description,
            price: Number(price),
            image: imageUrl,
            category,
            subcategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            date: Date.now()

        }
        console.log("productData", productData);
        // ----------savind PROD to DB ------------//
        const Product = new productModel(productData)
        //
        await Product.save()

        res.json({ success:true, message: "Added successfully" })
    } catch (error) {
        console.log("Product add ERR", error);
        res.json({ success: false, message: error.message })
    }
}
// function for Product List
const productList = async (req, res) => {

    try {
        const products = await productModel.find({})
        res.json({ success: true, products })

    } catch (error) {
        console.log("Product getting  ERR", error);
        res.json({ success: false, message: error.message })

    }

}

// function for remove prod
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "removed successfully" })

    } catch (error) {
        console.log("Product deleting  ERR", error);
        res.json({ success: false, message: error.message })
    }
}
// function for Single prod
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const products = await productModel.findById(productId)
        res.json({ success: true, products })
    } catch (error) {
        console.log("Product getting single prod...  ERR", error);
        res.json({ success: false, message: error.message })

    }
}


export { addProduct, productList, removeProduct, singleProduct }