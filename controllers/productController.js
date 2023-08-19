import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// fetch all products
// /api/products
// Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    return res.json(products);
});

// fetch single product by id
// /api/products/:id
// Public
const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if(product) {
        return res.json(product);
    }else{
        res.status(404);
        throw new Error('Resource not Found');
    }
});

export {
    getProducts,
    getProductById,
}