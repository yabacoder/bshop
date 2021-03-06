const express = require('express');
const router = express.Router();
const { addOrderItems, getOrderById } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');


router.route('/').post(protect, addOrderItems);
router.route('/:id').get( getOrderById);
module.exports = router;
