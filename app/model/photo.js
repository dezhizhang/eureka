/**
 * @author:zhangdezhi
 * @date:2020-07-19
 * @desc:商品相册
*/
'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const PhotoSchema = new Schema({
        goods_id:{  type:Schema.Types.ObjectId },
        goods_image:{ type:Array },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('Photo',PhotoSchema,'photo');
}