'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const GoodsCateSchema = Schema({
        title:{ type:String },
        url:{ type:String },
        filter_attr:{ type:String },
        link:{ type:String },
        price:{ type:String },
        pid:{ type:Schema.Types.Mixed },
        sub_title:{ type:String },
        keywords:{ type:String },
        file_name:{ type:String },
        description:{ type:String },
        sort:{ type:Number,default:100 },
        status:{
            type:Number,
            default:1
        },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('GoodsCate',GoodsCateSchema,'goods_cate');
}