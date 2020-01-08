'use strict';
const Controller = require('egg').Controller;

class IndexController extends Controller {
    // async index() {
    //     let result = await this.ctx.model.Focus.find({'type':'1'});
    //     await this.ctx.render('/default/index/index',{
    //         list:result
    //     });
    // }

    async index() {
        await this.ctx.render("/default/index",{
            result:[],
        })
        // this.ctx.body={
        //     code:200,
        //     msg:"success",
        //     data:null
        // }
    }
    
   
}

module.exports = IndexController