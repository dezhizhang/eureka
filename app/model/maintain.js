'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const MaintainSchema = Schema({
        openid:{ type:String },
        userName:{ type:String },
        mobile:{ type:String },
        address:{ type:String },
        orderId:{type:String }, //订单号
        description:{ type:String },
        detail:{ type:String },
        region:{ type:String },
        status:{ type:Number,default:2 },//1新建预约,2待处理,3已完成,4待评价
        url:{ type:String },
        add_time:{
           type:Number,
           default:d.getTime()
        },
    });
    return mongoose.model('Maintain',MaintainSchema,'maintain');
}