'use strict';
const fs = require("fs");
const path = require('path');
const oss = require('ali-oss'); //引入阿里云
const dayjs = require("dayjs");
const fsToll = require('fs-extra');
const Service = require('egg').Service;
const sendToWormhole = require('stream-wormhole');


class UploadService extends Service {

    //图片上传
    async uploadImg() {
        const client = new oss({
            accessKeyId: 'LTAI4GJa5QYZrxA2PPUg6u7G',
            accessKeySecret: 'Xtg4vmu9eAXhyVdzKQzElFgnp9Icj8',
            bucket: 'imgguicai',
            region: 'oss-cn-hangzhou',//所在地区
        });
        await fsToll.ensureDir(path.join(this.config.uploadDir,'app/public/admin/upload/')); //生成文件夹 ，如果存在则不生成
        const stream = await this.ctx.getFileStream();
        const extname = path.extname(stream.filename).toLowerCase();//文件扩展名称
        const fileName = Date.now() + '' + Number.parseInt(Math.random() * 10000) + extname;//文件名
        const target = path.join(this.config.baseDir,'app/public/admin/upload/',fileName); //文件存放目录位置
        const writeStream = fs.createWriteStream(target); //存储文件 创造可写流
        const streamPipe = stream.pipe(writeStream); //文件存储等待机制 将可读性流写入可写流
        try{
            const result = await client.put(fileName,target); //阿里云图片上传
            let fields = {};
            fields = stream.fields
            fields.url= result.url
            return fields;
        } catch(error) {
            await sendToWormhole(stream);
            throw error;
        }
    }
}

module.exports = UploadService;
