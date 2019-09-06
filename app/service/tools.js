'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
class ToolsService extends Service {
   //生成验证码
    async captcha() {
        let captcha = svgCaptcha.create({
            size:6,
            fontSize:50,
            width:120,
            height:30,
            background:'#f60'
        });
        this.ctx.session.code = captcha.text;
        return captcha;
    }
}

module.exports = ToolsService;
