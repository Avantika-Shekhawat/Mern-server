import express from 'express';
import * as dashboardController from "../controllers/dashboardController.js";

const router = express.Router();

// ✅ Fetch all products
router.get("/", dashboardController.getProducts);

// ✅ Update product by ID
router.put("/:id", dashboardController.updateProduct);

// ✅ Delete product by ID
router.delete("/:id", dashboardController.deleteProduct);

export default router;
