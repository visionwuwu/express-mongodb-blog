/**
 * 文章文档结构数据表
 */
const Schema = require('mongoose').Schema;
const blogSchema = new Schema({
    title: String, // 文章的标题
    author: String, //作者
    avatar: String,
    content: String, // 文章的内容
    tag: String, // 文章的标签
    public_time: {
        type: Date,
        default: Date.now,
    }, // 发表时间
    like_num: {
        type: Number,
        default: 0
    }, // 点赞次数
    review_num: {
        type: Number,
        default: 0
    }, // 评论的次数
    look_num: {
        type: Number,
        default: 0
    } // 浏览的次数
});

// 导出blogSchema对象
module.exports = blogSchema;