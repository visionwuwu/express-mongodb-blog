/**
 * 关注表，里面使每个用户的关注着和被关注者
 */
const Schema = reqiure('mongoose').Schema;

const noticeSchema = new Schema({
    userid: String, // 用户的id
    noticelist: [{ // 用户的关注者和被关注者信息
        noticerid: String,
        noticername: String,
        noticeravatar: String,
        noticertype: Number, // 0表示fance,1表示noticer
    }],
    noticersum: Number, // 关注的总数
    fancesum: Number, // 粉丝总数
    likesum: Number // 喜欢的总数
});