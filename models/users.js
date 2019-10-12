const mongoose = require('mongoose');

// 导入文档模型对象
const userSchema = require('../schema/users');

// 发布模型构造函数
const User = mongoose.model('User', userSchema);

// 导出模型构造函数
module.exports = User;