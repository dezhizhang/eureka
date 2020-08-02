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
        email:{ type:String },
        mobile:{ type:String },
        nickName:{ type:String },
        address:{ type:String },
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