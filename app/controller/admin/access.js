'use strict';

const BaseController = require('./base');

class AccessController extends BaseController {
    async index() {
        let result = await this.ctx.model.Access.aggregate([
            {
                $lookup:{
                    from:'access',
                    localField:'_id',
                    foreignField:'module_id',
                    as:'items'
                }
            },
            {
                $match:{
                    module_id:'0'
                }
            }
        ]);
        await this.ctx.render('/admin/access/index',{
            list:result
        })

    }
    //权限
    async add() {
        //获取模块列表
        let result = await this.ctx.model.Access.find({'module_id':'0'});
        console.log(result);
        
        await this.ctx.render('/admin/access/add',{
            list:result
        });
    }
    //增加权限
    async doAdd() {
        let data=this.ctx.request.body;
        let module_id=data.module_id;

        //菜单或者操作
        if(module_id){
            data.module_id=this.app.mongoose.Types.ObjectId(module_id); 

        }
        let access=new this.ctx.model.Access(data);
        await access.save();
        await this.success('/admin/access','增加权限成功');
    }
}

module.exports = AccessController;
