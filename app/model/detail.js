'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const d = new Date();
    const DetailSchema = new Schema({
        goods_id:{  type:Schema.Types.ObjectId }, //与商品关联的id
        sort:{ 
            type:Number,
            default:100
         },
        detail_img:{ type:Array },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('Detail',DetailSchema,'detail');
}