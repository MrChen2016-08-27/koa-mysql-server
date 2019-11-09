const router = require('koa-router')()
const ratelimit = require('koa-ratelimit')
const Redis = require('../tool/redis')
const api = require('./api')
const page = require('./page')
const { appRouter } = require('../controller/role/menus')
const { getUserAuth } = require('../controller/user')


// 对post请求的频率监控
router.post(
    '/*',
    ratelimit({
        db: Redis,
        duration: 60000,
        errorMessage: '短时间内访问的频率过高',
        id: ctx => ctx.ip,
        headers: {
            remaining: 'Rate-Limit-Remaining',
            reset: 'Rate-Limit-Reset',
            total: 'Rate-Limit-Total'
        },
        max: 10,
        disableHeader: false
    })
)

// 对每个接口的不同角色的权限访问控制
router.all('*', async (ctx, next) => {
    const path = ctx.path
    let authority = {}
    if (ctx.state.user) {
        authority = await getUserAuth(ctx.state.user.data.id)
    }
    let authPaths = {}
    if (authority.all) {
        return next()
    }
    appRouter.forEach(item => {
        let parentPath = item.apiKey
        if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
                let apiPath = parentPath + child.apiKey
                if (authority[item.id] && authority[item.id][child.id]) {
                    authPaths[apiPath] = authority[item.id][child.id]
                } else {
                    authPaths[apiPath] = 0
                }
            })
        }
    })
    const types = ['add', 'delete', 'update', 'get|list']
    const basePath = path.substring(0, path.lastIndexOf('/'))
    const endTag = path.substring(path.lastIndexOf('/') + 1)
    let isTag = false
    let valid = false
    if (authPaths[basePath] || authPaths[basePath] === 0) {
        types.forEach((str, index) => {
            let marks = str.split('|')
            let result = marks.find(tag => tag == endTag)
            if (result) {
                isTag = true
                let a = 1 << index
                if (authPaths[basePath] & a) {
                    valid = true
                    return valid
                }
            }
        })
    }
    if (!isTag) {
        return next()
    }
    if (!valid && !authPaths[basePath] && authPaths[basePath] !== 0) {
        return next()
    } else if (valid) {
        return next()
    } else {
        throw new ctx.ApiError('auth_shortage')
    }
})

router.get('/', (ctx, next) => {
    ctx.redirect('/page')
})
router.use(api.routes(), api.allowedMethods())
router.use(page.routes(), page.allowedMethods())

module.exports = router
