/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:用户模型
*/
'use strict';
const uuid = require("uuid");
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const UserSchema = new Schema({
        url:{ type:String }, //用户头像
        email:{ type:String }, //企业邮箱
        mobile:{ type:String },
        openid:{ type:String }, //用于小程序端登录
        creditCode:{type:String}, //社会信用代码
        nickName:{ type:String },
        address:{ type:String },
        userType:{ type:String },//用户会员类型
        status:{
            type:Number,
            default:1 //用户当前状态
        },
        token:{ //用于验证用户是否登录
            type:String,
            default:uuid.v4(),
        },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('User',UserSchema,'user');
}