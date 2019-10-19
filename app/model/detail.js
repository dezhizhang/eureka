'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const d = new Date();
    const DetailSchema = new Schema({
        detail_id:{  type:Schema.Types.ObjectId },
        detail_img:{ type:String },
        title:{ type:String },
        price:{ type:String },
        freight:{ type:String },
        sales:{ type:String },
        inventory:{type:String },
        sort:{ type:Number },
        detail_list:{ type:String },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('Detail',DetailSchema,'detail');
}