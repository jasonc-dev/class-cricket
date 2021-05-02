const express = require('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

router
  .route('/')
  .get(videoController.getAllVideos)
  .post(videoController.createVideo);

router.route('/:videoId').get(videoController.getVideo);

module.exports = router;
