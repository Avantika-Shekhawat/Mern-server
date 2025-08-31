import mongoose from "mongoose";

const userPurchaseSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  Products: [
    {
      ProductId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      Quantity: { type: Number, default: 1 },
    },
  ],
  TotalPrice: {
    type: Number,
    required: true,
  },
  ShippingDetails: {
    firstName: String,
    lastName: String,
    address: String,
    country: String,
    state:String,
    city: String,
    pinCode: String,
    phone: String,
  },
  Status: {
    type: String,
    default: "Pending",
  },

}, { timestamps: true });

export default mongoose.model("UserPurchase", userPurchaseSchema);
