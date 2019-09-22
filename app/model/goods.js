'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const GoodsSchema = new Schema({
        username:String,
        password:String,
    });
    return mongoose.model('Goods',GoodsSchema,'goods');
}