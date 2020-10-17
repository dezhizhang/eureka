'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d=new Date();
    const FocusSchema = new Schema({
      title: { type: String  },
      type: { type: Number  },  
      file_name:{ type:String }, //文件名用于删除文件 
      url: { type: String  },   
      link: { type: String  },   
      sort: { type: Number,default:100 },   
      status: { type: Number,default:1  },
      description:{type:String },
      add_time: {           
        type:Number,        
        default: d.getTime()    
       }
    });
   
    return mongoose.model('Focus', FocusSchema,'focus');
}