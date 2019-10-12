/**
 * 每个用户的回复消息列表
 * 将根据每条博客创建一个评论集合，
 * 然后将每条博客按不同的楼层放在数组中，
 * 不同的楼层树下针对楼主又有不同的评论，
 * 将针对楼主的评论又放在同一个数组中
 */
const Schema = require('mongoose').Schema;

const reviewSchema = new Schema({
    blogid: String, // 文章博客的id
    reviewlist: [{
        hostid: String, // 某楼层主的id
        hostname: String, // 楼主的名称
        hostavatar: String, // 楼主的头像
        hostcontent: String, // 楼主的评论的内容
        date: String, // 评论的日期
        // 针对楼主的评论(回复)
        reviewitem: [{
            userid: String, // 评论者的id
            useravatar: String,
            username: String, //评论者的name
            // reuserid: String, // 回复者的id
            content: String, // 评论的内容
            date: String, // 评论的日期
        }]
    }], //  
});

// 导出回复列表的文档结构
module.exports = reviewSchema;