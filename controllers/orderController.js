import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// create new order
// POST /api/orders
// Private
const addOrderItems = asyncHandler(async (req, res) => {
    return res.send('Add order item')
});

// Get login user order
// GET /api/orders/myorders
// Private
const getMyOrders = asyncHandler(async (req, res) => {
    return res.send('Get my orders')
});

// get order by id
// GET /api/orders/:id
// Private
const getOrderById = asyncHandler(async (req, res) => {
    return res.send('get order by id')
});

// update order to paid
// GET /api/orders/:id/pay
// Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    return res.send('update to paid')
});

// update order to delivered
// GET /api/orders/:id/deliver
// Private/Admin
const updateOrderToDeliver = asyncHandler(async (req, res) => {
    return res.send('update to deliver')
});

// get all orders
// GET /api/orders
// Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    return res.send('get all orders')
});

export {
    getOrders,
    updateOrderToPaid,
    addOrderItems,
    updateOrderToDeliver,
    getMyOrders,
    getOrderById
}