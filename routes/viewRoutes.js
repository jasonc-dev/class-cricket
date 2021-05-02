/* eslint-disable prettier/prettier */
const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const subscriptionController = require('../controllers/subscriptionController');

const router = express.Router();

router.get('/my-courses', authController.protect, viewsController.getMyCourses);

router.get(
  '/course/:slug/videos',
  authController.protect,
  viewsController.getCourseVideos
);

router.get(
  '/',
  subscriptionController.createSubscriptionCheckout,
  authController.isLoggedIn,
  viewsController.getLandingPage
);

router.get(
  '/find-us',
  authController.isLoggedIn,
  viewsController.getFindUsPage
);
router.get(
  '/coaching-team',
  authController.isLoggedIn,
  viewsController.getCoachingTeamPage
);
router.get(
  '/courses',
  authController.isLoggedIn,
  viewsController.getCoursesPage
);
router.get(
  '/help-me-decide',
  authController.isLoggedIn,
  viewsController.getHelpDecidePage
);
router.get(
  '/login-form',
  authController.isLoggedIn,
  viewsController.getLoginForm
);
router.get(
  '/signup-form',
  authController.isLoggedIn,
  viewsController.getSignupForm
);

router.get(
  '/logged-out',
  authController.isLoggedIn,
  viewsController.getLogoutPage
);

router.get(
  '/course/:slug',
  authController.isLoggedIn,
  viewsController.getCourse
);

router.get(
  '/course/details/:slug',
  authController.isLoggedIn,
  viewsController.getCourseDetails
);

module.exports = router;
