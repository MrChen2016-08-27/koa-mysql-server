const router = require('koa-router')();
const test = require('./page/test');

router.prefix('/page');

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: '首页'
    });
});

router.get('/auth', async (ctx, next) => {
    await ctx.render('auth', {
        title: '访问权限'
    });
});


router.use(test.routes(), test.allowedMethods());

module.exports = router;