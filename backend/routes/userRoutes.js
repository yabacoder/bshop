const express = require('express');
// const { authUser } = require('../controllers/userController');
const router = express.Router();
const { authUser, getUserProfile} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware')

router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);

// router.route('/products/:id').get(getProductById);

module.exports = router;
