/**
 * 用户的评论的消息路由
 */
const Review = require('../models/review');
const Blog = require('../models/blog');


// 更新评论的个数
function updateReviewNum(_id, review_num) {
    Blog.findByIdAndUpdate({ _id }, { review_num }, (err, ret) => {
        if (err) return console.log('更新评论个数失败');
        if (ret) {
            console.log('更新评论个数成功');
        }
    })
}

// 获取当前blogid对应的总评论的个数
function getReviewNum(reviewlist) {
    let len = reviewlist.length;
    reviewlist.forEach(item => {
        len += item.reviewitem.length;
    })
    return len;
}

/**
 * 查看详情的文章
 */
exports.findDestAndReview = function(req, res) {
    let _id = req.query._id.slice(1, -1);
    let options = {};
    // 根据id查找对应的文章
    Blog.findById(_id)
        .then(articleDoc => {
            if (articleDoc) {
                options.user = req.session.user
                options.blog = articleDoc;
                res.render('homes/dest.html', options);
                // 更新浏览次数
                return Blog.findByIdAndUpdate(_id, { look_num: articleDoc.look_num + 1 })
            }
        })
        .then(ret => {
            if (ret) {
                console.log('ret')
            }
        });
}


/**
 * 查找评论列表
 */
exports.findReviewList = function(req, res) {
    let id = req.query.id;
    // 查看评论列表的消息
    Review.findOne({ blogid: id }, (err, doc) => {
        if (err) return console.log('查询评论列表失败');
        if (doc) {
            res.send(doc.reviewlist);
        } else {
            res.status(200).send([]);
        }
    });
}

/**
 * 发表评论
 */
exports.publishReview = function(req, res) {
    let { id, hostcontent } = req.body;
    let user = req.session.user;
    // 判断用户是否登录
    if (!user) {
        res.send({
            code: 1001,
            message: '亲你还没登录呢！'
        })
    } else {
        // 当前发表的评论信息
        let obj = {
            hostid: user._id,
            hostname: user.nickname,
            hostavatar: user.avatar,
            hostcontent,
            date: new Date(),
            reviewitem: []
        }

        // 保存到mondb数据库中
        Review.findOne({ blogid: id }, (err, doc) => {
            if (err) return console.log('查询blogid失败');
            if (doc) { // 存在更新评论列表
                let reviewlist = doc.reviewlist;
                reviewlist.push(obj);
                Review.findOneAndUpdate({ blogid: id }, { reviewlist }, (err, ret) => {
                    if (err) return console.log('更新失败');
                    if (ret) {
                        console.log(ret);
                        res.send({
                            code: 1000,
                            message: '更新成功'
                        });
                        console.log('更新成功');
                        updateReviewNum(id, getReviewNum(reviewlist));
                    } else {
                        res.send({
                            code: 1001,
                            message: '更新失败'
                        })
                    }
                })
            } else { // 不存在添加一条记录
                let review = new Review();
                review.blogid = id;
                review.reviewlist.push(obj);
                review.save((err, ret) => {
                    if (err) return console.log('保存失败');
                    if (ret) {
                        // 成功
                        updateReviewNum(id, review.reviewlist.length);
                        res.send({
                            code: 1000,
                            message: '发表评论成功'
                        });
                    } else {
                        res.send({
                            code: 1001,
                            message: '发表评论失败'
                        })
                    }
                })
            }
        })
    }
}

/**
 * 回复评论
 */

exports.reviewComment = function(req, res) {
    let { id, content, hostid } = req.body;
    let user = req.session.user;
    // 判断用户是否登录
    if (!user) {
        res.send({
            code: 1001,
            message: '亲你还没登录呢！'
        })
    } else {
        let reviewitem = {
            userid: user._id,
            useravatar: user.avatar,
            username: user.nickname,
            content,
            date: new Date()
        }
        Review.findOne({ blogid: id }, (err, doc) => {
            if (err) return console.log('根据blogid查询失败');
            if (doc) {
                let reviewlist = doc.reviewlist;
                // 查找指定hostid的评论项
                reviewlist.some(item => {
                    if (item.hostid == hostid) {
                        item.reviewitem.push(reviewitem);
                        return true;
                    }
                });
                // 更新评论列表
                updateReviewNum(id, getReviewNum(reviewlist));
                Review.findOneAndUpdate({ blogid: id }, { reviewlist }, (err, ret) => {
                    if (err) return console.log('更新err');
                    if (ret) {
                        console.log('更新success');
                        res.send({
                            code: 1000,
                            message: '回复成功'
                        })
                    }
                })
                console.log('查询到了');
            } else {
                console.log('回复失败');
                res.send({
                    code: 1001,
                    message: '回复失败'
                });
            }
        })
    }
}