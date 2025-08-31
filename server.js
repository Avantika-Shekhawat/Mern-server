// server.js
import express from 'express';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import userPurchaseRoutes from './routes/userPurchaseRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import CustomerRoutes from './routes/CustomerRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

const app = express();

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors({
  origin: "https://www.dlcproperties.in",  // frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Serve React static files
app.use(express.static(join(__dirname, "build")));

// API routes
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/userPurchase', userPurchaseRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/customers", CustomerRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Fallback to React for client-side routing
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "build", "index.html"));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Failed", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
