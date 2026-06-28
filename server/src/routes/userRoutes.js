const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');

// All user routes require authentication
router.use(requireAuth);

router.get('/me', userController.getMe);
router.put('/me', userController.updateMe);
router.get('/wishlist', userController.getWishlist);
router.post('/wishlist', userController.addToWishlist);
router.delete('/wishlist/:id', userController.removeFromWishlist);

module.exports = router;
