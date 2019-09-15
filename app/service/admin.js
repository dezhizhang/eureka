'use strict';

const Service = require('egg').Service;
const url = require('url');
class AdminService extends Service {
    async checkAuth() {
        let userInfo = this.ctx.session.userInfo;
        let role_id = userInfo.role_id;
        let accessArr = [];
        let pathname = url.parse(this.ctx.request.url).pathname;
        let ignoreUrl = ['/admin/login','/admin/doLogin','/admin/verify','/admin/loginOut'];
        if(ignoreUrl.indexOf(pathname)!=-1 || userInfo.is_super==1) {
            return true;
        }
        let result = await this.ctx.model.RoleAccess.find({'role_id':role_id});
        result.map(item => {
            let access_id = item.access_id.toString();
            accessArr.push(access_id);
        });
        //获取当前用户访问的地址
        let accessUrlResult = await this.ctx.model.Access.find({'url':pathname});
        if(accessUrlResult.length > 0) {
            let id = accessUrlResult[0]._id.toString()
            if(accessArr.indexOf(id)!=-1) {
                return true;
            }
            return false;
        }
        return false;
    }
}

module.exports = AdminService;
