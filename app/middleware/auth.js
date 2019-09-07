'use strict';
const url = require('url');
module.exports = (opt,app) => {
    return async function auth(ctx,next) {
        ctx.state.csrf = ctx.csrf;
        const pathname =url.parse(ctx.request.url).pathname ;
        if(ctx.session.userInfo) {
            await next();
        } else {
            if(pathname == '/admin/login' || pathname == '/admin/doLogin' || pathname == '/admin/verify') {
                await next();
            } else {
                ctx.redirect('/admin/login')
            }
        }
    }
}
