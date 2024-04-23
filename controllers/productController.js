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

// update product
// PUT /api/products/:id
// Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category,
        countInStock } = req.body;
    
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        return res.status(200).json(updatedProduct);
    } else {
        return res.status(404).json({ message: 'Product not found' });
    }
});

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
}