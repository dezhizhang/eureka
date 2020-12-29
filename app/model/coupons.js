'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const CouponsSchema = new Schema({
        type:{type:String }, //表示能使用的类型
        amount:{type:String },
        title:{type:String },
        sartTime:{type:String }, //开始时间
        endTime:{ type:String }, //结束时间
        startus:{type:Number,default:1},
        description:{type:String },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('Coupons',CouponsSchema,'coupons');
}