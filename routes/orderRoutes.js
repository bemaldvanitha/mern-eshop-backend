import express from "express";

import { addOrderItems, updateOrderToPaid,
    updateOrderToDeliver, getMyOrders,
    getOrders, getOrderById } from '../controllers/orderController.js';
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', protect, admin, getOrders);
router.post('/', protect, addOrderItems);
router.get('/mine', protect, getMyOrders);
router.get('/:id', protect, admin, getOrderById);
router.put('/:id/pay',protect, updateOrderToPaid);
router.put('/:id/deliver',protect, admin, updateOrderToDeliver);

export default router;