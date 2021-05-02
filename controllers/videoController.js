const Video = require('../models/videoModel');
const factory = require('./handlerFactory');

exports.getVideo = factory.getOne(Video);
exports.getAllVideos = factory.getAll(Video);
exports.createVideo = factory.createOne(Video);
