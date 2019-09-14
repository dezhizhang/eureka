'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

   router.get('/',controller.admin.manager.index);
   router.get('/admin/login',controller.admin.login.index);
   router.get('/admin/loginOut',controller.admin.login.loginOut);
   router.get('/admin/verify',controller.admin.base.verify);
   router.post('/admin/doLogin',controller.admin.login.doLogin);

  //管理员
  router.get('/admin/manager',controller.admin.manager.index);
  router.get('/admin/manager/add',controller.admin.manager.add);
  router.post('/admin/manager/doAdd',controller.admin.manager.doAdd);
  router.get('/admin/manager/edit',controller.admin.manager.edit);
  router.post('/admin/manager/doEdit',controller.admin.manager.doEdit);
  router.get('/admin/manager/delete',controller.admin.base.delete);




   //角色
   router.get('/admin/role',controller.admin.role.index);
   router.get('/admin/role/add',controller.admin.role.add);
   router.post('/admin/role/doAdd',controller.admin.role.doAdd);
   router.get('/admin/role/edit',controller.admin.role.edit);
   router.post('/admin/role/doEdit',controller.admin.role.doEdit);
   router.get('/admin/role/delete',controller.admin.base.delete);

   //权限
   router.get('/admin/access',controller.admin.access.index);
   router.get('/admin/access/add',controller.admin.access.add);
   router.post('/admin/access/doAdd',controller.admin.access.doAdd);
   router.get('/admin/access/edit',controller.admin.access.edit);
   router.post('/admin/access/doEdit',controller.admin.access.doEdit);
   router.get('/admin/access/delete',controller.admin.base.delete);



   


 




};


