const express = require('express');
// const { authUser } = require('../controllers/userController');
const router = express.Router();
const {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

// router.route('/products/:id').get(getProductById);

module.exports = router;
