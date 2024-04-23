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

// create product
// POST /api/products
// Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    });

    const createdProduct = await product.save();
    return res.status(201).json(createdProduct);
});

export {
    getProducts,
    getProductById,
    createProduct
}