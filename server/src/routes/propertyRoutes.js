import express, { Router } from "express";
import { createProperty, deleteProperty, getAllProperties, getPropertyById, updateProperty } from "../controllers/propertyControllers";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorize.js";
const router=express.Router();
router.post('/',authMiddleware,authorize("user","admin"),createProperty)
router.get('/',getAllProperties)
router.get('/:id',getPropertyById)
router.put('/:id',authMiddleware,authorize("user","admin"),updateProperty)
router.delete('/:id',authMiddleware,authorize("user","admin"),deleteProperty)
export default router;