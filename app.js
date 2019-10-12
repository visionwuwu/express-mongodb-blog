const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const router = require('./routers/router');
const mongoose = require('mongoose');

/**
 * 配置第三方中间件
 * 开放静态资源
 */
app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/', express.static('./public/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer({ dest: './public/uploads/' }).single('avatar'));
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views'));
app.use(cookieParser());
app.use(session({
    secret: 'visionwu',
    name: 'testapp',
    resave: false,
    saveUninitialized: true,
}));

// 监听端口启动服务器
app.listen(3000, () => {
    console.log('server is running 3000')
});

// 连接mongodb数据库
mongoose.Promise = global.Promise; //不加这句会报错
mongoose.connect('mongodb://localhost/myblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('open', function() {
    console.log('Connected to Mongoose');
});

// 挂载路由
// router(app);
app.use(router);