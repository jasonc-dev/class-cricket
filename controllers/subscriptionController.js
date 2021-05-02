const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Course = require('../models/courseModel');
const Subscription = require('../models/subscriptionModel');
const catchAsync = require('../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently subscribed course
  const course = await Course.findById(req.params.courseId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?course=${
      req.params.courseId
    }&user=${req.user.id}&price=${course.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/course/${course.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.courseId,
    line_items: [
      {
        name: `${course.courseTitle} Course`,
        description: course.courseSummary,
        images: [`http://localhost:3000/img/courses/${course.imageCover}`],
        amount: course.price * 100,
        currency: 'gbp',
        quantity: 1,
      },
    ],
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createSubscriptionCheckout = catchAsync(async (req, res, next) => {
  // This is only temporary, because its unsecure: everyone can make subscriptions without paying
  const { course, user, price } = req.query;

  if (!course && !user && !price) return next();
  await Subscription.create({ course, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});
