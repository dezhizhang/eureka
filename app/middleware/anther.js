module.exports = (opt,app) => {
    return async function auther(ctx,nect) {
        ctx.state.csrf = ctx.csrf;
        await nect();
    }
}