'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532511512428_3477';

  // add your config here
  config.middleware = ['anther','jsonp'];

  //配置session
  config.session={
    key:'SESSION_ID',
    maxAge:86400,
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

  config.api = 'http://www.phonegap100.com';

  return config;
};

