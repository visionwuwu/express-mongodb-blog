/**
 * 登录路由模块
 * 处理登录时post提交表单的用户登录的信息验证
 * 查询数据库验证账号
 * 登录成功保存我们的session
 */

const User = require('../models/users');

exports.userLogin = function(req, res) {
    // 获取用户登录的数据
    let body = req.body;
    // 根据用户名和密码验证登录
    User.findOne(body, (err, ret) => {
        if (err) return console.log('查询失败!');
        if (ret) {
            // 设置存储的session值为当前的user信息这个插件会给我们加密
            req.session.user = ret;
            // 登陆成功
            return res.send({
                code: 1000,
                message: '登录成功'
            });
        }
        // 如果是ret为null登录失败
        res.send({
            code: 1001,
            message: '用户名或者密码错误'
        })
    })
}