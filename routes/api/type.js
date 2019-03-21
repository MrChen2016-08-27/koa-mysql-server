const router = require('koa-router')()
const type = require('../../controller/type')
router.prefix('/type')

router.post('/add', type.addType)
router.get('/list', type.getTypeList)
router.get('/get', type.getType)
router.post('/delete', type.deleteType)
router.post('/update', type.updateType)

module.exports = router
