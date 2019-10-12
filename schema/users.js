const Schema = require('mongoose').Schema;

// 定义一个文档模型(表结构)
const userSchema = new Schema({
    username: {
        type: String,
        default: '匿名用户',
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    avatar: {
        type: String,
        default: '/public/images/avatar-default.png'
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1], // -1为未知 0-男 1-女
        default: -1
    },
    status: {
        type: Number,
        enum: [0, 1, 2], // 0没有权限限制 1不可以评论 2不可以登录
        default: 0,
    },
    create_time: {
        type: Date,
        default: Date.now
    }
});

// 导出文档模型
module.exports = userSchema;