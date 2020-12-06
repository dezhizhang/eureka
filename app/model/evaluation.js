'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const EvaluationSchema = Schema({
        maintainId:{type:String },
        openid:{ type:String },
        userName:{ type:String },
        mobile:{ type:String },
        description:{ type:String },
        add_time:{
           type:Number,
           default:d.getTime()
        },
    });
    return mongoose.model('Evaluation',EvaluationSchema,'evaluation');
}