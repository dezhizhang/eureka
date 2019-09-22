'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin',controller.admin.main.index);
  router.get('/admin/welcome',controller.admin.main.welcome);
  router.get('/admin/login',controller.admin.login.index);
  router.get('/admin/loginOut',controller.admin.login.loginOut);
  router.get('/admin/verify',controller.admin.base.verify);
  router.post('/admin/doLogin',controller.admin.login.doLogin);
  router.get('/admin/changeStatus',controller.admin.base.changeStatus);
  //改变数量
  router.get('/admin/editNumber',controller.admin.base.editNumber);

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
  router.get('/admin/role/auth',controller.admin.role.auth);
  router.post('/admin/role/doAuth',controller.admin.role.doAuth);

   //权限
  router.get('/admin/access',controller.admin.access.index);
  router.get('/admin/access/add',controller.admin.access.add);
  router.post('/admin/access/doAdd',controller.admin.access.doAdd);
  router.get('/admin/access/edit',controller.admin.access.edit);
  router.post('/admin/access/doEdit',controller.admin.access.doEdit);
  router.get('/admin/access/delete',controller.admin.base.delete);

  //轮播图
  router.get('/admin/focus',controller.admin.focus.index);
  router.get('/admin/focus/add',controller.admin.focus.add);
  router.post('/admin/focus/doAdd',controller.admin.focus.doAdd);
  router.get('/admin/focus/edit',controller.admin.focus.edit);
  router.get('/admin/focus/delete',controller.admin.base.delete);
  router.post('/admin/focus/doEdit',controller.admin.focus.doEdit);

  //广告
  router.get('/admin/advert',controller.admin.advert.index);
  router.get('/admin/advert/add',controller.admin.advert.add);
  router.post('/admin/advert/doAdd',controller.admin.advert.doAdd);
  router.get('/admin/advert/edit',controller.admin.advert.edit);
  router.get('/admin/advert/delete',controller.admin.base.delete);
  router.post('/admin/advert/doEdit',controller.admin.advert.doEdit);

  //商品管理
  router.get('/admin/goodsType',controller.admin.goodsType.index);
  router.get('/admin/goodsType/add',controller.admin.goodsType.add);
  router.post('/admin/goodsType/doAdd',controller.admin.goodsType.doAdd);
  router.get('/admin/goodsType/edit',controller.admin.goodsType.edit);
  router.post('/admin/goodsType/doEdit',controller.admin.goodsType.doEdit);
  router.get('/admin/goodsType/delete',controller.admin.base.delete);

  //商品属性
  router.get('/admin/goodsTypeAttr',controller.admin.goodsTypeAttr.index);
  router.get('/admin/goodsTypeAttr/add',controller.admin.goodsTypeAttr.add);
  router.post('/admin/goodsTypeAttr/doAdd',controller.admin.goodsTypeAttr.doAdd);
  router.get('/admin/goodsTypeAttr/edit',controller.admin.goodsTypeAttr.edit);
  router.post('/admin/goodsTypeAttr/doEdit',controller.admin.goodsTypeAttr.doEdit);
  router.get('/admin/goodsTypeAttr/delete',controller.admin.base.delete)

  //商品分类
  router.get('/admin/goodsCate',controller.admin.goodsCate.index);
  router.get('/admin/goodsCate/add',controller.admin.goodsCate.add);
  router.post('/admin/goodsCate/doAdd',controller.admin.goodsCate.doAdd);
  router.get('/admin/goodsCate/edit',controller.admin.goodsCate.edit);
  router.post('/admin/goodsCate/doEdit',controller.admin.goodsCate.doEdit);
  router.get('/admin/goodsCate/delete',controller.admin.base.delete);

  //商品
  router.get('/admin/goods',controller.admin.goods.index);
  router.get('/admin/goods/add',controller.admin.goods.add);
  router.post('/admin/goods/doAdd',controller.admin.goods.doAdd);
  router.get('/admin/goods/edit',controller.admin.goods.edit);
  router.post('/admin/goods/doEdit',controller.admin.goods.doEdit);
  router.get('/admin/goods/delete',controller.admin.base.delete);
  
  


  
  //小程序接口
  //轮播图
  router.get('/api/focus/info',controller.api.focus.index);
  //广告图
  router.get('/api/advert/info',controller.api.advert.index);



   


 




};


