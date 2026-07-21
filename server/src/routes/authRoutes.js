import express, { Router } from "express";
import { Login, Register } from "../controllers/authController.js";
const router=express.Router();
router.post('/',Register)
router.get('/',Login)
export default router;