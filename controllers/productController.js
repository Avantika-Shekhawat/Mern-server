import Product from '../models/products.js'; // ✅

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const saved = await product.save();
        res.status(201).json(saved);
        console.log("✅ Product created");
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log("❌ Error creating product");
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.json(allProducts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get products by category
export const getProductByCategory = async (req, res) => {
    try {
        const items = await Product.find({ Pcategory: req.params.category });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

