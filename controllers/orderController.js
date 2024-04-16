import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// create new order
// POST /api/orders
// Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod,
        itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if(orderItems && orderItems.length === 0){
        return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
        orderItems: orderItems.map(x => ({
            ...x,
            product: x._id,
            _id: undefined
        })),
        user: req.user._id,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice
    });

    const createdOrder = await order.save();
    return res.status(201).json(createdOrder);
});

// Get login user order
// GET /api/orders/myorders
// Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    return res.status(200).json(orders);
});

// get order by id
// GET /api/orders/:id
// Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order
        .findById(req.params.id).populate('user', 'name email');

    if(order){
        return res.status(200).json(order);
    }else{
        return res.status(404).json({ message: 'No Order in this id' })
    }
});

// update order to paid
// PUT /api/orders/:id/pay
// Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    }else {
        return res.status(404).json({ message: 'No Order Found' })
    }

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