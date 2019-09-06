'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

   router.get('/',controller.admin.manager.index);

   router.get('/info',controller.admin.manager.info);




};


