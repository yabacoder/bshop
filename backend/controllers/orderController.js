const express = require('express');
const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel.js');
const User = require('../models/userModel.js');

const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;
	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
		return;
	} else {
		// console.log(req.user);
		const order = new Order({
			orderItems,
			user: req.user,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});
		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email',
		User
	);
	if (order) {
		res.json(order);
	} else {
		res.statu(404);
		throw new Error('Not found');
	}
});

/**
 * @desc Update order to paid
 * @route GET /api/orders/:id/pay
 * @access Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
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
	} else {
		res.statu(404);
		throw new Error('Not found');
	}
});

module.exports = { addOrderItems, getOrderById };
