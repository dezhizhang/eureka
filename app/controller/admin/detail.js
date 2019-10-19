'use strict';
const fs=require('fs');
const pump = require('mz-modules/pump');
const BaseController = require('./base');
class MainController extends BaseController {

    async index() {
        let { id,type } = this.ctx.query;
        await this.ctx.render('/admin/detail/index',{
            id,
            type,
            list:[]
        })

    }
    async add() {
        let { id,type } = this.ctx.query;
        let title = '';
        if(type == 1) {
            let result = await this.ctx.model.Main.find({'_id':id});
            title = result[0].title
        } else {
            let result = await this.ctx.model.Product.find({'_id':id});
            title = result[0].title
        }
        await this.ctx.render('/admin/detail/add',{
            title,
            id
        });
    }
    async doAdd() {
      
    }
    async edit() {
       
    }
    async doEdit() {
       
    }
   
}

module.exports = MainController