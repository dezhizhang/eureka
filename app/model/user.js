/**
 * @author:zhangdezhi
 * @date:2020-07-12
 * @desc:用户模型
*/
'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();
    const UserSchema = new Schema({
        username:String,
        password:String,
        email:String,
        mobile:String,
        add_time:{
            type:Number,
            default:d.getTime()
        }
    });
    return mongoose.model('User',UserSchema,'user');
}