'use strict';

const Controller = require('egg').Controller;
class LoginController extends Controller {
    async index() {
        let { code,appid } = this.ctx.query;
        let data = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=84e57fcbc1036f289c964444f58f16e7&js_code=${code}&grant_type=authorization_code`);
        let json =JSON.parse(data.data.toString()); 
        this.ctx.body = {
            code:200,
            msg:'success',
            data:json
        }
    }
    async save() {
        let { openid } = this.ctx.query;
        let data = await this.ctx.model.UserInfo.find({'openid':openid});
        if(data.length > 0) {
            this.ctx.body = {
                code:200,
                msg:'当前用户以存在',
                data:data
            }
        } else {
            let userInfo = new this.ctx.model.UserInfo({openid:openid});
            userInfo.save();
            this.ctx.body = {
                code:200,
                msg:'保存用户成功',
                data:null
            }
        }

       
    }

}

module.exports = LoginController;