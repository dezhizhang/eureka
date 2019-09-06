'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

   router.get('/',controller.admin.manager.index);
   router.get('/admin/login',controller.admin.login.index);
   router.get('/admin/verify',controller.admin.base.verify);
   


 




};


