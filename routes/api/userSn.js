const router = require('koa-router')()
const userSn = require('../../controller/userSn')
router.prefix('/userSn')

router.post('/add', userSn.addUserSn)

module.exports = router
