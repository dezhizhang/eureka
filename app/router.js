'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  
  router.get('/', controller.home.index);

  router.post('/add',controller.home.add);

  router.get('/news',controller.news.index);

  router.get('/login',controller.home.login);

  router.get('/register',controller.home.register);

  router.post('/doLogin',controller.home.doLogin);

  router.post('/doRegister',controller.home.doRegister);


  router.post('/text',controller.home.test)
  




};


