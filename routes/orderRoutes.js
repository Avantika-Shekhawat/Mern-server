import express from "express";
import { GetOrders, UpdateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.get("/", GetOrders);
router.put("/:id", UpdateOrderStatus);

export default router;
