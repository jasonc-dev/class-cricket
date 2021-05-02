const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Course = require('../models/courseModel');
const Subscription = require('../models/subscriptionModel');

exports.getCourse = catchAsync(async (req, res, next) => {
  // 1. Get the data, for the requested course
  const course = await Course.findOne({ slug: req.params.slug });

  if (!course) {
    return next(new AppError('There is no course with that name.', 404));
  }

  // 2. Build template
  // 3. Render template using data from 1.
  res.status(200).render('course', {
    title: `${course.courseTitle} Course`,
    course,
  });
});

exports.getMyCourses = catchAsync(async (req, res, next) => {
  // 1) find all subscriptions
  const subscriptions = await Subscription.find({ user: req.user.id });
  // 2) Find courses with the returned IDs
  const courseIDs = subscriptions.map((el) => el.course);
  const courses = await Course.find({ _id: { $in: courseIDs } });

  res.status(200).render('my-courses', {
    title: 'My Courses',
    courses,
  });
});

exports.getCourseVideos = async (req, res, next) => {
  const course = await Course.findOne({ slug: req.params.slug }).populate({
    path: 'videos',
    fields: 'video for course',
  });
  if (!course) {
    return next(new AppError('There is no course with that name', 404));
  }

  const courseIDsFromUser = req.user.subscriptions.map((el) => el.course.id);

  if (!courseIDsFromUser.includes(course.id)) {
    return next(new AppError('You are not registered for this course', 404));
  }

  res.status(200).render('course-videos', {
    title: `${course.courseTitle} videos`,
    course,
  });
};

exports.getLandingPage = async (req, res) => {
  res.status(200).render('homepage', {
    title: 'Home',
  });
};

exports.getFindUsPage = async (req, res) => {
  res.status(200).render('find-us', {
    title: 'Find us',
  });
};

exports.getCoachingTeamPage = async (req, res) => {
  res.status(200).render('coachingteam', {
    title: 'Team',
  });
};

exports.getCoursesPage = async (req, res) => {
  // 1. get tour data from collection
  const courses = await Course.find();

  // 2. Build template
  // 3. Render template using course data
  res.status(200).render('courses', {
    title: 'Courses',
    courses,
  });
};

exports.getCourseDetails = async (req, res, next) => {
  // 1. Get the data, for the requested course
  const course = await Course.findOne({ slug: req.params.slug });

  if (!course) {
    return next(new AppError('There is no course with that name.', 404));
  }

  // 2. Build template
  // 3. Render template using data from 1.
  res.status(200).render('course-details', {
    title: `${course.courseTitle} Details`,
    course,
  });
};

exports.getHelpDecidePage = async (req, res) => {
  res.status(200).render('helpdecide', {
    title: 'Help me decide',
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login-form', {
    title: 'Log into your account',
  });
};

exports.getSignupForm = async (req, res) => {
  res.status(200).render('signup-form', {
    title: 'sign up for an account!',
  });
};

exports.getLogoutPage = async (req, res) => {
  res.status(200).render('logout-page', {
    title: 'Logged out',
  });
};
