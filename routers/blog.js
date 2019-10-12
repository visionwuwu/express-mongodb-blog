/**
 * 发表文章的路由
 * 请求方式post
 * 请求参数无
 * 请求路径/new
 */
const Blog = require('../models/blog');
const User = require('../models/users');
exports.sendBlog = function(req, res) {
    let { _id, title, tag, content } = req.body;
    User.findById(_id, (err, doc) => {
        if (err) return console.log('查询失败');
        // 成功
        if (doc) {
            let blog = new Blog();
            blog.author = doc.nickname;
            blog.avatar = doc.avatar;
            blog.title = title;
            blog.tag = tag;
            blog.content = content;
            blog.save((err, ret) => {
                if (err) return console.log('保存到数据是失败');
                if (ret) { // 保存成功
                    res.redirect('/');
                }
            })
        }
    })
}

exports.findBlogList = function(req, res) {
    Blog.find((err, doc) => {
        if (err) return console.log('查询失败');
        // 查询成功
        if (doc) {
            // 根据url路径用art-template和express-art-tempate渲染res.render渲染首页
            res.render('index.html', {
                title: '小燕子个人网',
                user: req.session.user,
                bloglist: doc
            });
        }
    })
}

/**
 * 点赞处理
 */
exports.updateLikeNum = function(req, res) {
    let { id, like_num } = req.query;
    Blog.findByIdAndUpdate(id, { like_num }, (err, ret) => {
        if (err) return console.log('更新失败');
        if (ret) {
            res.send({
                message: '点赞成功!'
            });
        }
    });
}