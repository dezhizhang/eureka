'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  let anther  = app.middleware.anther({name:'123456'});
  router.get('/',anther, controller.home.index);
  router.post('/add',controller.home.add);
  router.get('/news',controller.news.index);



};


