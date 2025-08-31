import userPurchaseModel from "../models/userPurchase.js";
import Product from "../models/products.js";
import cartModel from "../models/cart.js"; 


/**
 * Create or update a pending purchase for the user
 */
export const TotalPurchase = async (req, res) => {
  try {
    const { UserId, Products, TotalPrice } = req.body;

    if (
      !UserId ||
      !Products ||
      !Array.isArray(Products) ||
      Products.length === 0 ||
      !TotalPrice
    ) {
      return res.status(400).json({ msg: "Invalid data provided" });
    }

    // Either update existing pending order OR create new one
    const newPurchase = await userPurchaseModel.findOneAndUpdate(
      { UserId, Status: "Pending" },
      {
        $set: {
          UserId,
          Products,
          TotalPrice,
          Status: "Pending",
        },
      },
      { new: true, upsert: true }
    );

    res.status(201).json(newPurchase);
  } catch (error) {
    console.error("🔥 Backend error (TotalPurchase):", error);
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};

/**
 * Save shipping details for a user's pending order
 */
export const ShippingDetails = async (req, res) => {
  try {
    const UserId = req.user.id; // ✅ from JWT
    const formData = req.body;

    const addShippingDetails = await userPurchaseModel.findOneAndUpdate(
      { UserId, Status: "Pending" },
      {
        $set: {
          ShippingDetails: formData,
        },
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Shipping details saved successfully",
      data: addShippingDetails,
    });
  } catch (error) {
    console.error("🔥 Error saving shipping details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get the latest purchase details for logged-in user
 */
export const getPurchaseDetails = async (req, res) => {
  try {
    console.log("Decoded user from token:", req.user);

    const UserId = req.user.id;
    if (!UserId) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: No UserId found in token" });
    }

    // Fetch order directly for this user
    const order = await userPurchaseModel
      .findOne({ UserId, Status: "Pending" })
      .populate("Products.ProductId"); // ✅ correct path (capital P)

    if (!order) {
      return res.status(404).json({ msg: "No order found" });
    }

    console.log("✅ Order from backend:", order);
    res.status(200).json(order);
  } catch (error) {
    console.error("🔥 Error fetching purchase details:", error);
    res
      .status(500)
      .json({ msg: "Server error", error: error.message });
  }
};


export const confirmOrder = async (req, res) => {
  try {
    const UserId = req.user.id;
    console.log("reached here but not to order ");

    // Step 1: Confirm the pending order
    const order = await userPurchaseModel.findOneAndUpdate(
      { UserId, Status: "Pending" },
      { $set: { Status: "Confirmed" } },
      { new: true }
    );
     console.log("after order ");

    if (!order) {
      return res.status(404).json({ message: "No pending order found" });
    }

    // Step 2: Clear the cart for this user
    await cartModel.deleteMany({ UserId });

    res.status(200).json({ message: "Order confirmed and cart cleared", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error confirming order", error: error.message });
  }
};

