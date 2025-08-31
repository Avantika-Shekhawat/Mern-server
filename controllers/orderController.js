import userPurchaseModel from '../models/userPurchase.js';
import Product from "../models/products.js";

// Get all confirmed orders
export const GetOrders = async (req, res) => {
  try {
    const orders = await userPurchaseModel.find({ Status: "Confirmed" })
      .populate("Products.ProductId")
      .populate("UserId", "Email Username");
      
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

// Update order status
export const UpdateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // order ID
    const { status } = req.body;

    // Update the order's status
    const updatedOrder = await userPurchaseModel.findByIdAndUpdate(
      id,
      { Status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // If status is "Order Completed", decrease stock for each product
    if (status === "Order Completed") {
      for (const item of updatedOrder.Products) {
        await Product.findByIdAndUpdate(
          item.ProductId,
          { $inc: { Stock: -item.Quantity } }, // use ordered quantity
          { new: true }
        );
      }
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error updating order", error: err.message });
  }
};
