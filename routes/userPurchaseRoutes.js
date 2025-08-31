import { TotalPurchase, ShippingDetails, getPurchaseDetails, confirmOrder } 
  from '../controllers/userPurchaseController.js';
import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log(`userPurchaseRoutes hit: ${req.method} ${req.path}`);
  next();
});

router.post('/TotalPurchase', verifyToken, TotalPurchase);
router.post('/ShippingDetails', verifyToken, ShippingDetails);
router.get('/getDetail', verifyToken, getPurchaseDetails);
router.post('/confirm', verifyToken, confirmOrder);

export default router;
