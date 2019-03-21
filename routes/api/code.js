const router = require('koa-router')()
const code = require('../../controller/code')
router.prefix('/code')

router.post('/add', code.addCode)

module.exports = router
