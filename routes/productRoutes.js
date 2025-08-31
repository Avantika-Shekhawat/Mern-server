import express from 'express';
import * as productController from "../controllers/productController.js";

const router = express.Router();

router.post('/cp',productController.createProduct);
router.get('/gap',productController.getAllProducts);
router.get('/category/:category',productController.getProductByCategory);
router.get('/:id',productController.getProductById);



export default router;
