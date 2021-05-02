const mongoose = require('mongoose');

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

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
