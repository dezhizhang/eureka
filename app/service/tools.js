'use strict';
const md5 = require('md5');
const path = require('path');
const Jimp = require('jimp');
const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const sd = require('silly-datetime');
const mkdirp = require('mz-modules/mkdirp');
class ToolsService extends Service {
    //生成验证码
    async captcha(params) {
        let captcha = svgCaptcha.create({
            size:params&&params.size || 4,
            fontSize:params&&params.fontSize || 50,
            width:params&&params.width || 120,
            height:params&&params.height || 30,
            background:params&&params.background || '#f60'
        });
        this.ctx.session.code = captcha.text;
        return captcha;
    }
    //生成加密码
    async md5(str) {
        return md5(str);
    }
    //生成时间
    async getTime() {
        let t = new Date();
        return t.getTime();

    }
    //生成上传文件
    async getUploadFile(filename) {
        let day = sd.format(new Date(),'YYYY-MM-DD');
        let dir = path.join(this.config.uploadDir,day);
        await mkdirp(dir);
        let d = await this.getTime();
        let uploadDir = path.join(dir,d+path.extname(filename));
        return {
            uploadDir:uploadDir,
            saveDir:uploadDir.slice(3).replace(/\\/g,'/')
        }
    }
    //生成缩略图
    async jimpImg(target,width,height){
        //上传图片成功以后生成缩略图
        Jimp.read(target, (err, lenna) => {
            if (err) throw err;  		
            lenna.resize(width, height) // resize
                .quality(90) // set JPEG quality                  
                .write(target+'_200x200'+path.extname(target)); // save
         });
   
   
     }
    
}

module.exports = ToolsService;
