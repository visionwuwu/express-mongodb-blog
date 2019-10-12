/**
 * 用户的个人信息的路由模块
 * 请求的路径/
 */

const Blog = require('../models/blog');
const Review = require('../models/review');


function getReviewNum(reviewlist, id) {
    let len = reviewlist.length;
    let aboutme = 0;
    reviewlist.forEach(item => {
        let reviewitem = item.reviewitem;
        if (item.hostid == id) {
            aboutme += reviewitem.length;
        }
        len += reviewitem.length;
    })
    return { len, aboutme };
}

exports.getSiteMsg = function(req, res) {
    let user = req.session.user;
    if (user) {
        let msg = {};
        Blog.find().then(ret => {
            msg.blog_num = ret.length;
            return Review.find();
        }).then(ret => {
            let total = 0;
            let aboutme_num = 0;
            ret.forEach(item => {
                let result = getReviewNum(item.reviewlist, user._id);
                total += result.len;
                aboutme_num += result.aboutme;
            });
            msg.review_num = total;
            msg.aboutme_num = aboutme_num;

            res.render('homes/admin_home.html', {
                title: '个人主页首页',
                user,
                msg
            })
        })
    }
}

exports.findBlogs = function(req, res) {
    Blog.find((err, doc) => {
        if (err) return console.log('查询失败');
        if (doc) {
            res.render('homes/articles.html', {
                title: '文章<<Vision武',
                user: req.session.user,
                msg: { aboutme_num: 5 },
                blogs: doc
            })
        }
    })
}