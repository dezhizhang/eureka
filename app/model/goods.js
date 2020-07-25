'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const GoodsSchema = new Schema({
        title:{ type:String },
        sub_title:{ type:String },
        url:{ type:String },
        goods_sn:{ type:String },
        cate_id:{ type:Schema.Types.ObjectId },
        click_count:{
            type:Number,
            default:1
        },
        goods_number:{
            type:Number,
            default:100
        },
        price:{ type:String },
        old_price:{ type:String },
        freight:{ type:String }, //运费
        inventory:{ type:String },//库存
        sales:{ type:String }, //销量
        relation_goods:{ type:String },
        goods_attrs:{ type:String },
        goods_version:{ type:String },
        // goods_img:{ type:String },
        // goods_gift:{ type:String },
        // goods_fitting:{ type:String },
        // goods_color:{ type:String },
        // goods_keywords:{ type:String },
        // goods_desc:{ type:String },
        // goods_content:{ type:String },
        sort:{
            type:Number,
            default:100
        },
        is_hot:{ //
            type:String, //0新品1精品2执销
        },
        is_delete:{
            type:Boolean,
            default:true
        },
       
        goods_type_id:{
            type:Schema.Types.ObjectId
        },
        status:{
            type:Number,
            default:1
        },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('Goods',GoodsSchema,'goods');
}