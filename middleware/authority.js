const config = require('../config')
const koaJwt = require('koa-jwt')

module.exports = function(app) {
    // app.use(async (ctx, next) => {
    //     await authSessionControl(ctx, next, ctx.request.path)
    // })
    // token 验证控制权限
    app.use(
        koaJwt({ secret: config.jwt.secret }).unless({ path: config.apiFilter })
    )
}

// session验证控制权限
const authSessionControl = async (ctx, next, path) => {
    const { session } = ctx
    const result = config.apiFilter.find(api => api.test(path))
    if (result) {
        await next()
    } else if (session.user) {
        await next()
    } else {
        const result = path.substring(0, 5)
        if (result == '/page') {
            ctx.redirect('/page/auth')
        } else {
            ctx.response.status = 401
            ctx.response.body = '没有权限访问'
        }
    }
}
