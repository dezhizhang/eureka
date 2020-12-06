'use strict';


const Controller = require('egg').Controller;
class EvaluationController extends Controller {
    async upload() {
        let result = this.ctx.request.body;
        let id = result.id;
        result.maintainId = id; //转换字段
        let data = await this.ctx.model.Evaluation.find({"maintainId":id});
        if(data.length > 0) {
            this.ctx.body = {
                code:404,
                msg:"已经提交",
                success:false,
                data:null
            }
            return;
        }

        let evaluation = new this.ctx.model.Evaluation(result);
        await evaluation.save();
        await this.ctx.model.Maintain.updateOne({"_id":id},{status:5})
        this.ctx.body = {
            code:200,
            msg:'上传成功',
            success:true,
            data:null
        }
    } 
   

}

module.exports = EvaluationController;