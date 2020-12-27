'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const d = new Date();
    const MessageSchema = new Schema({
        url:{ type:String },
        price:{ type:String },
        description:{ type:String },
        type:{
            type:String,
            default:1       //1,pc,2小程序,3app
        },
        status:{
            type:Number,
            default:1, //1表示可用，0表示不可用
        },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('Message',MessageSchema,'message');
}