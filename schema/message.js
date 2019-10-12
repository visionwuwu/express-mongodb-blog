/**
 * 记录每个用户的回复消息
 */
const Schema = require('mongoose').Schema;

const messageSchema = new Schema({
    authorid: String, // 文章作者的id
    messagelist: [{
        reuserid: String, // 评论用户的id
        reusername: String, // 评论用户的name
        reuseravatar: String, // 评论用户的头像
        blogid: String, // 博客的id
        blogname: String, // 博客的name
        hostid: String, // 楼主的id
        content: String, // 评论的内容
        actiontype: Number, // 1表示喜欢，2表示评论，值为3表示回复
        status: Number, // 0表示未查看，1表示已查看
        date: String
    }]
});

module.exports = messageSchema;