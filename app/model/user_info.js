
'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const UserInfoSchema = new Schema({
        openid:{ type:String },
        status:{ type:Number,default:1 }, //1表示待付款，2表示待发货，3表示待收货，4表示待评价
        number:{ type:String },
        title:{ type:String },
        price:{ type:String },
        freight:{type:String },
        url:{ type:String },
        color:{ type:String },
        size:{ type:String },
        goods_id:{type:String }, //商品编号
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('UserInfo',UserInfoSchema,'user_info');
}

