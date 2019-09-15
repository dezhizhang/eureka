'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532511512428_3477';

  // add your config here
  config.middleware = ['auth'];

  config.auth = {
    match:'/admin'
  }

  //配置session
  config.session={
    key:'SESSION_ID',
    maxAge:864000,
    renew:true,
    httpOnly:true,
    encrypt:true
  }

  //配置模板引擎
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };



 //配置数据库连接 
  config.mongoose = {
    client:{
      url:'mongodb://127.0.0.1/eureka',
      options:{}
    }
  }
  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: 'localhost',
    }
};

  return config;
};

