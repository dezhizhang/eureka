module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const d = new Date();
    const CartSchema = new Schema({
        title:{ type:String },
        number:{ type:Number },
        price:{ type:String },
        goods_img:{ type:String },
        openid:{ type:Schema.Types.Mixed },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('Cart',CartSchema,'cart');
}