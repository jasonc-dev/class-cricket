const express = require('express');
const authController = require('../controllers/authController');
const subscriptionController = require('../controllers/subscriptionController');

const router = express.Router();

router.get(
  '/checkout-session/:courseId',
  authController.protect,
  subscriptionController.getCheckoutSession
);

module.exports = router;
