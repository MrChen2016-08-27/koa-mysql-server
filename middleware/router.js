const index = require('../routes/index')

// 路由中间件
module.exports = function routerConfig(app) {
    // routes
    app.use(index.routes(), index.allowedMethods())
}
