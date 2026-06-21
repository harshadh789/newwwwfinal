const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const { requireAuth } = require('../middleware/auth');

// Public routes
router.get('/packages', contentController.getPackages);
router.get('/destinations', contentController.getDestinations);

// Protected routes
router.post('/inquiries', requireAuth, contentController.submitInquiry);
router.get('/inquiries/me', requireAuth, contentController.getMyInquiries);

module.exports = router;
