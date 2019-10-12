/**
 * router.js 路由模块
 * 处理路由的监听和分发
 * 根据请求的方式和请求的路径设置具体处理函数
 */
const express = require('express');
const router = express.Router();


/**
 * 渲染首页
 * 请求方式 get
 * 参数 无
 */
router.get('/', (req, res) => {
    // 根据url路径用art-template和express-art-tempate渲染res.render渲染首页
    res.render('index.html', {
        title: '小燕子个人网'
    })
});

/**
 * 渲染登录页面
 * 请求方式get
 * 参数 无
 */
router.get('/login', (req, res) => {
    res.render('login.html')
});


/**
 * 渲染注册页面
 * 请求方式get
 * 参数无
 */

router.get('/resgiter', (req, res) => {
    res.render('resgiter.html')
})




// 导出我们的路由模块
module.exports = router;