'use strict';

module.exports = (opt,app) => {
    return async function anther(ctx,next) {
        ctx.state.csrf = ctx.csrf;
        await next();

    }
}
