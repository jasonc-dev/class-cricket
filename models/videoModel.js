const mongoose = require('mongoose');
const slugify = require('slugify');

const videoSchema = mongoose.Schema(
  {
    videoTitle: {
      type: String,
      required: [true, 'A video must have a title'],
      unique: true,
      trim: true,
    },
    videoDescription: {
      type: String,
      required: [true, 'A video must have a description'],
      unique: true,
      trim: true,
    },
    filename: {
      type: String,
      required: [true, 'A video must have a file name'],
    },
    thumbnail: {
      type: String,
      required: [true, 'A video must hava thumbnail'],
    },
    course: {
      type: mongoose.Schema.ObjectId,
      ref: 'Course',
      required: [true, 'Video must belong to a course'],
    },
    slug: String,
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

videoSchema.pre('save', function (next) {
  this.slug = slugify(this.videoTitle, { lower: true });
  next();
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
