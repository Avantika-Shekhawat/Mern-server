import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post('/register', userController.register);
router.post('/signin', userController.signin); // Fixed: "sigin" → "signin"

export default router;
