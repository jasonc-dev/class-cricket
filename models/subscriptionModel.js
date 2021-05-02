const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: [true, 'subscription must belong to a course'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Subscription must belong to a user'],
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price'],
  },
  paid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

subscriptionSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'course',
    select: 'courseTitle',
  });
  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
