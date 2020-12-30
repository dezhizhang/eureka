'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  
  router.get('/admin/login',controller.admin.login.index);
  router.get('/admin/loginOut',controller.admin.login.loginOut);
  router.get('/admin/verify',controller.admin.base.verify);
  router.post('/admin/doLogin',controller.admin.login.doLogin);
  router.get('/admin/changeStatus',controller.admin.base.changeStatus);
  //改变数量
  router.get('/admin/editNumber',controller.admin.base.editNumber);


  //首页统计
  router.get("/admin/home",controller.admin.home.index);

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
  router.get('/admin/focus/delete',controller.admin.focus.delete);
  router.post('/admin/focus/doEdit',controller.admin.focus.doEdit);

  //广告
  router.get('/admin/advert',controller.admin.advert.index);
  router.get('/admin/advert/add',controller.admin.advert.add);
  router.post('/admin/advert/doAdd',controller.admin.advert.doAdd);
  router.get('/admin/advert/edit',controller.admin.advert.edit);
  router.get('/admin/advert/delete',controller.admin.advert.delete);
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
  router.get('/admin/goodsCate/delete',controller.admin.goodsCate.delete);

  //商品颜色
  router.get('/admin/goodsColor',controller.admin.goodsColor.index);
  router.get('/admin/goodsColor/add',controller.admin.goodsColor.add);
  router.post('/admin/goodsColor/doAdd',controller.admin.goodsColor.doAdd);
  router.get('/admin/goodsColor/edit',controller.admin.goodsColor.edit);
  router.post('/admin/goodsColor/doEdit',controller.admin.goodsColor.doEdit);
  router.get('/admin/goodsColor/delete',controller.admin.base.delete);

  //商品
  router.get('/admin/goods',controller.admin.goods.index);
  router.get('/admin/goods/add',controller.admin.goods.add);
  router.post('/admin/goods/doAdd',controller.admin.goods.doAdd);
  router.get('/admin/goods/edit',controller.admin.goods.edit);
  router.post('/admin/goods/doEdit',controller.admin.goods.doEdit);
  router.get('/admin/goods/delete',controller.admin.goods.delete);
  

  //商品相册
  router.get('/admin/goods/photo',controller.admin.photo.index);
  router.get('/admin/goods/photo/add',controller.admin.photo.add);
  router.post('/admin/goods/photo/doAdd',controller.admin.photo.doAdd);
  router.get('/admin/goods/photo/delete',controller.admin.photo.delete);
  router.post('/admin/goods/goodsUploadPhoto',controller.admin.photo.goodsUploadPhoto);

  
  //维修改
  router.get('/admin/maintain',controller.admin.maintain.index);
  router.get('/admin/maintain/edit',controller.admin.maintain.edit);
  router.get('/admin/maintain/delete',controller.admin.base.delete);
  router.post('/admin/mantain/doEdit',controller.admin.maintain.doEdit);

  //联系我们
  router.get('/admin/contact',controller.admin.contact.index);
  router.get('/admin/contact/edit',controller.admin.contact.edit);
  router.post('/admin/contact/doEdit',controller.admin.contact.doEdit)


  //详情
  router.get('/admin/goods/detail',controller.admin.detail.index);
  router.get('/admin/goods/detail/add',controller.admin.detail.add);
  router.post('/admin/goods/detail/doAdd',controller.admin.detail.doAdd);
  router.get('/admin/goods/detail/delete',controller.admin.detail.delete);
  // router.get('/admin/detail/delete',controller.admin.base.delete);
  router.get('/admin/detail/edit',controller.admin.detail.edit);
  router.post('/admin/detail/doEdit',controller.admin.detail.doEdit);

  //分类
  router.get('/admin/classify',controller.admin.classify.index);
  router.get('/admin/classify/add',controller.admin.classify.add);
  router.post('/admin/classify/doAdd',controller.admin.classify.doAdd);
  router.get('/admin/classify/edit',controller.admin.classify.edit);
  router.post('/admin/classify/doEdit',controller.admin.classify.doEdit);
  router.get('/admin/classify/delete',controller.admin.base.delete);

  //分类详情
  router.get('/admin/classifyDetail',controller.admin.classifyDetail.index);
  router.get('/admin/classifyDetail/add',controller.admin.classifyDetail.add);
  router.post('/admin/classifyDetail/doAdd',controller.admin.classifyDetail.doAdd);
  router.get('/admin/classifyDetail/edit',controller.admin.classifyDetail.edit);
  router.post('/admin/classifyDetail/doEdit',controller.admin.classifyDetail.doEdit);
  router.get('/admin/classifyDetail/delete',controller.admin.base.delete);

  //消息通知
  router.get('/admin/message',controller.admin.message.index);
  router.get('/admin/message/add',controller.admin.message.add);
  router.post('/admin/message/doAdd',controller.admin.message.doAdd);
  router.get('/admin/message/delete',controller.admin.message.delete);
  router.get('/admin/message/edit',controller.admin.message.edit);
  router.post('/admin/message/doEdit',controller.admin.message.doEdit);

  //评价管理
  router.get('/admin/evaluation',controller.admin.evaluation.index);

  //用户管理
  router.get('/admin/user',controller.admin.user.index);
  router.get('/admin/user/delete',controller.admin.user.delete);
  router.get('/admin/user/edit',controller.admin.user.edit);

  //优惠券管理
  router.get('/admin/coupons',controller.admin.coupons.index);
  router.get('/admin/coupons/add',controller.admin.coupons.add);
  router.post('/admin/coupons/doAdd',controller.admin.coupons.doAdd);
  router.get('/admin/coupons/delete',controller.admin.coupons.delete);

  //更改状态的方法
  router.get('/admin/modal/change-status',controller.admin.base.changeStatus);



  //前台页面
  router.get("/",controller.default.index.index);
  router.get("/index",controller.default.index.index);
  //前台登录页
  router.get("/login",controller.default.login.index);
  //登录提交数据
  router.post("/login/doAdd",controller.default.login.doAdd);
  //注册
  router.get("/regist",controller.default.regist.index);
  //前台验证码
  router.get("/api/default/verify",controller.default.base.verify);
  //注册提交数据
  router.post("/regist/doAdd",controller.default.regist.doAdd);
  //我的订单
  router.get("/order",controller.default.order.index);
  //收贷地址
  router.get("/address",controller.default.address.index);
  //用户信息
  router.get("/user",controller.default.user.index);
  //收藏
  router.get("/collect",controller.default.collect.index);
  //我的留言
  router.get("/message",controller.default.message.index);
  //购物车
  router.get("/buycar",controller.default.buycar.index);
  //购物转第二步
  router.get("/buyCarTwo",controller.default.buycar.buyCarTwo);
  //购物转第三步
  router.get("/buyCarThree",controller.default.buycar.buyCarThree);
  //商品分类
  router.get("/category",controller.default.category.index);
  //商品详情
  router.get("/product",controller.default.product.index);
 
  //小程序接口
  //轮播图
  router.get('/api/focus/info',controller.api.focus.index);
  //广告图
  router.get('/api/advert/info',controller.api.advert.index);
  //维修接口
  router.post('/api/maintain/upload',controller.api.maintain.upload);
  //获取预约数据
  router.get('/api/maintain/list',controller.api.maintain.list);
  //确认签收
  router.get("/api/maintain/sign",controller.api.maintain.sign);
  //删除预约数据
  router.get('/api/maintain/delete',controller.api.maintain.delete);
  //热门产品
  router.get('/api/product/hot',controller.api.product.hot);
  //主打产品
  router.get('/api/product/list',controller.api.product.list);
  //主打产品分类
  router.get('/api/product/main',controller.api.main.index);
  //详情列表
  router.get('/api/detail/info',controller.api.detail.index);
  //商品相册图
  router.get('/api/detail/photo',controller.api.detail.photo);
  //商品详情
  router.get('/api/product/detail',controller.api.detail.detail);
  //获取分类
  router.get('/api/category/list',controller.api.classify.index);
  //获取分类详情
  router.get('/api/categoryDetail/list',controller.api.classifyDetail.index);
  //用户登录
  router.get('/api/userInfo/login',controller.api.login.index);
  //上传购物车
  router.post('/api/cart/save',controller.api.cart.save);
  //获取购物车信息
  router.get('/api/userInfo/cartList',controller.api.cart.list);
  //更新商品数量
  router.get('/api/cart/update',controller.api.cart.update);
  //删除购物车 
  router.get('/api/cart/delete',controller.api.cart.delete);
  //购物车加入预支付订单
  router.post('/api/cart/prepaid',controller.api.cart.prepaid);
  //改变购物车状态的方法
  router.get('/api/cart/status',controller.api.cart.status);
  //调起微信支付
  router.post('/api/userInfo/pay',controller.api.login.pay);
  //城市接口
  router.get('/api/city/info',controller.api.city.index);
  //企业注册
  router.post('/api/company/register',controller.api.login.register);
  //企业登录
  router.post('/api/company/login',controller.api.login.login);
  //企业信息
  router.get('/api/company/info',controller.api.login.info);
  //用户发起预支付
  router.post('/api/userInfo/prepaid',controller.api.user.prepaid);
  //获取待支付列表
  router.get("/api/userInfo/pay/list",controller.api.user.paylist);
  //支付完成后更新订单
  router.get('/api/userInfo/update/order',controller.api.user.order);
  //订单列表
  router.get('/api/userInfo/order/list',controller.api.user.list);
  //统计订单数量
  router.get('/api/userInfo/order/count',controller.api.user.count);
  //删除订单
  router.get('/api/userInfo/order/delete',controller.api.user.delete);
  //保存用户信息
  router.post('/api/userInfo/save',controller.api.user.save);
  //获取用户信息
  router.get('/api/user/info',controller.api.user.info);
  //上传维修评价
  router.post('/api/maintain/evaluation',controller.api.evaluation.upload);
  //新增地址
  router.post('/api/address/add',controller.api.address.add);
  //获取地址
  router.get('/api/address/list',controller.api.address.list);
  //删除地址
  router.get('/api/address/delete',controller.api.address.delete);
  //获取单条地址
  router.get('/api/address/info',controller.api.address.info);
  //更新地址
  router.post('/api/address/update',controller.api.address.update);
  //获取用用户默认地址
  router.get('/api/address/default',controller.api.address.default);
  //获取用户信息
  router.get('/api/user/message',controller.api.message.index);
  //获取优惠券
  router.get('/api/coupons/list',controller.api.coupons.list);



};


