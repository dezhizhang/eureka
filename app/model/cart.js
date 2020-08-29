module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const d = new Date();
    const CartSchema = new Schema({
        title:{ type:String },
        number:{ type:Number },
        price:{ type:String },
        color:{ type:String },
        size:{ type:String },
        url:{ type:String },
        goods_id:{ type:String },
        status:{ type:Number },
        openid:{ type:String },
        freight:{type:Number },
        checked:{ type:Boolean,default:true },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('Cart',CartSchema,'cart');
}