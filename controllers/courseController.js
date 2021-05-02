const Course = require('../models/courseModel');
const factory = require('./handlerFactory');

exports.getAllCourses = factory.getAll(Course);
exports.getCourse = factory.getOne(Course, { path: 'videos' });
exports.createCourse = factory.createOne(Course);
