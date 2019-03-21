const ApiError = require('../config/ApiError');

/**
 * rest 接口的中间件配置
 */

// rest方法配置
function restify(app, pathPrefix) {
    // REST API前缀，默认为/api/:
    pathPrefix = pathPrefix || '/api' || '/page';
    app.use(async (ctx, next) => {
        // 是否是REST API前缀?
        if (ctx.request.path.startsWith(pathPrefix)) {
            // 绑定rest()方法:
            ctx.rest = (data) => {
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    meta: {
                        code: 200
                    },
                    data
                };
            }
            try{
                await next();
            } catch(e) {
                console.log(e, '错误信息');
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    meta: new ApiError(e.code, e.message)
                }
            }
        } else {
            await next();
        }
    });
}


// 注册错误类到 ctx, 可以使用 throw new ctx.ApiError(code) 来抛出异常
function registerApiError(app) {
    app.use(async (ctx, next) => {
        ctx.ApiError = ApiError;
        await next();
    })    
}

module.exports = (app) => {
    registerApiError(app);
    restify(app);
};

