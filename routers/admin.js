/**
 * 用户更改密码路由
 * 请求方式post
 * 参数 无
 */
const User = require('../models/users');
exports.updatedPassword = function(req, res) {
    let { _id, password, newpsw } = req.body;
    User.findOneAndUpdate({ _id, password }, { 'password': newpsw }, (err, doc) => {
        if (err) return console.log('查询失败 server inside error');
        if (doc) { // 密码正确
            // 清除session
            req.session.user = null;
            // 响应成功的状态
            res.send({
                code: 1000,
                message: '修改成功'
            });
        } else { // 密码不正确
            res.send({
                code: 1001,
                message: '密码错误'
            })
        }
    })
}