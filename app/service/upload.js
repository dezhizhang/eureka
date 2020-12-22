'use strict';
const fs = require("fs");
const path = require('path');
const dayjs = require("dayjs");
const oss = require('ali-oss'); //引入阿里云
const fsToll = require('fs-extra');
const Service = require('egg').Service;
const sendToWormhole = require('stream-wormhole');
//初始化阿里云
const client = new oss({
    accessKeyId: 'LTAI4GJa5QYZrxA2PPUg6u7G',
    accessKeySecret: 'Xtg4vmu9eAXhyVdzKQzElFgnp9Icj8',
    bucket: 'imgguicai',
    // bucket:'guicaitest',
    region: 'oss-cn-hangzhou',//所在地区
});
class UploadService extends Service {
    //图片上传
    async uploadImg() {
        const dirName = dayjs(Date.now()).format("YYYYMMDD");//生成日期数据
        await fsToll.ensureDir(path.join('app/public/admin/upload/',dirName)); //生成文件夹 ，如果存在则不生成
        const stream = await this.ctx.getFileStream();
        const extname = path.extname(stream.filename).toLowerCase();//文件扩展名称
        const fileName = Date.now() + '' + Number.parseInt(Math.random() * 10000) + extname;//文件名
        const target = path.join('app/public/admin/upload/',dirName,fileName); //文件存放目录位置
        const writeStream = fs.createWriteStream(target); //存储文件 创造可写流
        const streamPipe = stream.pipe(writeStream); //文件存储等待机制 将可读性流写入可写流
        try{
            const result = await client.put(fileName,target); //阿里云图片上传
            let fields = {};
            fields = stream.fields;
            fields.url= result.url;
            fields.file_name = fileName;
            console.log("fields",fields);
            fs.unlink(target,(err) => {
               console.log("删除文件城功");
            })
            return fields;
        } catch(error) {
            await sendToWormhole(stream);
            throw error;
        }
       
    }
    //删除图片
    async deleteImg(fileName) {
        if(!fileName) return; //fileName不存直接退出
        try {
            await client.delete(fileName);
            return true;
        } catch (error) {
            throw error;
        }
    }
    //更新图片
    async updateImg(stream) {
        const dirName = dayjs(Date.now()).format("YYYYMMDD");//生成日期数据
        const extname = path.extname(stream.filename).toLowerCase();//文件扩展名称
        const fileName = Date.now() + '' + Number.parseInt(Math.random() * 10000) + extname;//文件名
        const target = path.join('app/public/admin/upload/',dirName,fileName); //文件存放目录位置
        const writeStream = fs.createWriteStream(target); //存储文件 创造可写流
        const streamPipe = stream.pipe(writeStream); //文件存储等待机制 将可读性流写入可写流
        try{
            const result = await client.put(fileName,target); //阿里云图片上传
            if(result.res.statusCode == 200) { //上传成功
                let fields = {};
                fields.url= result.url;
                fields.file_name = fileName;
                fs.unlink(target,(err) => {
                    console.log("删除文件城功");
                })
                return fields;
            } else { //上传失败
                return false;
            }
        } catch(error) {
            await sendToWormhole(stream);
            throw error;
        }
    }
}

module.exports = UploadService;
