/**
 * @author:zhangdezhi
 * @date:2020-12-07
 * @desc:评价管理
*/
'use strict';
const fs=require('fs');
const BaseController = require('./base');
class MainController extends BaseController {
    async index() {
        let { id } = this.ctx.query;
        let list = await this.ctx.model.Evaluation.find({"maintainId":id});
        console.log("list",list);
        await this.ctx.render('/back/evaluation/index',{
            list,
        });
    }
  
}

module.exports = MainController