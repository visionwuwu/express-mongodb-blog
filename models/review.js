/**
 * 评论回复消息列表
 */
const reviewSchema = require('../schema/review');

const mongoose = require('mongoose');

let Review = mongoose.model('Review', reviewSchema);

module.exports = Review;