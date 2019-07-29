'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
   async getNewsList() {
 

     let url = this.config.api + '/appapi.php?a=getPortalList&catid=20&page=1';
     let list = await this.ctx.curl(url);
    //  let list = ['111','2222','3333','4444'];
     return list.data;

   }
}

module.exports = NewsService;
