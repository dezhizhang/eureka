/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:用户模型
*/
'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const AddressSchema = new Schema({
        url:{ type:String }, //用户头像
        email:{ type:String }, //企业邮箱
        mobile:{ type:String },
        openid:{ type:String }, //用于小程序端登录
        userName:{ type:String },
        address:{ type:String },
        cityInfo:{ type:String }, //城市地址
        detail:{ type:String }, //详细地址
        checked:{ type:Boolean,default:false},//用户会员类型
        status:{
            type:Number,
            default:1 //用户当前状态
        },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('Address',AddressSchema,'address');
}