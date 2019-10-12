/**
 * 注册路由处理
 * 请求的路径/resgiter 
 * 请求的方式post
 * 实现的功能：将一条用户注册信息保存到数据库中
 */

// 导入userSchema文档模型
const User = require('../models/users');

/**
 * 创建一个用户
 * 根据用户名判断用户是否存在
 * 存在提示 不存在创建用户并跳转到登陆页面
 */
exports.createUser = function(req, res) {
    // 获取表单提交的请求体
    let body = req.body;

    // 根据email邮箱查找此用户是否注册
    User.findOne({ email: body.email }, (err, ret) => {
        // 查询失败
        if (err) return console.log('查询失败');
        // 不存在
        if (!ret) {
            // 创建用户
            let user = new User();
            user.email = body.email;
            user.password = body.password;
            user.nickname = body.nickname;

            console.log(user);

            // 保存到数据库
            user.save((err, ret) => {
                // 保存失败
                if (err) return console.log('保存失败');
                console.log(ret);
                // 创建成功跳转到登陆页面
                res.redirect('/login');
            });
        } else { // 存在
            // 提示用户已存在
            res.send(JSON.stringify({
                code: 1001,
                message: '用户存在'
            }));
            console.log('用户已存在');
        }
    })
}