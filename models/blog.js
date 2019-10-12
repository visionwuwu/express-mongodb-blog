/**
 * 发布文章博客的文档构造函数
 */
const mongoose = require('mongoose');
const blogSchema = require('../schema/blog');
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;