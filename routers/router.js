/**
 * router.js 路由模块
 * 处理路由的监听和分发
 * 根据请求的方式和请求的路径设置具体处理函数
 */
const express = require('express');
const router = express.Router();
const Resgiter = require('./register');
const Login = require('./login');
// const Settings = require('./settings');
const Profile = require('./profile');
const Admin = require('./admin');
const Blog = require('./blog');
const Review = require('./review');
const userMess = require('./usermess');

/**
 * 渲染首页
 * 请求方式 get
 * 参数 无
 */
router.get('/', Blog.findBlogList);

/**
 * 渲染登录页面
 * 请求方式get
 * 参数 无
 */

router.get('/login', (req, res) => {
    res.render('login.html')
});

/**
 * 处理登录页面
 * 请求方式post
 * 参数 无
 */
router.post('/login', Login.userLogin);


/**
 * 渲染注册页面
 * 请求方式get
 * 参数无
 */

router.get('/resgiter', (req, res) => {
    res.render('resgiter.html')
});

/**
 * 处理注册页面
 * 请求方式post
 * 参数 Post提交的
 */
router.post('/resgiter', Resgiter.createUser);

/**
 * 处理退出请求
 * 请求类型get
 * 请求参数无
 */
router.get('/login_out', (req, res) => {
    // 退出登录清除session
    req.session.user = null;
    res.redirect('/');
})

/**
 * 渲染设置个人信息页面
 * 请求方式get
 * 参数无
 */
router.get('/settings/profile', (req, res) => {
    res.render('settings/profile.html', {
        user: req.session.user
    })
});

/**
 * 渲染设置管理信息页面
 * 请求方式get
 * 参数无
 */
router.get('/settings/admin', (req, res) => {
    res.render('settings/admin.html', {
        user: req.session.user
    })
});

/**
 * 渲染个人主页
 * 请求参数get
 * 参数无
 */
router.get('/myhome', userMess.getSiteMsg);

/**
 * 保存修改个人信息
 * 请求方式 post
 * 参数 post请求体
 */
router.post('/profile', Profile.updateUserProfile);

/**
 * 修改密码
 * 请求类型post
 * 请求路径 /admin
 * 请求参数 无
 */
router.post('/admin', Admin.updatedPassword);


/**
 * 渲染写博客页面
 * 请求方式get
 * 请求的路径/new
 */
router.get('/new', (req, res) => {
    res.render('homes/new.html', {
        user: req.session.user
    });
})

/**
 * 处理发表博客文章
 */
router.post('/new', Blog.sendBlog);

/**
 * 查看文章详情页面
 * 查看评论的消息列表
 */
router.get('/dest', Review.findDestAndReview);

/**
 * 处理点赞功能
 */
router.get('/clicks', Blog.updateLikeNum)

/**
 * 发表评论
 * 评论地址/comment
 * 请求类型 post
 */
router.post('/comment', Review.publishReview);


/**
 * 查找所有的评论列表数据
 */
router.get('/clist', Review.findReviewList)

/**
 * 回复评论数据
 */
router.post('/recomment', Review.reviewComment)


//===========后台管理==============

/**
 * 查看所有的文章
 */
router.get('/article', userMess.findBlogs)


// 导出我们的路由模块
module.exports = router;