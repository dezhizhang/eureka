'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const d = new Date();
    const MainSchema = new Schema({
        title:{ type:String },
        price:{ type:String },
        main_id:{ type:String },
        main_url:{ type:String },
        sort:{ type:Number },
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('Main',MainSchema,'main');
}