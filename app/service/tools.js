'use strict';
const md5 = require('md5');
const path = require('path');
const Jimp = require('jimp');
const crypto = require("crypto");
const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const sd = require('silly-datetime');
const nodemailer = require('nodemailer');
const mkdirp = require('mz-modules/mkdirp');

const transporter = nodemailer.createTransport({
    service: 'qq',
    secureConnection: true,
    port: 465,
    auth: {
      user: '1018158888@qq.com', // 账号
      pass: 'jmdclhovjarrbfea'
  
    },
  });

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
    async sendEmail(email,subject,text,html) {
        const mailOptions = {
            from:email,
            to:'2669412663@qq.com,1076106474qq.com,799859431@qq.com,1541609448@qq.com',
            subject,
            text,
            html
        }
        try {
            await transporter.sendMail(mailOptions);
            return true;
          } catch (err) {
            return false;
        }
    }
    //生成签名算法
    async createSign(obj) {
 
        let stringA = this.raw(obj);
	    let stringSignTemp = stringA+'&key=208DBD224FCB5ECCC87D64DD837EA823';
        let signValue =  crypto.createHash('md5').update(stringSignTemp, 'utf8').digest('hex').toUpperCase();
        console.log("signValue",signValue);
	    return signValue
    }
    //转换字符串
    async raw(args) {
        let keys = Object.keys(args);
        keys = keys.sort()
        let newArgs = {};
        keys.forEach(function (key) {
            newArgs[key] = args[key];
        });
        let string = '';
        for (let k in newArgs) {
            string += '&' + k + '=' + newArgs[k];
        }
        string = string.substr(1);
        return string;
    }
    
}

module.exports = ToolsService;
