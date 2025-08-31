import { addToCart,getCartItems,decreaseItemQuantity,increaseItemQuantity } from "../controllers/cartController.js";
import  {verifyToken}  from "../middleware/verifyToken.js";
import express from 'express';

const router = express.Router();

router.post('/',verifyToken,addToCart);
router.post('/removeItem',verifyToken,decreaseItemQuantity);
router.post('/increaseItem',verifyToken,increaseItemQuantity);
router.get('/',verifyToken,getCartItems);

export default router;