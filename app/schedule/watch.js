'use strict';

const Subscription = require('egg').Subscription;
class Watch extends Subscription {
  static get schedule() {
    return {
      interval: '1s',
      type: 'all',
    };
  }
  async subscribe() {
    const result = await this.ctx.curl('http://www.api.com/cache', {
      dataType: 'json',
    });
    this.ctx.app.cache = result.data;
  }
}

module.exports = Watch;