'use strict';

const BaseController = require('./base');
class ContactController extends BaseController {
    async index() {
        let result = await this.ctx.model.Contact.find();
        await this.ctx.render('/admin/contact/index',{
            list:result
        });
    }
    //修改
    async edit() {
        let id = this.ctx.query.id;
        let result = await this.ctx.model.Contact.find({'_id':id});
        await this.ctx.render('/admin/contact/edit',{
            list:result[0]
        })
    }
    //提交数据
    async doEdit() {
        let result = this.ctx.request.body;
        console.log(result);
        


    }
    
}

module.exports = ContactController