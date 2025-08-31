import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET all customers
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-Password"); // exclude password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers", error: err.message });
  }
});

export default router;
