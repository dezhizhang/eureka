'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const OrderSchema = Schema({
        order_id:String,
        uid:Number,
        trade_no:String,
        app_price:Number,
        all_num:Number
    });
    return mongoose.model('Order',OrderSchema,'order');
}