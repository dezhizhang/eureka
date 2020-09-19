
/**
 * @author:zhangdezhi
 * @date:2020-08-29
 * @desc:保存用户订单
*/
'use strict';
module.exports = app => { 
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const UserInfoSchema = new Schema({
        openid:{ type:String },
        status:{ type:Number,default:1 }, //1表示待付款，2表示待发货，3表示待收货，4表示待评价,5表示完成订单
        number:{ type:String },
        title:{ type:String },
        price:{ type:String },
        freight:{type:String },
        url:{ type:String },
        sub_title:{type:String }, //商品副标题
        color:{ type:String },
        color_title:{type:String },
        size:{ type:String },
        goods_id:{type:String }, //商品编号
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('UserInfo',UserInfoSchema,'user_info');
}

