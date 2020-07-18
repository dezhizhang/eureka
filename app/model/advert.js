module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d=new Date();
    const AdvertSchema = new Schema({
      name: { type: String  },
      url: { type: String  }, //上传的链接
      link: { type: String  },   
      sort: { type: Number  },   
      type:{ type:Number }, //1网站,2App,3小程序
      file_name:{ type:String },//用于存储图片名
      status: { type: Number,default:1  },    
      add_time: {           
        type:Number,        
        default: d.getTime()    
       }
    });
   
    return mongoose.model('Advert', AdvertSchema,'advert');
}