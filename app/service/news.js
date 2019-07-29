'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
   async getNewsList() {
     let list = ['111','2222','3333','4444'];
     return list;

   }
}

module.exports = NewsService;
