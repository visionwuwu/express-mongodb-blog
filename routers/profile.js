/**
 * 用户修改个人信息的模块
 * 
 */
const User = require('../models/users');
const fs = require('fs');

/**
 * 修改用户信息
 * 函数 updateUserProfile
 * 请求路径 /profile
 * 请求类型 post
 */
exports.updateUserProfile = function(req, res) {
    // 解构body
    let { _id, nickname, gender } = req.body;

    // 文件上传
    let file = req.file;
    if (file) {
        var filename = file.originalname;
        var ext = filename.slice(filename.lastIndexOf('.'));
        var fpath = file.path;
        fs.readFile(fpath, (err, data) => {
            if (err) return console.log('文件读取失败');
            fs.writeFile(fpath + ext, data, (err) => {
                if (err) return console.log('server is error');
                fs.unlinkSync(file.path)
                console.log('file success')
            })
        });
    }

    // 头像路径
    var avatar = '\\' + fpath + ext;
    // 根据id更新一条数据
    User.findByIdAndUpdate(_id, { nickname, gender, avatar }, (err, ret) => {
        if (err) return console.log('数据库连接失败');
        // 操作成功
        if (ret) {
            // 刷新页面
            req.session.user.nickname = nickname;
            req.session.user.gender = gender;
            req.session.user.avatar = avatar;
            res.redirect('/settings/profile');
        }
    });
}