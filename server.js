import express from 'express';
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
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Allowed origins for CORS
const allowedOrigins = [
  "https://www.dlcproperties.in",
  "https://dlcproperties.in",
  "http://localhost:5173" // local testing
];

// CORS configuration
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://www.dlcproperties.in",
    "https://dlcproperties.in",
    "http://localhost:5173"
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});


// Handle preflight OPTIONS requests
app.options('*', cors());

app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('API is Running');
});


// API routes
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/userPurchase', userPurchaseRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/customers", CustomerRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Failed", err));

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
