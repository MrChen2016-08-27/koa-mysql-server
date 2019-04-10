const router = require('koa-router')()
const user = require('./api/user')
const role = require('./api/role')
const code = require('./api/code')
const userSn = require('./api/userSn')
const moduleC = require('./api/module')
const column = require('./api/column')
const type = require('./api/type')
const content = require('./api/content')
const review = require('./api/review')
// const organization = require('./api/organization');
const fileupload = require('./api/fileupload')

router.prefix('/api')

// api 根据配置权限 控制
const apiConfigFilter = {}

router.get('/', async (ctx, next) => {
    ctx.rest({
        title: 'hello koa2'
    })
})

router.get('/auth', async (ctx, next) => {
    ctx.rest({
        title: '权限验证'
    })
})

router.get('/logout', async (ctx, next) => {
    ctx.session.user = null
    ctx.rest({
        title: '注销成功'
    })
})

router.use(fileupload.routes(), fileupload.allowedMethods())
router.use(user.routes(), user.allowedMethods())
router.use(role.routes(), role.allowedMethods())
router.use(code.routes(), code.allowedMethods())
router.use(userSn.routes(), userSn.allowedMethods())
router.use(moduleC.routes(), moduleC.allowedMethods())
router.use(column.routes(), column.allowedMethods())
router.use(type.routes(), type.allowedMethods())
router.use(content.routes(), content.allowedMethods())
router.use(review.routes(), review.allowedMethods())
//   router.use(organization.routes(), organization.allowedMethods());

module.exports = router
