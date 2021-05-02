const mongoose = require('mongoose');
const slugify = require('slugify');

const courseSchema = mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: [true, 'A course must have a title'],
      unique: true,
      trim: true,
    },
    courseSummary: {
      type: String,
      required: [true, 'A course must have a summary'],
      trim: true,
    },
    courseDescription: {
      type: String,
      required: [true, 'A course must have a description'],
      trim: true,
    },
    slug: String,
    price: {
      type: Number,
      required: [true, 'A course must have a price'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual popualate
courseSchema.virtual('videos', {
  ref: 'Video',
  foreignField: 'course',
  localField: '_id',
});

courseSchema.pre('save', function (next) {
  this.slug = slugify(this.courseTitle, { lower: true });
  next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
