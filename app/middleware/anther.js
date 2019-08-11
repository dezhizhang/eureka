
// module.exports = (opt,app) => {
//     return async function auther(ctx,nect) {
//         ctx.state.csrf = ctx.csrf;
//         console.log(opt);

//         await nect();
//     }
// }

module.exports = (opt,app) => {
    return async function auther(ctx,next) {
        ctx.state.csrf = ctx.csrf;
        console.log(opt);
        
        await next();

    }
}
